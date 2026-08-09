/**
 * Shared activity heatmap helpers (GitHub contributions / Strava training).
 */

/** Build a dense week grid (Sun→Sat) for a calendar year. */
export function buildCalendarYearGrid(dayEntries, year, now = new Date()) {
	const byDate = new Map((dayEntries ?? []).map((d) => [d.date, d]));
	const jan1 = new Date(Date.UTC(year, 0, 1));
	const start = new Date(jan1);
	start.setUTCDate(jan1.getUTCDate() - jan1.getUTCDay());

	const yearEnd =
		year === now.getUTCFullYear()
			? new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))
			: new Date(Date.UTC(year, 11, 31));
	const end = new Date(yearEnd);
	end.setUTCDate(yearEnd.getUTCDate() + (6 - yearEnd.getUTCDay()));

	const cells = [];
	for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
		const key = d.toISOString().slice(0, 10);
		const inYear = key.startsWith(String(year));
		const entry = inYear ? byDate.get(key) : null;
		cells.push({
			date: key,
			inYear,
			level: inYear ? (entry?.level ?? 0) : 0,
			count: entry?.count ?? 0,
			km: entry?.km ?? 0,
			race: Boolean(entry?.race),
			raceName: entry?.raceName ?? null,
			tip: entry?.tip ?? null
		});
	}
	return cells;
}

/** @deprecated Prefer buildCalendarYearGrid for year views */
export function buildLevelGrid(dayEntries, weeks = 53, now = new Date()) {
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
		cells.push({
			date: key,
			inYear: true,
			level: entry?.level ?? 0,
			count: entry?.count ?? 0,
			km: entry?.km ?? 0,
			race: Boolean(entry?.race),
			raceName: entry?.raceName ?? null,
			tip: entry?.tip ?? null
		});
	}
	return cells;
}

export function cellsToWeeks(cells) {
	const weekCount = Math.ceil((cells?.length ?? 0) / 7);
	return Array.from({ length: weekCount }, (_, w) => cells.slice(w * 7, w * 7 + 7));
}

/** Years available in either dataset, newest first. */
export function mergeYearLists(...lists) {
	const set = new Set();
	for (const list of lists) {
		for (const y of list ?? []) set.add(Number(y));
	}
	return [...set].sort((a, b) => b - a);
}
