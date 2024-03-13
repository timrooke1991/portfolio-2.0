<script>
	let { content } = $props();
</script>

<div class="markdown-content">
	<svelte:component this={content} />
</div>

<style lang="scss">
	.markdown-content :global(h2),
	.markdown-content :global(h3),
	.markdown-content :global(h4) {
		margin-left: calc(calc(var(--quarterNote) + 4px) * -1);
		border-left: 4px solid var(--yellow);
		padding-left: var(--quarterNote);
        font-weight: 400;

		@media (max-width: 768px) {
			margin-left: 0;
		}
	}
</style>
