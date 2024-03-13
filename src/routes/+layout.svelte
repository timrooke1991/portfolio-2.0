<script>
	import '$lib/assets/scss/global.scss';
	import { page } from '$app/stores';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageTransition from '$lib/transitions/PageTransition.svelte';
	import SubHeader from '$lib/components/SubHeader.svelte';

	const isSinglePostCheck = new RegExp(/\/(blog|category)\/[A-z0-9\-_]+\/?$/);
	const initialValue = isSinglePostCheck.test($page.data.currentRoute);
	let isSinglePost = $state(initialValue);

	$effect(() => {
		isSinglePost = isSinglePostCheck.test($page.data.currentRoute);
	});
</script>

<Header />
<main>
	<SubHeader title={$page.data.currentRoute} {isSinglePost} />
	<PageTransition refresh={$page.data.currentRoute}>
		<slot />
	</PageTransition>
</main>

<Footer />

<style lang="scss">
</style>
