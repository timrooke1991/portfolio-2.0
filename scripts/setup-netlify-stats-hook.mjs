#!/usr/bin/env node
/**
 * Create (or reuse) a Netlify build hook and store it as NETLIFY_BUILD_HOOK.
 *
 * Prerequisites:
 *   npx netlify-cli login
 *   npx netlify-cli link   # link this repo to the Netlify site
 *
 * Usage:
 *   npm run netlify:setup-stats-hook
 */

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const HOOK_TITLE = 'daily-stats-refresh';

function run(args, { json = false } = {}) {
	const out = execFileSync('npx', ['--yes', 'netlify-cli', ...args], {
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'pipe']
	});
	if (!json) return out.trim();
	return JSON.parse(out);
}

function main() {
	console.log('Resolving linked Netlify site…');
	let siteId = null;
	try {
		const status = run(['status', '--json'], { json: true });
		siteId =
			status?.siteData?.['site-id'] ||
			status?.siteInformation?.id ||
			status?.siteId ||
			status?.site?.id ||
			null;
	} catch {
		// fall through to state.json
	}
	if (!siteId) {
		try {
			const state = JSON.parse(
				readFileSync(new URL('../.netlify/state.json', import.meta.url), 'utf8')
			);
			siteId = state.siteId || null;
		} catch {
			// ignore
		}
	}
	if (!siteId) {
		throw new Error(
			'No linked site. Run `npx netlify-cli link` from this repo first.'
		);
	}
	console.log(`Site: ${siteId}`);

	console.log('Listing build hooks…');
	const hooks = run(['api', 'listSiteBuildHooks', '--data', JSON.stringify({ site_id: siteId })], {
		json: true
	});
	const existing = (Array.isArray(hooks) ? hooks : []).find((h) => h.title === HOOK_TITLE);

	let url = existing?.url;
	if (url) {
		console.log(`Reusing existing hook “${HOOK_TITLE}”.`);
	} else {
		console.log(`Creating build hook “${HOOK_TITLE}”…`);
		const created = run(
			[
				'api',
				'createSiteBuildHook',
				'--data',
				JSON.stringify({
					site_id: siteId,
					body: { title: HOOK_TITLE, branch: 'main' }
				})
			],
			{ json: true }
		);
		url = created?.url;
		if (!url) throw new Error(`Hook create failed: ${JSON.stringify(created)}`);
		console.log('Created.');
	}

	console.log('Setting NETLIFY_BUILD_HOOK (secret, production + deploy-preview)…');
	run([
		'env:set',
		'NETLIFY_BUILD_HOOK',
		url,
		'--secret',
		'--context',
		'production',
		'deploy-preview',
		'branch-deploy'
	]);
	console.log('Done. Next production deploy will pick up the scheduled function + hook.');
	console.log(`Hook URL stored in Netlify env (not printed; ends with …${url.slice(-8)}).`);
}

try {
	main();
} catch (err) {
	console.error(err.message || err);
	process.exit(1);
}
