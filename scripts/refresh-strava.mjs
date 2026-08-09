#!/usr/bin/env node
/**
 * Refresh static/data/strava.json from the Strava API.
 *
 * Required env:
 *   STRAVA_CLIENT_ID
 *   STRAVA_CLIENT_SECRET
 *   STRAVA_REFRESH_TOKEN
 *
 * Optional:
 *   STRAVA_YEAR_GOAL_MI   (default 2000) — year distance goal in miles
 *   STRAVA_YEAR_LABEL     (default "toward Chicago")
 *   STRAVA_ATHLETE_URL
 *
 * Usage:
 *   npm run strava:refresh
 *
 * Without credentials, regenerates a deterministic fixture (dev only).
 */

import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'src', 'lib', 'data', 'strava-stats.json');
const staticOutPath = join(__dirname, '..', 'static', 'data', 'strava.json');

function loadEnvFile() {
	try {
		const envPath = join(__dirname, '..', '.env');
		const text = readFileSync(envPath, 'utf8');
		for (const line of text.split('\n')) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith('#')) continue;
			const eq = trimmed.indexOf('=');
			if (eq === -1) continue;
			const key = trimmed.slice(0, eq).trim();
			let val = trimmed.slice(eq + 1).trim();
			if (
				(val.startsWith('"') && val.endsWith('"')) ||
				(val.startsWith("'") && val.endsWith("'"))
			) {
				val = val.slice(1, -1);
			}
			if (!(key in process.env)) process.env[key] = val;
		}
	} catch {
		// no .env — fine in CI if vars are injected
	}
}

loadEnvFile();

const ATHLETE_URL =
	process.env.STRAVA_ATHLETE_URL || 'https://www.strava.com/athletes/12160480';
const GOAL_MI = Number(
	process.env.STRAVA_YEAR_GOAL_MI ||
		(process.env.STRAVA_YEAR_GOAL_KM ? Number(process.env.STRAVA_YEAR_GOAL_KM) / 1.609344 : 2000)
);
const GOAL_KM = Math.round(GOAL_MI * 1.609344 * 10) / 10;
const YEAR_LABEL = process.env.STRAVA_YEAR_LABEL || 'toward Chicago';

const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;
const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

function isoDate(d) {
	return d.toISOString().slice(0, 10);
}

async function refreshAccessToken() {
	const res = await fetch('https://www.strava.com/oauth/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: 'refresh_token',
			refresh_token: refreshToken
		})
	});
	if (!res.ok) {
		throw new Error(`Strava token refresh failed: ${res.status} ${await res.text()}`);
	}
	const data = await res.json();
	if (data.refresh_token && data.refresh_token !== refreshToken) {
		console.warn(
			'Strava returned a new refresh token — update STRAVA_REFRESH_TOKEN in your secrets.'
		);
	}
	return data.access_token;
}

async function fetchActivities(accessToken, afterUnix) {
	const activities = [];
	let page = 1;
	while (page <= 10) {
		const url = new URL('https://www.strava.com/api/v3/athlete/activities');
		url.searchParams.set('after', String(afterUnix));
		url.searchParams.set('per_page', '200');
		url.searchParams.set('page', String(page));

		const res = await fetch(url, {
			headers: { Authorization: `Bearer ${accessToken}` }
		});
		if (!res.ok) {
			throw new Error(`Strava activities failed: ${res.status} ${await res.text()}`);
		}
		const batch = await res.json();
		if (!batch.length) break;
		activities.push(...batch);
		if (batch.length < 200) break;
		page += 1;
	}
	return activities;
}

function isRunLike(activity) {
	const t = (activity.sport_type || activity.type || '').toLowerCase();
	return ['run', 'trailrun', 'virtualrun'].includes(t);
}

/** Races: Strava race flag, marathon distance, or name cues (not parkrun / generic "5km"). */
function isRace(activity) {
	if (!isRunLike(activity)) return false;
	const name = activity.name || '';
	if (/parkrun/i.test(name)) return false;
	if (activity.workout_type === 1) return true;
	if ((activity.distance || 0) >= 42000) return true;
	if (/\b(marathon|half|10k|10\s*km|race)\b/i.test(name)) return true;
	return false;
}

function downsample(samples, target = 80) {
	if (!samples?.length) return [];
	if (samples.length <= target) return samples.map((n) => Math.round(n * 10) / 10);
	return Array.from({ length: target }, (_, i) => {
		const t = i / (target - 1);
		const src = t * (samples.length - 1);
		const lo = Math.floor(src);
		const hi = Math.min(lo + 1, samples.length - 1);
		const frac = src - lo;
		return Math.round((samples[lo] * (1 - frac) + samples[hi] * frac) * 10) / 10;
	});
}

const METERS_PER_MILE = 1609.34;

function streamData(body, type) {
	if (Array.isArray(body)) {
		return body.find((s) => s.type === type)?.data ?? [];
	}
	return body?.[type]?.data ?? [];
}

/** Build per-mile splits (seconds) from time + distance streams. */
function mileSplitsFromStreams(time, distance) {
	if (!time?.length || !distance?.length) return [];
	const splits = [];
	let mile = 1;
	let prevTime = time[0] ?? 0;
	let i = 0;
	while (i < distance.length && mile <= 30) {
		const target = mile * METERS_PER_MILE;
		while (i < distance.length && distance[i] < target) i += 1;
		if (i >= distance.length) break;
		const splitSec = time[i] - prevTime;
		if (splitSec > 0) {
			splits.push({ mile, seconds: Math.round(splitSec) });
		}
		prevTime = time[i];
		mile += 1;
	}
	return splits;
}

async function fetchMileSplits(accessToken, activityId) {
	const url = `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=time,distance&key_by_type=true`;
	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${accessToken}` }
	});
	if (!res.ok) return [];
	const body = await res.json();
	return mileSplitsFromStreams(streamData(body, 'time'), streamData(body, 'distance'));
}

function activityUrl(id) {
	return `https://www.strava.com/activities/${id}`;
}

async function buildStats(activities, accessToken, now = new Date()) {
	const year = now.getUTCFullYear();
	const yearStart = Date.UTC(year, 0, 1) / 1000;
	const cutoff = new Date(now);
	cutoff.setUTCDate(cutoff.getUTCDate() - 370);

	const runs = activities.filter(isRunLike);
	const byDay = new Map(); // date -> { km, race, raceName }

	let ytdKm = 0;
	let ytdElev = 0;
	let ytdCount = 0;

	for (const a of runs) {
		const start = new Date(a.start_date);
		if (start < cutoff) continue;
		const key = isoDate(start);
		const km = (a.distance || 0) / 1000;
		const prev = byDay.get(key) || { km: 0, race: false, raceName: null };
		prev.km += km;
		if (isRace(a)) {
			prev.race = true;
			prev.raceName = a.name;
		}
		byDay.set(key, prev);

		if (start.getTime() / 1000 >= yearStart) {
			ytdKm += km;
			ytdElev += a.total_elevation_gain || 0;
			ytdCount += 1;
		}
	}

	const days = [...byDay.entries()]
		.map(([date, v]) => ({
			date,
			km: Math.round(v.km * 10) / 10,
			...(v.race ? { race: true, raceName: v.raceName } : {})
		}))
		.sort((a, b) => a.date.localeCompare(b.date));

	const latest = runs
		.slice()
		.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))[0];

	const races = runs
		.filter(isRace)
		.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

	const top3 = races.slice(0, 3);
	const lastThreeRaces = [];
	for (const r of top3) {
		const splits = accessToken ? await fetchMileSplits(accessToken, r.id) : [];
		const elapsed = r.elapsed_time || r.moving_time;
		lastThreeRaces.push({
			id: r.id,
			name: r.name.replace(/\s*[💂🏛🎌🍀⭐🗽🌲].*$/u, '').trim() || r.name,
			date: (r.start_date_local || r.start_date || '').slice(0, 10),
			distanceKm: Math.round((r.distance / 1000) * 10) / 10,
			movingTimeSec: r.moving_time,
			elapsedTimeSec: elapsed,
			url: activityUrl(r.id),
			splits
		});
	}

	return {
		updatedAt: now.toISOString(),
		athleteUrl: ATHLETE_URL,
		year: {
			year,
			distanceKm: Math.round(ytdKm * 10) / 10,
			goalKm: GOAL_KM,
			elevGainM: Math.round(ytdElev),
			activityCount: ytdCount,
			label: YEAR_LABEL
		},
		lastActivity: latest
			? {
					id: latest.id,
					name: latest.name,
					type: latest.sport_type || latest.type,
					distanceKm: Math.round((latest.distance / 1000) * 10) / 10,
					movingTimeSec: latest.moving_time,
					startDate: latest.start_date_local || latest.start_date,
					url: activityUrl(latest.id)
				}
			: null,
		heatmap: { days },
		lastThreeRaces
	};
}

function writeFixture() {
	// Deterministic offline fixture when credentials are missing
	const today = new Date();
	function mulberry32(a) {
		return function () {
			let t = (a += 0x6d2b79f5);
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}
	const rand = mulberry32(today.getUTCFullYear() * 10000 + (today.getUTCMonth() + 1) * 100 + today.getUTCDate());
	const days = [];
	let ytdKm = 0;
	const year = today.getUTCFullYear();
	const yearStart = new Date(Date.UTC(year, 0, 1));

	for (let i = 364; i >= 0; i--) {
		const d = new Date(today);
		d.setUTCDate(today.getUTCDate() - i);
		const dow = d.getUTCDay();
		const runChance = dow === 0 ? 0.55 : dow === 6 ? 0.35 : [1, 3, 5].includes(dow) ? 0.7 : 0.25;
		if (rand() > runChance) continue;
		const isLong = dow === 0 && rand() > 0.4;
		const km = Math.round((isLong ? 18 + rand() * 14 : 5 + rand() * 10) * 10) / 10;
		days.push({ date: isoDate(d), km });
		if (d >= yearStart) ytdKm += km;
	}
	ytdKm = Math.round(ytdKm * 10) / 10;
	const last = days[days.length - 1];

	return {
		updatedAt: today.toISOString(),
		athleteUrl: ATHLETE_URL,
		year: {
			year,
			distanceKm: ytdKm,
			goalKm: GOAL_KM,
			elevGainM: Math.round(ytdKm * 9.5),
			activityCount: days.filter((d) => d.date.startsWith(String(year))).length,
			label: YEAR_LABEL
		},
		lastActivity: {
			name: 'Purbeck coastal loop',
			type: 'Run',
			distanceKm: last.km,
			movingTimeSec: Math.round((last.km / 5.2) * 3600),
			startDate: `${last.date}T07:42:00Z`,
			url: ATHLETE_URL
		},
		heatmap: { days },
		lastThreeRaces: []
	};
}

async function main() {
	let stats;
	if (clientId && clientSecret && refreshToken) {
		console.log('Refreshing Strava access token…');
		const token = await refreshAccessToken();
		const after = Math.floor(Date.now() / 1000) - 370 * 86400;
		console.log('Fetching activities…');
		const activities = await fetchActivities(token, after);
		stats = await buildStats(activities, token);
		console.log(
			`Aggregated ${stats.heatmap.days.length} active days, YTD ${stats.year.distanceKm} km (${(stats.year.distanceKm / 1.609344).toFixed(1)} mi)`
		);
		console.log(`Last 3 races: ${stats.lastThreeRaces.map((r) => r.name).join(' · ') || '(none)'}`);
	} else {
		console.warn('Missing STRAVA_* credentials — writing fixture data.');
		stats = writeFixture();
	}

	mkdirSync(dirname(outPath), { recursive: true });
	mkdirSync(dirname(staticOutPath), { recursive: true });
	const payload = JSON.stringify(stats, null, 2) + '\n';
	writeFileSync(outPath, payload);
	writeFileSync(staticOutPath, payload);
	console.log(`Wrote ${outPath}`);
	console.log(`Wrote ${staticOutPath}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
