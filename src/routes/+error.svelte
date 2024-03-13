<script>
	import BackButton from '$lib/components/BackButton.svelte';
</script>

<svelte:head>
	<title>Error page</title>
</svelte:head>

<section class="page-container-center">
	<div class="header title-accent">
		<h1 class="">There's be an issue</h1>
		<BackButton />
	</div>

	<p>Please try again later.</p>
</section>

<style lang="scss">
	.header {
		margin: var(--quarterNote) 0;
	}

	h1 {
		font-size: clamp(2rem, 2.5vw, 3rem);
		margin-bottom: var(--sixteenthNote);
		margin-top: 0;
		font-weight: 400;
		color: var(--ink);
	}
</style>
