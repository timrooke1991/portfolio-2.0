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
 *   STRAVA_YEAR_GOAL_MI   (default 2000) — current-year distance goal in miles
 *   STRAVA_YEAR_LABEL     (default "toward Chicago")
 *   STRAVA_ATHLETE_URL
 *   STRAVA_FIRST_YEAR     (default 2019)
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
		// no .env
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
const CURRENT_YEAR = new Date().getUTCFullYear();
const FIRST_YEAR = Number(process.env.STRAVA_FIRST_YEAR || 2013);

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
	while (page <= 40) {
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

function isRace(activity) {
	if (!isRunLike(activity)) return false;
	const name = activity.name || '';
	if (/parkrun/i.test(name)) return false;
	if (activity.workout_type === 1) return true;
	if ((activity.distance || 0) >= 42000) return true;
	if (/\b(marathon|half|10k|10\s*km|race)\b/i.test(name)) return true;
	return false;
}

function activityUrl(id) {
	return `https://www.strava.com/activities/${id}`;
}

function summariseYear(runs, year, now) {
	const prefix = String(year);
	const byDay = new Map();
	let distanceKm = 0;
	let elevGainM = 0;
	let activityCount = 0;

	for (const a of runs) {
		const start = new Date(a.start_date);
		const key = isoDate(start);
		if (!key.startsWith(prefix)) continue;

		const km = (a.distance || 0) / 1000;
		const prev = byDay.get(key) || { km: 0, race: false, raceName: null };
		prev.km += km;
		if (isRace(a)) {
			prev.race = true;
			prev.raceName = a.name;
		}
		byDay.set(key, prev);
		distanceKm += km;
		elevGainM += a.total_elevation_gain || 0;
		activityCount += 1;
	}

	const days = [...byDay.entries()]
		.map(([date, v]) => ({
			date,
			km: Math.round(v.km * 10) / 10,
			...(v.race ? { race: true, raceName: v.raceName } : {})
		}))
		.sort((a, b) => a.date.localeCompare(b.date));

	const races = runs
		.filter((a) => isRace(a) && isoDate(new Date(a.start_date)).startsWith(prefix))
		.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
		.slice(0, 3)
		.map((r) => ({
			id: r.id,
			name: r.name.replace(/\s*[💂🏛🎌🍀⭐🗽🌲].*$/u, '').trim() || r.name,
			date: (r.start_date_local || r.start_date || '').slice(0, 10),
			distanceKm: Math.round((r.distance / 1000) * 10) / 10,
			movingTimeSec: r.moving_time,
			elapsedTimeSec: r.elapsed_time || r.moving_time,
			url: activityUrl(r.id)
		}));

	const isCurrent = year === now.getUTCFullYear();
	return {
		year,
		distanceKm: Math.round(distanceKm * 10) / 10,
		goalKm: isCurrent ? GOAL_KM : null,
		elevGainM: Math.round(elevGainM),
		activityCount,
		label: isCurrent ? YEAR_LABEL : year < now.getUTCFullYear() ? 'full year' : 'year to date',
		heatmap: { days },
		lastThreeRaces: races
	};
}

async function buildStats(activities, now = new Date()) {
	const runs = activities.filter(isRunLike);
	const years = {};
	const yearList = [];

	for (let year = CURRENT_YEAR; year >= FIRST_YEAR; year--) {
		const summary = summariseYear(runs, year, now);
		// Keep years that have activity, plus always keep current year
		if (summary.activityCount > 0 || year === CURRENT_YEAR) {
			years[year] = summary;
			yearList.push(year);
		}
	}

	const current = years[CURRENT_YEAR];
	const latest = runs
		.slice()
		.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))[0];

	return {
		updatedAt: now.toISOString(),
		athleteUrl: ATHLETE_URL,
		yearList,
		years,
		year: current
			? {
					year: current.year,
					distanceKm: current.distanceKm,
					goalKm: current.goalKm,
					elevGainM: current.elevGainM,
					activityCount: current.activityCount,
					label: current.label
				}
			: null,
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
		heatmap: current?.heatmap ?? { days: [] },
		lastThreeRaces: current?.lastThreeRaces ?? []
	};
}

function writeFixture() {
	const today = new Date();
	function mulberry32(a) {
		return function () {
			let t = (a += 0x6d2b79f5);
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}
	const years = {};
	const yearList = [];
	for (let year = CURRENT_YEAR; year >= FIRST_YEAR; year--) {
		const rand = mulberry32(year * 9973);
		const days = [];
		let ytdKm = 0;
		const end = year === CURRENT_YEAR ? today : new Date(Date.UTC(year, 11, 31));
		const start = new Date(Date.UTC(year, 0, 1));
		for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
			const dow = d.getUTCDay();
			const runChance =
				dow === 0 ? 0.55 : dow === 6 ? 0.35 : [1, 3, 5].includes(dow) ? 0.7 : 0.25;
			if (rand() > runChance) continue;
			const isLong = dow === 0 && rand() > 0.4;
			const km = Math.round((isLong ? 18 + rand() * 14 : 5 + rand() * 10) * 10) / 10;
			days.push({ date: isoDate(d), km });
			ytdKm += km;
		}
		ytdKm = Math.round(ytdKm * 10) / 10;
		const isCurrent = year === CURRENT_YEAR;
		years[year] = {
			year,
			distanceKm: ytdKm,
			goalKm: isCurrent ? GOAL_KM : null,
			elevGainM: Math.round(ytdKm * 9.5),
			activityCount: days.length,
			label: isCurrent ? YEAR_LABEL : 'full year',
			heatmap: { days },
			lastThreeRaces: []
		};
		yearList.push(year);
	}
	const current = years[CURRENT_YEAR];
	const last = current.heatmap.days[current.heatmap.days.length - 1];
	return {
		updatedAt: today.toISOString(),
		athleteUrl: ATHLETE_URL,
		yearList,
		years,
		year: {
			year: CURRENT_YEAR,
			distanceKm: current.distanceKm,
			goalKm: current.goalKm,
			elevGainM: current.elevGainM,
			activityCount: current.activityCount,
			label: current.label
		},
		lastActivity: {
			name: 'Purbeck coastal loop',
			type: 'Run',
			distanceKm: last?.km ?? 10,
			movingTimeSec: Math.round(((last?.km ?? 10) / 5.2) * 3600),
			startDate: `${last?.date ?? isoDate(today)}T07:42:00Z`,
			url: ATHLETE_URL
		},
		heatmap: current.heatmap,
		lastThreeRaces: []
	};
}

async function main() {
	let stats;
	if (clientId && clientSecret && refreshToken) {
		console.log('Refreshing Strava access token…');
		const token = await refreshAccessToken();
		const after = Math.floor(Date.UTC(FIRST_YEAR, 0, 1) / 1000);
		console.log(`Fetching activities since ${FIRST_YEAR}…`);
		const activities = await fetchActivities(token, after);
		stats = await buildStats(activities);
		console.log(`Years: ${stats.yearList.join(', ')}`);
		for (const y of stats.yearList) {
			const s = stats.years[y];
			console.log(
				`  ${y}: ${s.heatmap.days.length} days · ${(s.distanceKm / 1.609344).toFixed(0)} mi · ${s.lastThreeRaces.length} races`
			);
		}
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
