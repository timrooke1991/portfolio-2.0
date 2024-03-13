<script>
	import '$lib/assets/scss/global.scss';
	import { page } from '$app/stores';
	import throttle from 'just-throttle';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageTransition from '$lib/transitions/PageTransition.svelte';
	import SubHeader from '$lib/components/SubHeader.svelte';
	import { isScrollingDown } from '$lib/data/store';

	const isSinglePostCheck = new RegExp(/\/(blog|category)\/[A-z0-9\-_]+\/?$/);
	const initialValue = isSinglePostCheck.test($page.data.currentRoute);
	let isSinglePost = $state(initialValue);
	let showFooter = $state(false);

	$effect(() => {
		isSinglePost = isSinglePostCheck.test($page.data.currentRoute);
	});

	$effect(() => {
		showFooter = $page.url.pathname !== '/';
	});

	const handleScroll = throttle(() => {
		// Early return if we're above mobile width
		if (window.outerWidth >= 768) {
			if ($isScrollingDown) $isScrollingDown = false;
			return;
		}

		const currentScrollPosition = window.scrollY;
		const delta = lastScrollPosition - currentScrollPosition;
		if (delta > 0 && delta < 10) {
			return;
		}

		if (lastScrollPosition > currentScrollPosition) {
			$isScrollingDown = false;
		} else if (currentScrollPosition > 240) {
			$isScrollingDown = true;
		}
		lastScrollPosition = currentScrollPosition;
	}, 100);
</script>

<svelte:window on:scroll={handleScroll} />

<Header />
<main>
	<SubHeader title={$page.data.currentRoute} {isSinglePost} />
	<PageTransition refresh={$page.data.currentRoute}>
		<slot />
	</PageTransition>
</main>

{#if showFooter}
	<Footer />
{/if}

<style lang="scss">
	main {
		padding-bottom: calc(4 * var(--halfNote));
	}
</style>
