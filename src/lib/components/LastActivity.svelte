<script>
	import { formatMiles, formatMovingTime, formatRelativeDay } from '$lib/data/strava.js';

	let { activity } = $props();

	const href = $derived(
		activity?.url ||
			(activity?.id ? `https://www.strava.com/activities/${activity.id}` : null)
	);
	const when = $derived(formatRelativeDay(activity?.startDate));
	const time = $derived(formatMovingTime(activity?.movingTimeSec));
</script>

{#if activity && href}
	<a
		class="last-activity"
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		aria-label="Latest activity on Strava: {activity.name}"
	>
		<p class="eyebrow">Latest <span class="hint">→ Strava</span></p>
		<p class="headline">
			<span class="when">{when}</span>
			<span class="sep">·</span>
			<span class="dist">{formatMiles(activity.distanceKm)}</span>
			{#if time}
				<span class="sep">·</span>
				<span class="time">{time}</span>
			{/if}
		</p>
		<p class="name">{activity.name}</p>
	</a>
{:else if activity}
	<div class="last-activity static">
		<p class="eyebrow">Latest</p>
		<p class="headline">
			<span class="when">{when}</span>
			<span class="sep">·</span>
			<span class="dist">{formatMiles(activity.distanceKm)}</span>
		</p>
		<p class="name">{activity.name}</p>
	</div>
{/if}

<style lang="scss">
	.last-activity {
		display: block;
		text-decoration: none;
		color: inherit;
		min-width: 0;
		padding: 0.15rem 0;
		transition: transform 0.2s ease;

		&:not(.static):hover {
			transform: translateX(3px);

			.name,
			.hint {
				color: var(--yellow);
			}
		}

		&.static {
			cursor: default;
		}
	}

	.eyebrow {
		margin: 0 0 0.35rem;
		font-family: var(--headingFont);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--lightGray);
	}

	.hint {
		font-family: var(--codeFont);
		font-size: 0.65rem;
		letter-spacing: 0;
		text-transform: none;
		color: var(--lightGray);
		transition: color 0.2s ease;
	}

	.headline {
		margin: 0;
		font-family: var(--codeFont);
		font-size: 0.85rem;
		color: var(--offWhite);
		line-height: 1.4;
	}

	.sep {
		color: var(--lightGray);
		margin: 0 0.15rem;
	}

	.name {
		margin: 0.35rem 0 0;
		font-family: var(--headingFont);
		font-size: 1rem;
		color: var(--offWhite);
		transition: color 0.2s ease;
	}
</style>
