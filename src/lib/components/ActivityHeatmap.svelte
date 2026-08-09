<script>
	import { cellsToWeeks } from '$lib/data/heatmap.js';

	/**
	 * @typedef {{ date: string, level: number, tip?: string, race?: boolean }} HeatCell
	 */

	let {
		cells = [],
		accent = 'yellow',
		eyebrow = 'Activity',
		ariaLabel = 'Activity heatmap for the last year',
		highlightLabel = null
	} = $props();

	const weeks = $derived(cellsToWeeks(cells));
	const highlightCount = $derived(
		highlightLabel ? cells.filter((c) => c.race).length : 0
	);

	let tip = $state(null);
	let heatmapEl = $state();

	function showTip(cell, event) {
		if (cell.inYear === false) return;
		const root = heatmapEl;
		if (!root) return;
		const rect = root.getBoundingClientRect();
		const text =
			cell.tip ||
			[cell.date, cell.race && cell.raceName ? `Race · ${cell.raceName}` : null]
				.filter(Boolean)
				.join(' · ');

		let x = event.clientX - rect.left + 12;
		let y = event.clientY - rect.top + 12;
		const tipW = 240;
		if (x + tipW > rect.width) x = Math.max(8, rect.width - tipW - 8);
		if (y + 48 > rect.height) y = Math.max(8, event.clientY - rect.top - 40);

		tip = { text, x, y };
	}

	function hideTip() {
		tip = null;
	}
</script>

<div
	class="heatmap accent-{accent}"
	bind:this={heatmapEl}
	aria-label={ariaLabel}
>
	<header class="heatmap-header">
		<p class="eyebrow">{eyebrow}</p>
	</header>

	<div class="grid-wrap">
		<div class="dow" aria-hidden="true">
			<span>M</span>
			<span>W</span>
			<span>F</span>
		</div>
		<div class="grid" role="img" aria-label={ariaLabel}>
			{#each weeks as week}
				<div class="week">
					{#each week as cell}
						<span
							class="cell level-{cell.level}"
							class:race={cell.race}
							class:out={cell.inYear === false}
							role="presentation"
							onmouseenter={(e) => showTip(cell, e)}
							onmousemove={(e) => showTip(cell, e)}
							onmouseleave={hideTip}
						></span>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class="legend" aria-hidden="true">
		<span>Less</span>
		<span class="cell level-0"></span>
		<span class="cell level-1"></span>
		<span class="cell level-2"></span>
		<span class="cell level-3"></span>
		<span class="cell level-4"></span>
		<span>More</span>
		{#if highlightLabel}
			<span class="race-key">
				<span class="cell race"></span>
				{highlightLabel}{#if highlightCount}
					· {highlightCount}{/if}
			</span>
		{/if}
	</div>

	{#if tip}
		<div class="tooltip" style:left="{tip.x}px" style:top="{tip.y}px">
			{tip.text}
		</div>
	{/if}
</div>

<style lang="scss">
	.heatmap {
		position: relative;
		min-width: 0;
	}

	.heatmap-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 0.55rem;
	}

	.eyebrow {
		margin: 0;
		font-family: var(--headingFont);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--lightGray);
	}

	.grid-wrap {
		display: flex;
		gap: 0.35rem;
		overflow-x: auto;
		padding-bottom: 0.25rem;
	}

	.dow {
		display: grid;
		grid-template-rows: repeat(7, 10px);
		gap: 2px;
		font-family: var(--codeFont);
		font-size: 0.55rem;
		color: var(--lightGray);
		padding-top: 0;

		span:nth-child(1) {
			grid-row: 2;
		}
		span:nth-child(2) {
			grid-row: 4;
		}
		span:nth-child(3) {
			grid-row: 6;
		}
	}

	.grid {
		display: flex;
		gap: 2px;
	}

	.week {
		display: grid;
		grid-template-rows: repeat(7, 10px);
		gap: 2px;
	}

	.cell {
		width: 10px;
		height: 10px;
		display: block;
		border-radius: 2px;
		background: rgba(225, 225, 225, 0.08);
		cursor: crosshair;
		box-sizing: border-box;

		&.out {
			opacity: 0.25;
			cursor: default;
		}
	}

	.accent-yellow {
		--accent-hot: var(--yellow);

		.cell.level-1 {
			background: rgba(239, 195, 113, 0.28);
		}
		.cell.level-2 {
			background: rgba(239, 195, 113, 0.48);
		}
		.cell.level-3 {
			background: rgba(239, 195, 113, 0.72);
		}
		.cell.level-4 {
			background: var(--yellow);
		}

		.cell.race {
			background: var(--purple);
		}
	}

	.accent-green {
		--accent-hot: var(--green);

		.cell.level-1 {
			background: rgba(181, 188, 103, 0.28);
		}
		.cell.level-2 {
			background: rgba(181, 188, 103, 0.48);
		}
		.cell.level-3 {
			background: rgba(181, 188, 103, 0.72);
		}
		.cell.level-4 {
			background: var(--green);
		}

		.cell.race {
			background: var(--purple);
		}
	}

	.legend {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 4px;
		margin-top: 0.5rem;
		font-family: var(--codeFont);
		font-size: 0.65rem;
		color: var(--lightGray);

		.cell {
			cursor: default;
		}
	}

	.race-key {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		margin-left: 0.75rem;
	}

	.tooltip {
		position: absolute;
		z-index: 50;
		pointer-events: none;
		padding: 0.3rem 0.45rem;
		background: var(--grey);
		border: 1px solid rgba(225, 225, 225, 0.2);
		color: var(--offWhite);
		font-family: var(--codeFont);
		font-size: 0.7rem;
		white-space: normal;
		max-width: min(320px, calc(100% - 16px));
		line-height: 1.35;
		overflow-wrap: anywhere;
	}
</style>
