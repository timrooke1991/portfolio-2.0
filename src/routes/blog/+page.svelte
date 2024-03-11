<!-- src/routes/blog/+page.svelte -->
<script>
	let { data } = $props();
	import PostContainer from '$lib/components/PostContainer.svelte';
	console.log('data', data);
</script>

<svelte:head>
	<title>Tim Rooke | Blog</title>
	<meta property="og:title" content="Blog" />
</svelte:head>

<section class="page-container-center">
	<h1 class="page-title title-accent">Blog</h1>

	{#each Object.keys(data.posts) as monthYear}
		<div class="month-section">
			<h2 class="month-title">
				{monthYear} - {data.posts[monthYear].themed.length > 0
					? data.posts[monthYear].themed[0].meta.theme
					: 'general'}
			</h2>

			{#if data.posts[monthYear].themed.length > 0}
				<PostContainer posts={data.posts[monthYear].themed} useBorder={true} />
			{/if}

			<PostContainer posts={data.posts[monthYear].topLevel} useBorder={false} />
		</div>
	{/each}
</section>

<style lang="scss">
	.month-section {
		margin-bottom: 2rem;
	}

	.month-title {
		margin-bottom: 1rem;
		font-size: 0.85em;
		font-family: var(--codeFont);
		color: var(--yellow);
		text-transform: lowercase;
		line-height: 1.2;
	}
</style>
