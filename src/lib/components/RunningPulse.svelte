<script>
	import YearProgress from '$lib/components/YearProgress.svelte';
	import LastActivity from '$lib/components/LastActivity.svelte';
	import TrainingHeatmap from '$lib/components/TrainingHeatmap.svelte';

	let { stats = null } = $props();

	const updatedLabel = $derived(
		stats?.updatedAt
			? new Date(stats.updatedAt).toLocaleDateString('en-GB', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				})
			: null
	);
</script>

{#if stats}
	<section class="running-pulse" aria-label="Live-ish running stats from Strava">
		<div class="top">
			<YearProgress year={stats.year} />
			<LastActivity activity={stats.lastActivity} />
		</div>

		<TrainingHeatmap days={stats.heatmap?.days ?? []} athleteUrl={stats.athleteUrl} />

		{#if updatedLabel}
			<p class="updated">Updated {updatedLabel} · cached from Strava</p>
		{/if}
	</section>
{/if}

<style lang="scss">
	.running-pulse {
		margin: var(--halfNote) 0 var(--wholeNote);
		padding-top: var(--halfNote);
		border-top: 1px solid rgba(225, 225, 225, 0.18);
		max-width: 42rem;
	}

	.top {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: var(--halfNote);
		margin-bottom: var(--halfNote);

		@media (max-width: 600px) {
			grid-template-columns: 1fr;
			gap: var(--quarterNote);
		}
	}

	.updated {
		margin: 0.65rem 0 0;
		font-family: var(--codeFont);
		font-size: 0.65rem;
		color: var(--lightGray);
	}
</style>
