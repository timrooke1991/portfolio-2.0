import strava from '$lib/data/strava-stats.json';

/** @type {import('./$types').PageLoad} */
export function load() {
	return { strava };
}
