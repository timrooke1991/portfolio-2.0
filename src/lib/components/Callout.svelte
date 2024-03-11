<script>
	let { title, items } = $props();
</script>

<div class="callout-container">
	{#if title}
		<h4>{title}</h4>
	{/if}
	<div class="callout-content-container">
		{#each items as item}
			<div class="callout">
				<p class="value">{item.value}</p>
				<p class="subvalue">{item.subvalue}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.callout-container {
		margin: 12px 0;
		padding: 12px 0;
		border-top: 2px solid var(--greyLight);
		border-bottom: 2px solid var(--greyLight);
	}

	h4 {
		color: var(--yellow);
	}

	.callout-content-container {
		display: flex;
		justify-content: space-between;
		margin: 12px 0;

		div {
			box-sizing: border-box;
			width: calc(100% / 3);
			padding-left: 0.5em;
			text-align: center;
		}

		@media (max-width: 600px) {
			flex-direction: column;

			div {
				width: 100%;
				text-align: left;
				margin-bottom: 12px;
			}
		}
	}

	.callout {
		padding: 0.5em 0.25em;
		border-left: 2px solid var(--yellow);

		p {
			padding: 0;
			margin: 0;
		}
	}

	.value {
		font-size: 1em;
		color: var(--yellow);
	}

	.subvalue {
		color: var(--greyLight);
		font-size: 0.85em;
	}
</style>
