/**
 * World Marathon Majors progress + elevation profiles used as site motifs.
 * Elevations are simplified samples (metres) shaped from public course / trail character —
 * enough for a signature chart, not a GPS replay.
 */

export const majors = [
	{
		id: 'berlin',
		name: 'Berlin',
		status: 'done',
		year: 2019,
		date: '2019-09-29',
		time: '3:08:28',
		pace: '7:10/mi',
		href: 'https://www.strava.com/activities/2748903017'
	},
	{
		id: 'london',
		name: 'London',
		status: 'done',
		year: 2026,
		date: '2026-04-26',
		time: '2:42:57',
		pace: '6:13/mi',
		href: 'https://www.strava.com/activities/18264958842'
	},
	{
		id: 'tokyo',
		name: 'Tokyo',
		status: 'dream',
		year: null,
		href: null
	},
	{
		id: 'boston',
		name: 'Boston',
		status: 'dream',
		year: null,
		href: null
	},
	{
		id: 'chicago',
		name: 'Chicago',
		status: 'next',
		year: 'Oct 2026',
		href: null
	},
	{
		id: 'new-york',
		name: 'New York',
		status: 'dream',
		year: null,
		href: null
	}
];

export const majorsDone = majors.filter((m) => m.status === 'done').length;
export const majorsTotal = majors.length;

/** Isle of Purbeck coastal character — rolling cliffs, not a flat road race. */
export const purbeckElevation = {
	id: 'purbeck',
	label: 'Isle of Purbeck',
	detail: 'Coastal loop · Dorset',
	href: 'https://www.strava.com/athletes/12160480',
	unit: 'm',
	// Sampled elevations (m) along a typical cliff/coastal outing
	samples: [
		12, 18, 28, 42, 55, 68, 72, 61, 48, 55, 78, 95, 110, 118, 105, 88, 72, 85, 102, 125, 140,
		132, 118, 95, 78, 90, 115, 138, 152, 145, 128, 110, 95, 82, 70, 88, 108, 95, 72, 55, 42, 35,
		48, 62, 58, 40, 28, 22, 18, 14
	]
};

/** London Marathon — relatively flat with Tower Bridge as the known spike. */
export const londonElevation = {
	id: 'london',
	label: 'London Marathon',
	detail: '2026 · 2:42:57',
	href: 'https://www.strava.com/activities/18264958842',
	unit: 'm',
	samples: [
		8, 10, 14, 18, 22, 20, 16, 12, 10, 14, 18, 15, 11, 9, 12, 16, 14, 11, 13, 18, 22, 19, 15, 12,
		10, 14, 28, 35, 32, 24, 16, 12, 10, 11, 13, 15, 14, 12, 10, 9, 11, 14, 16, 18, 15, 12, 10, 8,
		7, 6
	]
};

export const defaultElevation = purbeckElevation;

/** Expand sparse samples into bar heights (0–100) for the separator chart. */
export function elevationToBars(samples, barCount = 120) {
	if (!samples?.length) return [];

	const min = Math.min(...samples);
	const max = Math.max(...samples);
	const range = Math.max(max - min, 1);

	return Array.from({ length: barCount }, (_, i) => {
		const t = i / (barCount - 1);
		const src = t * (samples.length - 1);
		const lo = Math.floor(src);
		const hi = Math.min(lo + 1, samples.length - 1);
		const frac = src - lo;
		const elev = samples[lo] * (1 - frac) + samples[hi] * frac;
		const normalised = ((elev - min) / range) * 100;
		// Keep a visible floor so flat sections still read as a chart
		return {
			height: Math.max(8, normalised * 0.92 + 8),
			elevation: Math.round(elev)
		};
	});
}
