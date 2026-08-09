#!/usr/bin/env node
/**
 * Refresh src/lib/data/github-stats.json from the public GitHub contributions graph.
 *
 * Optional env:
 *   GITHUB_USERNAME   (default timrooke1991)
 *   GITHUB_PROFILE_URL
 *   GITHUB_FIRST_YEAR (default 2019)
 *
 * Usage:
 *   npm run github:refresh
 *
 * No token required — scrapes the public contributions calendar HTML per year.
 */

import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'src', 'lib', 'data', 'github-stats.json');

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

const USERNAME = process.env.GITHUB_USERNAME || 'timrooke1991';
const PROFILE_URL =
	process.env.GITHUB_PROFILE_URL || `https://github.com/${USERNAME}`;
const CURRENT_YEAR = new Date().getUTCFullYear();
const FIRST_YEAR = Number(process.env.GITHUB_FIRST_YEAR || 2013);

function parseCount(tipText) {
	if (!tipText || /^No contributions/i.test(tipText)) return 0;
	const m = tipText.match(/^([\d,]+)\s+contribution/i);
	if (!m) return 0;
	return Number(m[1].replace(/,/g, ''));
}

function parseContributionsHtml(html, year) {
	const totalMatch =
		html.match(new RegExp(`([\\d,]+)\\s+contributions\\s+in\\s+${year}`, 'i')) ||
		html.match(/([\d,]+)\s+contributions\s+in the last year/i);
	let totalContributions = totalMatch ? Number(totalMatch[1].replace(/,/g, '')) : null;

	const tipById = new Map();
	for (const m of html.matchAll(
		/for="(contribution-day-component-\d+-\d+)"[^>]*>([^<]*)<\/tool-tip>/g
	)) {
		tipById.set(m[1], m[2].trim());
	}

	const days = [];
	for (const m of html.matchAll(
		/<td\b[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*\bid="(contribution-day-component-\d+-\d+)"[^>]*\bdata-level="(\d)"[^>]*>/g
	)) {
		const date = m[1];
		const id = m[2];
		const level = Number(m[3]);
		const count = parseCount(tipById.get(id));
		if (!date.startsWith(String(year))) continue;
		days.push({ date, count, level });
	}

	if (!days.length) {
		for (const m of html.matchAll(
			/<td\b[^>]*\bid="(contribution-day-component-\d+-\d+)"[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*\bdata-level="(\d)"[^>]*>/g
		)) {
			const id = m[1];
			const date = m[2];
			const level = Number(m[3]);
			const count = parseCount(tipById.get(id));
			if (!date.startsWith(String(year))) continue;
			days.push({ date, count, level });
		}
	}

	days.sort((a, b) => a.date.localeCompare(b.date));
	if (totalContributions == null) {
		totalContributions = days.reduce((sum, d) => sum + (d.count || 0), 0);
	}
	return { totalContributions, days };
}

async function fetchYear(year) {
	const url = `https://github.com/users/${USERNAME}/contributions?from=${year}-01-01&to=${year}-12-31`;
	const res = await fetch(url, {
		headers: {
			'User-Agent': 'portfolio-refresh-github',
			Accept: 'text/html'
		}
	});
	if (!res.ok) {
		throw new Error(`GitHub contributions ${year} failed: ${res.status}`);
	}
	const html = await res.text();
	const { totalContributions, days } = parseContributionsHtml(html, year);
	if (!days.length) {
		throw new Error(`Parsed 0 contribution days for ${year}`);
	}
	return { totalContributions, days };
}

function writeFixture() {
	const years = {};
	const yearList = [];
	for (let year = CURRENT_YEAR; year >= FIRST_YEAR; year--) {
		yearList.push(year);
		const days = [];
		let total = 0;
		const end = year === CURRENT_YEAR ? new Date() : new Date(Date.UTC(year, 11, 31));
		const start = new Date(Date.UTC(year, 0, 1));
		for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
			const dow = d.getUTCDay();
			const active = [1, 2, 3, 4].includes(dow) && (year + d.getUTCDate()) % 3 !== 0;
			if (!active) {
				days.push({ date: d.toISOString().slice(0, 10), count: 0, level: 0 });
				continue;
			}
			const count = 3 + ((year + d.getUTCDate()) % 12);
			const level = count < 5 ? 1 : count < 9 ? 2 : count < 13 ? 3 : 4;
			total += count;
			days.push({ date: d.toISOString().slice(0, 10), count, level });
		}
		years[year] = { totalContributions: total, heatmap: { days } };
	}
	return {
		updatedAt: new Date().toISOString(),
		username: USERNAME,
		profileUrl: PROFILE_URL,
		yearList,
		years,
		// Compat: current / rolling snapshot
		totalContributions: years[CURRENT_YEAR]?.totalContributions ?? 0,
		heatmap: years[CURRENT_YEAR]?.heatmap ?? { days: [] }
	};
}

async function fetchStats() {
	const years = {};
	const yearList = [];
	for (let year = CURRENT_YEAR; year >= FIRST_YEAR; year--) {
		console.log(`  ${year}…`);
		const data = await fetchYear(year);
		years[year] = {
			totalContributions: data.totalContributions,
			heatmap: { days: data.days }
		};
		yearList.push(year);
		console.log(
			`    ${data.days.length} days · ${data.totalContributions.toLocaleString('en-GB')} contributions`
		);
	}
	return {
		updatedAt: new Date().toISOString(),
		username: USERNAME,
		profileUrl: PROFILE_URL,
		yearList,
		years,
		totalContributions: years[CURRENT_YEAR]?.totalContributions ?? 0,
		heatmap: years[CURRENT_YEAR]?.heatmap ?? { days: [] }
	};
}

async function main() {
	let stats;
	try {
		console.log(`Fetching contributions for ${USERNAME} (${FIRST_YEAR}–${CURRENT_YEAR})…`);
		stats = await fetchStats();
	} catch (err) {
		console.warn(err.message || err);
		console.warn('Writing fixture data.');
		stats = writeFixture();
	}

	mkdirSync(dirname(outPath), { recursive: true });
	writeFileSync(outPath, JSON.stringify(stats, null, 2) + '\n');
	console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
