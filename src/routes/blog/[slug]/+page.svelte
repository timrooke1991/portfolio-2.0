<!-- src/routes/[slug]/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { fetchMarkdownPosts, getRelatedPosts } from '$lib/utils';
	import Categories from '$lib/components/Categories.svelte';
	import PostContent from '$lib/components/PostContent.svelte';
	import RelatedPosts from '$lib/components/RelatedPosts.svelte';

	let { data } = $props();
	let readingTime = $state(1);
	let relatedPosts = $state([]);
	onMount(() => {
		const words = 500; // data?.content.trim().split(/\s+/).length;
		const wordsPerMinute = 225; // Average reading speed
		readingTime = Math.max(1, Math.ceil(words / wordsPerMinute));
	});

	$effect(async () => {
		const allPostsMetadata = await fetchMarkdownPosts();
		relatedPosts = getRelatedPosts(data.theme, allPostsMetadata, data.title);
	});
</script>

<svelte:head>
	<title>Blog - {data.title}</title>
	<meta property="og:title" content={data.title} />
</svelte:head>

<section class="page-container-center">
	<article>
		<div class="header title-accent">
			<h1>{data.title}</h1>
			<p class="meta">
				<span class="date">{data?.date}</span>
				<span class="time">{readingTime} min read</span>
			</p>
		</div>
		<Categories categories={data.categories} />
		<PostContent content={data.content} />
	</article>
	{#if relatedPosts.length}
		<RelatedPosts {relatedPosts} theme={data?.theme} />
	{/if}
</section>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		max-width: 38em;
		color: var(--ink);
	}

	.header {
		margin-bottom: var(--quarterNote);
	}

	h1 {
		font-size: clamp(1.8rem, 1rem + 3vw, 3.5rem);
		margin-bottom: var(--sixteenthNote);
		margin-top: 0;
		font-weight: 400;
		max-width: 17em;
		color: var(--ink);
	}
	article p {
		font-family: var(--codeFont);
		font-size: 0.75em;
		margin: 0;
		color: var(--purple);
	}

	p.meta {
		display: flex;
		font-family: var(--codeFont);
		justify-content: space-between;
		padding-left: 0.3em;

		span.date {
			font-size: 0.85em;
			color: var(--greyLight);
		}

		span.time {
			font-size: 0.85em;
			color: var(--purple);
		}
	}
</style>
