<script>
	import '$lib/assets/scss/global.scss';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';

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

	let lastScrollPosition = 0;

	const handleScroll = throttle(() => {
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

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window on:scroll={handleScroll} />

<Header />
<main>
	<SubHeader title={$page.data.currentRoute} {isSinglePost} />
	<PageTransition refresh={$page.data.currentRoute}>
		<slot />
	</PageTransition>
</main>

{#if $isScrollingDown}
	<button
		on:click={scrollToTop}
		class="back-to-top"
		in:fly={{ x: 300, duration: 500 }}
		out:fly={{ x: 300, duration: 500 }}>&#8679</button
	>
{/if}

{#if showFooter}
	<Footer />
{/if}

<style lang="scss">
	main {
		padding-bottom: calc(4 * var(--halfNote));
	}

	.back-to-top {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-around;
		box-sizing: border-box;
		bottom: 20px;
		right: 20px;
		padding: 10px 20px;
		font-size: 1em;
		height: 50px;
		width: 50px;
		border-radius: 25px;
		color: var(--purple);
		background-color: var(--grey);
		border: 2px solid var(--purple);
		cursor: pointer;
		transition: opacity 0.3s ease;
		z-index: 1000;
	}

	/* Hide button when not scrolling down */
	.back-to-top:hover {
		opacity: 0.7;
	}
</style>
