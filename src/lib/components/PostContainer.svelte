<script>
	import PostList from './PostList.svelte';
	let { posts, title, useBorder } = $props();
</script>

<h2 class="month-title">
	{title ?? 'general'}
</h2>
<div class="posts-container" class:no-border={!useBorder}>
	{#each posts as post}
		<PostList {post} />
	{/each}
</div>

<style lang="scss">
	.posts-container {
		margin: 1rem 0.5rem;
		padding: 0.5rem;
		border-left: 2px solid var(--purple);

		&.no-border {
			border-left: none;
		}
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
