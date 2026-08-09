<script>
	import { formatMiles, yearProgressRatio } from '$lib/data/strava.js';

	let { year } = $props();

	const ratio = $derived(yearProgressRatio(year));
	const pct = $derived(Math.round(ratio * 100));
	const size = 72;
	const stroke = 5;
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;
	const dash = $derived(c * ratio);
</script>

{#if year}
	<div class="year-progress" aria-label="{formatMiles(year.distanceKm, 0)} in {year.year}">
		<svg width={size} height={size} viewBox="0 0 {size} {size}" aria-hidden="true">
			<circle
				class="track"
				cx={size / 2}
				cy={size / 2}
				r={r}
				stroke-width={stroke}
				fill="none"
			/>
			<circle
				class="fill"
				cx={size / 2}
				cy={size / 2}
				r={r}
				stroke-width={stroke}
				fill="none"
				stroke-dasharray="{dash} {c}"
				stroke-linecap="round"
				transform="rotate(-90 {size / 2} {size / 2})"
			/>
			<text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" class="pct">
				{pct}%
			</text>
		</svg>
		<div class="copy">
			<p class="value">{formatMiles(year.distanceKm, 0)} <span class="muted">in {year.year}</span></p>
			<p class="label">{year.label ?? 'year to date'}</p>
			<p class="meta">
				goal {formatMiles(year.goalKm, 0)}
				{#if year.activityCount}
					· {year.activityCount} runs
				{/if}
			</p>
		</div>
	</div>
{/if}

<style lang="scss">
	.year-progress {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		min-width: 0;
	}

	.track {
		stroke: rgba(225, 225, 225, 0.15);
	}

	.fill {
		stroke: var(--yellow);
		transition: stroke-dasharray 0.8s ease;
	}

	.pct {
		font-family: var(--codeFont);
		font-size: 0.7rem;
		fill: var(--offWhite);
	}

	.copy {
		min-width: 0;
	}

	.value {
		margin: 0;
		font-family: var(--headingFont);
		font-size: 1rem;
		color: var(--offWhite);
		line-height: 1.3;
	}

	.muted {
		color: var(--lightGray);
		font-weight: 400;
	}

	.label {
		margin: 0.15rem 0 0;
		font-family: var(--codeFont);
		font-size: 0.75rem;
		color: var(--yellow);
		text-transform: lowercase;
	}

	.meta {
		margin: 0.2rem 0 0;
		font-family: var(--codeFont);
		font-size: 0.7rem;
		color: var(--lightGray);
	}
</style>
