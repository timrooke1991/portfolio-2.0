#!/usr/bin/env node
/**
 * One-time Strava OAuth to obtain a refresh token with activity:read scope.
 *
 * 1. npm run strava:auth
 * 2. Open the printed URL, authorize the app
 * 3. Copy the `code` from the redirect URL (?code=...)
 * 4. Paste it when prompted
 *
 * Writes STRAVA_REFRESH_TOKEN into .env (creates/updates the line).
 */

import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env');

function loadEnvFile() {
	if (!existsSync(envPath)) return;
	const text = readFileSync(envPath, 'utf8');
	for (const line of text.split('\n')) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const eq = trimmed.indexOf('=');
		if (eq === -1) continue;
		const key = trimmed.slice(0, eq).trim();
		let val = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
		if (!(key in process.env)) process.env[key] = val;
	}
}

function upsertEnv(key, value) {
	let text = existsSync(envPath) ? readFileSync(envPath, 'utf8') : '';
	const line = `${key}=${value}`;
	if (new RegExp(`^${key}=`, 'm').test(text)) {
		text = text.replace(new RegExp(`^${key}=.*$`, 'm'), line);
	} else {
		text = text.trimEnd() + (text.endsWith('\n') || !text ? '' : '\n') + line + '\n';
	}
	writeFileSync(envPath, text.endsWith('\n') ? text : text + '\n');
}

loadEnvFile();

const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;
const redirectUri = process.env.STRAVA_REDIRECT_URI || 'http://localhost';

if (!clientId || !clientSecret) {
	console.error('Missing STRAVA_CLIENT_ID / STRAVA_CLIENT_SECRET in .env');
	process.exit(1);
}

const scopes = 'read,activity:read_all';
const authUrl = new URL('https://www.strava.com/oauth/authorize');
authUrl.searchParams.set('client_id', clientId);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('redirect_uri', redirectUri);
authUrl.searchParams.set('approval_prompt', 'force');
authUrl.searchParams.set('scope', scopes);

console.log('\n1. Ensure your Strava API app Authorization Callback Domain matches:');
console.log(`   ${redirectUri}`);
console.log('\n2. Open this URL, authorize, then copy the code from the redirect:\n');
console.log(authUrl.toString());
console.log('');

const rl = createInterface({ input, output });
const raw = await rl.question('Paste the full redirect URL (or just the code): ');
rl.close();

let code = raw.trim();
try {
	if (code.includes('code=')) {
		code = new URL(code).searchParams.get('code') || code;
	}
} catch {
	// plain code
}

if (!code) {
	console.error('No code provided.');
	process.exit(1);
}

const res = await fetch('https://www.strava.com/oauth/token', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		client_id: clientId,
		client_secret: clientSecret,
		code,
		grant_type: 'authorization_code'
	})
});

if (!res.ok) {
	console.error(`Token exchange failed: ${res.status} ${await res.text()}`);
	process.exit(1);
}

const data = await res.json();
if (!data.refresh_token) {
	console.error('No refresh_token in response:', data);
	process.exit(1);
}

upsertEnv('STRAVA_REFRESH_TOKEN', data.refresh_token);
console.log('\nSaved STRAVA_REFRESH_TOKEN to .env');
console.log(`Scopes: ${data.scope || '(see Strava response)'}`);
console.log('\nNext: npm run strava:refresh\n');
