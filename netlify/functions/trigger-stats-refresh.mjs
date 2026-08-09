/**
 * Daily cron: kick a Netlify build so `stats:refresh` re-fetches Strava + GitHub.
 *
 * One-time Netlify setup:
 * 1. Site settings → Build & deploy → Build hooks → Add hook (e.g. "daily-stats")
 * 2. Copy the hook URL into env var NETLIFY_BUILD_HOOK
 *
 * Schedule is declared here and in netlify.toml (UTC).
 */

export default async (req) => {
	const hook = process.env.NETLIFY_BUILD_HOOK;
	if (!hook) {
		console.warn('NETLIFY_BUILD_HOOK is not set — skipping scheduled rebuild.');
		return;
	}

	let nextRun = null;
	try {
		const body = await req.json();
		nextRun = body?.next_run ?? null;
	} catch {
		// invoke without a body is fine (manual CLI test)
	}

	const res = await fetch(hook, { method: 'POST' });
	if (!res.ok) {
		const text = await res.text().catch(() => '');
		throw new Error(`Build hook failed: ${res.status} ${text}`);
	}

	console.log(
		`Triggered stats rebuild via build hook.${nextRun ? ` Next run: ${nextRun}` : ''}`
	);
};

export const config = {
	schedule: '0 6 * * *' // 06:00 UTC daily
};
