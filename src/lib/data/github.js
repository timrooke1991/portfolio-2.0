/**
 * Helpers for GitHub contribution stats (src/lib/data/github-stats.json).
 */

/** Build a dense 53-week grid (Sun→Sat) from contribution day entries. */
export function buildContributionGrid(dayEntries, weeks = 53, now = new Date()) {
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
		const count = entry?.count ?? 0;
		const level =
			entry?.level != null
				? entry.level
				: count <= 0
					? 0
					: count < 3
						? 1
						: count < 7
							? 2
							: count < 12
								? 3
								: 4;
		cells.push({
			date: key,
			count,
			level,
			tip:
				count > 0
					? `${key} · ${count.toLocaleString('en-GB')} contribution${count === 1 ? '' : 's'}`
					: key
		});
	}
	return cells;
}
