<script>
	import LinkList from '$lib/components/LinkList.svelte';
	import { navLinks, socials } from '$lib/data/links.js';
</script>

<footer>
	<div>
		<h3 class="title-accent">Where to find me</h3>
		<LinkList links={socials} />
	</div>
	<div class="stretch">
		<h3 class="title-accent purple">Where to go</h3>
		<LinkList links={navLinks} />
	</div>
	<div>
		<p>Built in Svelte</p>
		<p>Tim Rooke, 2024</p>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--greyLight);
		display: flex;
		flex-direction: row;
		width: 100%;

		padding: calc(2 * var(--halfNote)) var(--halfNote);
		color: var(--ink);
		font-size: 0.75em;

		div {
			flex: 1;
			display: flex;
			flex-direction: column;

			&:last-child {
				align-items: flex-end;
				justify-content: flex-end;

				p {
					padding: 0.2rem;
					margin: 0;
					font-size: 0.7em;
					color: var(--greyLight);
				}
			}
		}

		@media (max-width: 768px) {
			flex-direction: column;
			gap: var(--quarterNote);

			div {
				&:last-child {
					margin-top: var(--quarterNote);
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
</style>
