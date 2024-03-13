<script>
	let { categories } = $props();
</script>

{#if categories?.length}
	<aside class="categories">
		<ul class="no-bullets">
			{#each categories as category}
				<li><a href="/blog/category/{category}">{category}</a></li>
			{/each}
		</ul>
	</aside>
{/if}

<style lang="scss">
	ul {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5em;
		margin: 0;
		padding: 0;

		li {
			text-decoration: none;
			background-color: var(--purple);
			padding: 0.2em 0.4em;
			border-radius: 0.1em;
			font-size: 0.75em;
			text-decoration: none;

			a {
				color: var(--grey);
			}

			&:hover {
				filter: brightness(90%);
			}
		}
	}

	aside.categories {
		margin-bottom: var(--quarterNote);
	}
</style>
