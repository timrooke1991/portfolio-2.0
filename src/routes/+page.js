import strava from '$lib/data/strava-stats.json';
import github from '$lib/data/github-stats.json';

/** @type {import('./$types').PageLoad} */
export function load() {
	return { strava, github };
}
