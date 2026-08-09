<script>
	import ActivityHeatmap from '$lib/components/ActivityHeatmap.svelte';
	import PracticePulse from '$lib/components/PracticePulse.svelte';
	import {
		formatMiles,
		formatRaceClock,
		yearProgressRatio
	} from '$lib/data/strava.js';
	import { buildCalendarYearGrid, mergeYearLists } from '$lib/data/heatmap.js';
	import YearBio from '$lib/components/YearBio.svelte';
	import { yearBios } from '$lib/data/yearBios.js';

	let { github = null, strava = null } = $props();

	const yearOptions = $derived(
		mergeYearLists(
			github?.yearList,
			strava?.yearList,
			Object.keys(yearBios).map(Number),
			[strava?.year?.year]
		)
	);

	let selectedYear = $state(null);

	const activeYear = $derived(
		selectedYear && yearOptions.includes(selectedYear)
			? selectedYear
			: (yearOptions[0] ?? new Date().getFullYear())
	);

	const githubYear = $derived(github?.years?.[activeYear] ?? null);
	const stravaYear = $derived(strava?.years?.[activeYear] ?? null);

	const githubCells = $derived(
		buildCalendarYearGrid(
			(githubYear?.heatmap?.days ?? []).map((d) => ({
				date: d.date,
				level: d.level ?? 0,
				count: d.count ?? 0,
				tip:
					d.count > 0
						? `${d.date} · ${d.count} contribution${d.count === 1 ? '' : 's'}`
						: d.date
			})),
			activeYear
		)
	);

	const stravaCells = $derived.by(() => {
		const days = stravaYear?.heatmap?.days ?? [];
		const withLevels = days.map((d) => {
			const miles = (d.km ?? 0) / 1.609344;
			const level = miles <= 0 ? 0 : miles < 4 ? 1 : miles < 8 ? 2 : miles < 12 ? 3 : 4;
			return {
				date: d.date,
				level,
				km: d.km ?? 0,
				race: Boolean(d.race),
				raceName: d.raceName ?? null,
				tip: [
					d.date,
					d.km ? formatMiles(d.km) : null,
					d.race ? (d.raceName ? `Race · ${d.raceName}` : 'Race') : null
				]
					.filter(Boolean)
					.join(' · ')
			};
		});
		return buildCalendarYearGrid(withLevels, activeYear);
	});

	const races = $derived(
		(stravaYear?.lastThreeRaces ?? []).map((race) => ({
			...race,
			clock: formatRaceClock(race.elapsedTimeSec ?? race.movingTimeSec)
		}))
	);

	const githubUrl = $derived(github?.profileUrl || 'https://github.com/timrooke1991');
	const stravaUrl = $derived(strava?.athleteUrl || 'https://www.strava.com/athletes/12160480');

	const contribTotal = $derived(githubYear?.totalContributions ?? 0);
	const contribLabel = $derived(
		contribTotal ? contribTotal.toLocaleString('en-GB') : '—'
	);

	const yearStats = $derived(
		stravaYear
			? {
					year: stravaYear.year,
					distanceKm: stravaYear.distanceKm,
					goalKm: stravaYear.goalKm,
					activityCount: stravaYear.activityCount,
					label: stravaYear.label
				}
			: null
	);
	const milesRatio = $derived(
		yearStats?.goalKm ? yearProgressRatio(yearStats) : null
	);
	const milesValue = $derived(
		yearStats ? formatMiles(yearStats.distanceKm, 0).replace(/ mi$/, '') : ''
	);
	const milesMeta = $derived(
		yearStats
			? [
					yearStats.goalKm ? `goal ${formatMiles(yearStats.goalKm, 0)}` : null,
					yearStats.activityCount ? `${yearStats.activityCount} runs` : null
				]
					.filter(Boolean)
					.join(' · ')
			: ''
	);

	const yearIndex = $derived(yearOptions.indexOf(activeYear));
	const canPrev = $derived(yearIndex >= 0 && yearIndex < yearOptions.length - 1);
	const canNext = $derived(yearIndex > 0);

	function goPrev() {
		if (!canPrev) return;
		selectedYear = yearOptions[yearIndex + 1];
	}

	function goNext() {
		if (!canNext) return;
		selectedYear = yearOptions[yearIndex - 1];
	}

	function formatRaceDate(iso) {
		if (!iso) return '';
		return new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<section class="twin" aria-label="Engineering and running practices">
	<div class="year-bar">
		<button
			type="button"
			class="year-nav"
			onclick={goPrev}
			disabled={!canPrev}
			aria-label="Previous year"
		>
			‹
		</button>
		<p class="year-label" aria-live="polite">{activeYear}</p>
		<button
			type="button"
			class="year-nav"
			onclick={goNext}
			disabled={!canNext}
			aria-label="Next year"
		>
			›
		</button>
	</div>

	<div class="columns">
		<div class="column engineer">
			<header class="col-head">
				<h2>Tim the engineer</h2>
				<a class="col-link" href={githubUrl} target="_blank" rel="noopener noreferrer"
					>GitHub</a
				>
			</header>

			{#if githubYear}
				<PracticePulse
					accent="green"
					value={contribLabel}
					muted="contributions"
					label="in {activeYear}"
					meta="commits · PRs · reviews"
					ariaLabel="{contribLabel} GitHub contributions in {activeYear}"
				/>
			{:else}
				<p class="empty">No GitHub data for {activeYear}</p>
			{/if}

			<ActivityHeatmap
				cells={githubCells}
				accent="green"
				eyebrow="Contributions"
				ariaLabel="GitHub contributions in {activeYear}"
			/>

			<YearBio year={activeYear} />
		</div>

		<div class="column runner">
			<header class="col-head">
				<h2>Tim the runner</h2>
				<a class="col-link" href={stravaUrl} target="_blank" rel="noopener noreferrer"
					>Strava</a
				>
			</header>

			{#if yearStats}
				<PracticePulse
					accent="yellow"
					value="{milesValue} mi"
					muted="in {yearStats.year}"
					label={yearStats.label ?? 'year to date'}
					meta={milesMeta}
					ratio={milesRatio}
					ariaLabel="{formatMiles(yearStats.distanceKm, 0)} in {yearStats.year}"
				/>
			{:else}
				<p class="empty">No Strava data for {activeYear}</p>
			{/if}

			<ActivityHeatmap
				cells={stravaCells}
				accent="yellow"
				eyebrow="Training"
				ariaLabel="Run activity in {activeYear}"
				highlightLabel="Race"
			/>

			{#if races.length}
				<div class="list-block">
					<p class="list-eyebrow">Last 3 races</p>
					<ul class="item-list">
						{#each races as race}
							<li>
								<a href={race.url} target="_blank" rel="noopener noreferrer">
									<span class="item-name">
										{race.name}
										{#if race.clock}
											<span class="clock">{race.clock}</span>
										{/if}
									</span>
									<span class="item-meta">
										{formatRaceDate(race.date)}
										{#if race.distanceKm}
											· {formatMiles(race.distanceKm)}{/if}
									</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
	.twin {
		margin: var(--wholeNote) 0;
		padding-top: var(--halfNote);
		border-top: 1px solid rgba(225, 225, 225, 0.18);
	}

	.year-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.85rem;
		margin-bottom: var(--halfNote);
	}

	.year-label {
		margin: 0;
		min-width: 4.5rem;
		text-align: center;
		font-family: var(--codeFont);
		font-size: 1rem;
		color: var(--offWhite);
		letter-spacing: 0.04em;
	}

	.year-nav {
		appearance: none;
		border: 1px solid rgba(225, 225, 225, 0.18);
		background: transparent;
		color: var(--offWhite);
		font-family: var(--codeFont);
		font-size: 1.25rem;
		line-height: 1;
		width: 2rem;
		height: 2rem;
		border-radius: 2px;
		cursor: pointer;
		transition:
			color 0.2s ease,
			border-color 0.2s ease;

		&:hover:not(:disabled) {
			color: var(--yellow);
			border-color: var(--yellow);
		}

		&:disabled {
			opacity: 0.3;
			cursor: default;
		}
	}

	.columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--halfNote) var(--wholeNote);
		align-items: start;

		@media (max-width: 820px) {
			grid-template-columns: 1fr;
			gap: var(--wholeNote);
		}
	}

	.column {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--halfNote);
	}

	.col-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
	}

	h2 {
		margin: 0;
		font-size: clamp(1.15rem, 0.9rem + 1vw, 1.45rem);
		font-weight: 500;
		color: var(--offWhite);
	}

	.engineer h2 {
		border-left: 3px solid var(--green);
		padding-left: 0.65rem;
	}

	.runner h2 {
		border-left: 3px solid var(--yellow);
		padding-left: 0.65rem;
	}

	.col-link {
		font-family: var(--codeFont);
		font-size: 0.7rem;
		color: var(--lightGray);
		text-decoration: none;
		flex-shrink: 0;

		&:hover {
			color: var(--offWhite);
		}
	}

	.engineer .col-link:hover {
		color: var(--green);
	}

	.runner .col-link:hover {
		color: var(--yellow);
	}

	.empty {
		margin: 0;
		font-family: var(--codeFont);
		font-size: 0.8rem;
		color: var(--lightGray);
	}

	.list-block {
		min-width: 0;
	}

	.list-eyebrow {
		margin: 0 0 0.65rem;
		font-family: var(--headingFont);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--lightGray);
	}

	.item-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.item-list li {
		border-top: 1px solid rgba(225, 225, 225, 0.12);

		&:last-child {
			border-bottom: 1px solid rgba(225, 225, 225, 0.12);
		}
	}

	.item-list a {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 0.7rem 0;
		text-decoration: none;
		color: inherit;
		transition: transform 0.2s ease;

		&:hover {
			transform: translateX(3px);
		}
	}

	.engineer .item-list a:hover .item-name {
		color: var(--green);
	}

	.runner .item-list a:hover .item-name,
	.runner .item-list a:hover .clock {
		color: var(--yellow);
	}

	.item-name {
		font-family: var(--headingFont);
		font-size: 1rem;
		color: var(--offWhite);
		transition: color 0.2s ease;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.clock {
		font-family: var(--codeFont);
		font-size: 0.85rem;
		color: var(--offWhite);
		flex-shrink: 0;
		transition: color 0.2s ease;
	}

	.item-meta {
		font-family: var(--codeFont);
		font-size: 0.7rem;
		color: var(--lightGray);
	}

	.more {
		display: inline-block;
		margin-top: 0.75rem;
		font-family: var(--codeFont);
		font-size: 0.75rem;
		color: var(--lightGray);
		text-decoration: none;

		&:hover {
			color: var(--green);
		}
	}
</style>
