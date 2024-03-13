<script>
	import PostContainer from '$lib/components/PostContainer.svelte';
	import { capitalize } from '$lib/utils';
	let { data } = $props();
	let title = capitalize(data.category);
</script>

<svelte:head>
	<title>Blog | Category: {category}</title>
	<meta property="og:image" content="https://timrooke.co.uk/images/site-image.png" />
	<meta name="twitter:image" content="https://timrooke.co.uk/images/site-image.png" />
</svelte:head>

<section class="page-container-center">
	<h1 class="page-title title-accent">{title}</h1>

	{#if data.posts.length > 0}
		<PostContainer posts={data.posts} useBorder={true} />
	{:else}
		<p>No posts found for this category</p>
	{/if}
</section>
