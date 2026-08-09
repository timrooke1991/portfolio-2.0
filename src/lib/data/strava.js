/**
 * Helpers for Strava-backed running stats (static/data/strava.json).
 * Distances are stored in km (Strava native) and shown in miles.
 */

const KM_PER_MILE = 1.609344;

export function kmToMiles(km) {
	if (km == null || Number.isNaN(km)) return null;
	return km / KM_PER_MILE;
}

export function formatMiles(km, digits = 1) {
	const miles = kmToMiles(km);
	if (miles == null) return '—';
	return `${miles.toLocaleString('en-GB', {
		maximumFractionDigits: digits,
		minimumFractionDigits: digits
	})} mi`;
}

export function formatRelativeDay(isoDate, now = new Date()) {
	if (!isoDate) return '';
	const start = new Date(isoDate);
	const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
	const day = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
	const diffDays = Math.round((today - day) / 86400000);

	if (diffDays <= 0) return 'Today';
	if (diffDays === 1) return 'Yesterday';
	if (diffDays < 7) return `${diffDays} days ago`;
	return start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function formatMovingTime(seconds) {
	if (!seconds) return '';
	const h = Math.floor(seconds / 3600);
	const m = Math.round((seconds % 3600) / 60);
	if (h > 0) return `${h}h ${m}m`;
	return `${m} min`;
}

/** Chip/gun style clock: 2:42:57 or 1:18:03 */
export function formatRaceClock(seconds) {
	if (seconds == null || Number.isNaN(seconds)) return '';
	const s = Math.round(seconds);
	const h = Math.floor(s / 3600);
	const m = Math.floor((s % 3600) / 60);
	const sec = s % 60;
	if (h > 0) {
		return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
	}
	return `${m}:${String(sec).padStart(2, '0')}`;
}

/** Pace seconds → m:ss */
export function formatPace(seconds) {
	if (seconds == null || Number.isNaN(seconds) || seconds <= 0) return '';
	const s = Math.round(seconds);
	const m = Math.floor(s / 60);
	const sec = s % 60;
	return `${m}:${String(sec).padStart(2, '0')}`;
}

/** Turn mile-split seconds into bar heights (taller = slower). */
export function splitsToBars(splits) {
	if (!splits?.length) return [];
	const times = splits.map((s) => s.seconds);
	const min = Math.min(...times);
	const max = Math.max(...times);
	const range = Math.max(max - min, 1);
	return splits.map((split) => {
		const normalised = (split.seconds - min) / range;
		return {
			mile: split.mile,
			seconds: split.seconds,
			height: Math.max(18, normalised * 78 + 18)
		};
	});
}

/** Build a dense 53-week grid (Sun→Sat) from sparse day entries (km). */
export function buildHeatmapGrid(dayEntries, weeks = 53, now = new Date()) {
	const byDate = new Map((dayEntries ?? []).map((d) => [d.date, d]));
	const end = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
	const endDow = end.getUTCDay();
	const lastSaturday = new Date(end);
	lastSaturday.setUTCDate(end.getUTCDate() + (6 - endDow));

	const totalDays = weeks * 7;
	const start = new Date(lastSaturday);
	start.setUTCDate(lastSaturday.getUTCDate() - (totalDays - 1));

	const cells = [];
	for (let i = 0; i < totalDays; i++) {
		const d = new Date(start);
		d.setUTCDate(start.getUTCDate() + i);
		const key = d.toISOString().slice(0, 10);
		const entry = byDate.get(key);
		const km = entry?.km ?? 0;
		const miles = kmToMiles(km) ?? 0;
		cells.push({
			date: key,
			km,
			miles,
			race: Boolean(entry?.race),
			raceName: entry?.raceName ?? null,
			// Thresholds in miles
			level: miles <= 0 ? 0 : miles < 4 ? 1 : miles < 8 ? 2 : miles < 12 ? 3 : 4
		});
	}
	return cells;
}

export function yearProgressRatio(year) {
	if (!year?.goalKm) return 0;
	return Math.min(1, (year.distanceKm ?? 0) / year.goalKm);
}
