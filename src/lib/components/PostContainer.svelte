<script>
	import PostList from './PostList.svelte';
	let { posts, useBorder } = $props();
</script>

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
</style>
