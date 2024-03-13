<script>
	let { relatedPosts, theme } = $props();
    import PostContainer from './PostContainer.svelte';
</script>

<aside class="related-posts">
	<h3 class="title-accent">
		{#if theme}
			Read more about <span class="theme">{theme}</span>
		{:else}
			Related posts
		{/if}
	</h3>
	<PostContainer posts={relatedPosts} useBorder={Boolean(theme)} />
</aside>

<style lang="scss">
	aside.related-posts {
		margin-top: var(--halfNote);
		margin-bottom: var(--halfNote);
		border-top: 2px solid var(--greyLight);
	}

	.theme {
		color: var(--yellow);
	}
</style>
