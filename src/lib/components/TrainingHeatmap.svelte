<script>
	import { buildHeatmapGrid, formatMiles } from '$lib/data/strava.js';

	let { days = [], athleteUrl = 'https://www.strava.com/athletes/12160480' } = $props();

	const cells = $derived(buildHeatmapGrid(days));
	const weeks = $derived(
		Array.from({ length: 53 }, (_, w) => cells.slice(w * 7, w * 7 + 7))
	);
	const raceCount = $derived(days.filter((d) => d.race).length);

	let tip = $state(null);
	let heatmapEl = $state();

	function showTip(cell, event) {
		const root = heatmapEl;
		if (!root) return;
		const rect = root.getBoundingClientRect();
		const parts = [cell.date];
		if (cell.km) parts.push(formatMiles(cell.km));
		if (cell.race) parts.push(cell.raceName ? `Race · ${cell.raceName}` : 'Race');
		else if (!cell.km) {
			// rest day — still show date
		}

		let x = event.clientX - rect.left + 12;
		let y = event.clientY - rect.top + 12;
		const tipW = 240;
		if (x + tipW > rect.width) x = Math.max(8, rect.width - tipW - 8);
		if (y + 48 > rect.height) y = Math.max(8, event.clientY - rect.top - 40);

		tip = {
			text: parts.join(' · '),
			x,
			y
		};
	}

	function hideTip() {
		tip = null;
	}
</script>

<div class="heatmap" bind:this={heatmapEl} aria-label="Training heatmap for the last year">
	<header class="heatmap-header">
		<p class="eyebrow">Training</p>
		<a class="source" href={athleteUrl} target="_blank" rel="noopener noreferrer">Strava</a>
	</header>

	<div class="grid-wrap">
		<div class="dow" aria-hidden="true">
			<span>M</span>
			<span>W</span>
			<span>F</span>
		</div>
		<div class="grid" role="img" aria-label="Run activity by day over the past year">
			{#each weeks as week}
				<div class="week">
					{#each week as cell}
						<span
							class="cell level-{cell.level}"
							class:race={cell.race}
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
		<span class="race-key">
			<span class="cell race"></span>
			Race{#if raceCount}
				· {raceCount}{/if}
		</span>
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
		margin-top: var(--quarterNote);
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

	.source {
		font-family: var(--codeFont);
		font-size: 0.7rem;
		color: var(--lightGray);
		text-decoration: none;

		&:hover {
			color: var(--yellow);
		}
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

		&.level-1 {
			background: rgba(239, 195, 113, 0.28);
		}
		&.level-2 {
			background: rgba(239, 195, 113, 0.48);
		}
		&.level-3 {
			background: rgba(239, 195, 113, 0.72);
		}
		&.level-4 {
			background: var(--yellow);
		}

		&.race {
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
