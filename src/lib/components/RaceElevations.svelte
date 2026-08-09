<script>
	import {
		formatMiles,
		formatRaceClock,
		formatPace,
		splitsToBars
	} from '$lib/data/strava.js';

	let { races = [], eyebrow = 'Last 3 races' } = $props();

	const profiles = $derived(
		(races ?? []).map((race) => ({
			...race,
			bars: splitsToBars(race.splits ?? []),
			clock: formatRaceClock(race.elapsedTimeSec ?? race.movingTimeSec)
		}))
	);

	let containerRef = $state();
	let isVisible = $state(false);
	let hovered = $state(null);

	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (containerRef) {
			observer.observe(containerRef);
			return () => observer.disconnect();
		}
	});

	function formatRaceDate(iso) {
		if (!iso) return '';
		return new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', {
			month: 'short',
			year: 'numeric'
		});
	}
</script>

{#if profiles.length}
	<div class="races" bind:this={containerRef} class:visible={isVisible}>
		<header class="races-header">
			<p class="eyebrow">{eyebrow}</p>
		</header>

		<div class="race-grid">
			{#each profiles as race, ri}
				<a
					class="race"
					href={race.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="{race.name} {race.clock}, mile splits"
				>
					<div class="meta">
						<span class="name">{race.name}</span>
						<span class="time">{race.clock}</span>
						<span class="detail">
							{formatRaceDate(race.date)}
							{#if race.distanceKm}
								· {formatMiles(race.distanceKm)}
							{/if}
						</span>
					</div>
					{#if race.bars.length}
						<div class="chart" role="img" aria-label="Mile splits for {race.name}">
							{#each race.bars as bar, i}
								<span
									class="bar"
									class:active={hovered?.race === ri && hovered?.index === i}
									style:height="{bar.height}%"
									role="presentation"
									onmouseenter={() =>
										(hovered = {
											race: ri,
											index: i,
											mile: bar.mile,
											pace: formatPace(bar.seconds)
										})}
									onmouseleave={() => (hovered = null)}
								></span>
							{/each}
						</div>
						<span class="hover-readout">
							{#if hovered?.race === ri}
								Mile {hovered.mile} · {hovered.pace}/mi
							{/if}
						</span>
					{/if}
				</a>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.races {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		margin-top: var(--wholeNote);
		padding: 0 var(--margin);
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 0.6s ease,
			transform 0.6s ease;

		&.visible {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.races-header {
		max-width: 2000px;
		margin: 0 auto 0.65rem;
	}

	.eyebrow {
		margin: 0;
		font-family: var(--headingFont);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--lightGray);
	}

	.race-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.25rem;
		max-width: 2000px;
		margin: 0 auto;

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}

	.race {
		display: block;
		text-decoration: none;
		color: inherit;
		min-width: 0;

		&:hover .name,
		&:hover .time {
			color: var(--yellow);
		}
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 0.12rem;
		margin-bottom: 0.4rem;
	}

	.name {
		font-family: var(--codeFont);
		font-size: 0.75rem;
		color: var(--offWhite);
		transition: color 0.2s ease;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.time {
		font-family: var(--headingFont);
		font-size: 1.15rem;
		color: var(--offWhite);
		letter-spacing: 0.02em;
		transition: color 0.2s ease;
	}

	.detail {
		font-family: var(--codeFont);
		font-size: 0.65rem;
		color: var(--lightGray);
	}

	.chart {
		height: 64px;
		display: flex;
		align-items: flex-end;
		gap: 2px;
		padding-bottom: 2px;
		border-bottom: 1px solid rgba(229, 229, 229, 0.25);
	}

	.bar {
		flex: 1 1 0;
		min-width: 0;
		display: block;
		background: var(--lightGray);
		opacity: 0.55;
		cursor: crosshair;
		transition:
			opacity 0.15s ease,
			background-color 0.15s ease;

		&:hover,
		&.active {
			opacity: 1;
			background: var(--yellow);
		}
	}

	.hover-readout {
		display: block;
		margin-top: 0.25rem;
		font-family: var(--codeFont);
		font-size: 0.65rem;
		color: var(--yellow);
		min-height: 1em;
	}
</style>
