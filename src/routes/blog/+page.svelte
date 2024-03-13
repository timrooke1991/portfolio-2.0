<!-- src/routes/blog/+page.svelte -->
<script>
	let { data } = $props();
	import PostContainer from '$lib/components/PostContainer.svelte';
	console.log('data', data);
</script>

<svelte:head>
	<title>Tim Rooke | Blog</title>
	<meta
		data-key="description"
		name="description"
		content="Thoughts on learning, coding, and random rambles."
	/>
	<meta property="og:image" content="https://timrooke.co.uk/images/site-image.png" />
	<meta name="twitter:image" content="https://timrooke.co.uk/images/site-image.png" />
</svelte:head>

<section class="page-container-center">
	<h1 class="page-title title-accent">Blog</h1>

	{#each Object.keys(data.posts) as monthYear}
		<div class="month-section">
			{#if data.posts[monthYear].themed.length > 0}
				<PostContainer
					title="{monthYear} - {data.posts[monthYear].themed[0].meta.theme}"
					posts={data.posts[monthYear].themed}
					useBorder={true}
				/>
			{/if}
			<PostContainer title={monthYear} posts={data.posts[monthYear].topLevel} useBorder={false} />
		</div>
	{/each}
</section>

<style lang="scss">
	.month-section {
		margin-bottom: 2rem;
	}
</style>
