<script>
	import ActivityHeatmap from '$lib/components/ActivityHeatmap.svelte';
	import { buildHeatmapGrid, formatMiles } from '$lib/data/strava.js';

	let { days = [] } = $props();

	const cells = $derived(
		buildHeatmapGrid(days).map((c) => ({
			...c,
			tip: [
				c.date,
				c.km ? formatMiles(c.km) : null,
				c.race ? (c.raceName ? `Race · ${c.raceName}` : 'Race') : null
			]
				.filter(Boolean)
				.join(' · ')
		}))
	);
</script>

<ActivityHeatmap
	{cells}
	accent="yellow"
	eyebrow="Training"
	ariaLabel="Training heatmap for the last year"
	highlightLabel="Race"
/>
