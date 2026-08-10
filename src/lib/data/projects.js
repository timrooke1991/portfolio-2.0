/** Featured side projects for the home twin column. */
export const recentProjects = [
	{
		name: 'Raceblocks',
		year: '2026',
		href: 'https://github.com/timrooke1991/raceblocks',
		meta: 'Strava · marathon block analysis'
	},
	{
		name: 'Football Bacon',
		year: '2026',
		href: 'https://footballbacon.onrender.com/',
		meta: 'Daily puzzle · graph search'
	},
	{
		name: 'Political Manifesto Retrospective',
		year: '2025',
		href: 'https://politicoretro.netlify.app/',
		meta: 'LLM-as-a-Judge · UK & US'
	},
	{
		name: 'Running Diary',
		year: '2025',
		href: 'https://trainingdiary.up.railway.app/dashboard',
		meta: 'Strava → Google Sheets'
	}
];

/**
 * Full project write-ups for /projects.
 * @typedef {{
 *   name: string,
 *   href: string,
 *   image: string,
 *   imageAlt: string,
 *   preview: string,
 *   tags: string[],
 *   stats: string,
 *   cta: string,
 *   blogHref?: string,
 *   blogLabel?: string
 * }} ProjectDetail
 * @typedef {{ year: string, projects: ProjectDetail[] }} ProjectYear
 */

/** @type {ProjectYear[]} */
export const projectYears = [
	{
		year: '2026',
		projects: [
			{
				name: 'Raceblocks',
				href: 'https://github.com/timrooke1991/raceblocks',
				image: '/images/projects/raceblocks.jpg',
				imageAlt: 'Raceblocks analysis for London Marathon 2025 — conversion outcome and weekly volume',
				preview:
					'Ingest Strava race-tagged marathons, set a 10–15 week build window, and get a structured read on volume, intensity, taper, load dynamics, and conversion vs projected fitness — then compare builds week-by-week (London vs Amsterdam, and so on).',
				tags: ['Next.js', 'Strava', 'SQLite'],
				stats: 'Training block analysis · compare builds · GitHub',
				cta: 'View on GitHub →'
			},
			{
				name: 'Football Bacon',
				href: 'https://footballbacon.onrender.com/',
				image: '/images/projects/football-bacon.jpg',
				imageAlt: 'Football Bacon daily puzzle connecting Andrés Iniesta to Rio Ferdinand',
				preview:
					'Six degrees of Kevin Bacon — for footballers. Build a chain between two players through overlapping club teammates, then pit your route against the shortest path found with bidirectional BFS. Daily and free-play modes over Top 5 league careers (2012+), with lives, hints, and shareable results.',
				tags: ['Next.js', 'SQLite', 'Graph search'],
				stats: 'Daily puzzle · Top 5 leagues · shortest-path oracle',
				cta: 'View Project →'
			}
		]
	},
	{
		year: '2025',
		projects: [
			{
				name: 'Political Manifesto Retrospective',
				href: 'https://politicoretro.netlify.app/',
				image: '/images/projects/politicoretro.jpg',
				imageAlt: 'UK Manifesto Retrospective grading Conservative and Labour pledges with hindsight',
				preview:
					'A century of UK manifestos and US platforms, scored by an LLM with the benefit of hindsight — born from an old political-history debate about Harold Wilson, finished as a weekend evals experiment. Conservative and Labour from the 19th century on, plus US platforms back to the mid-1800s.',
				tags: ['Python', 'OpenAI', 'LLM-as-a-Judge'],
				stats: '🇬🇧 66 Manifestos · 🇺🇸 91 Platforms',
				cta: 'View Project →',
				blogHref: '/blog/with-the-benefit-of-hindsight',
				blogLabel: 'Read the blog post'
			},
			{
				name: 'Running Diary',
				href: 'https://trainingdiary.up.railway.app/dashboard',
				image: '/images/projects/running-diary.jpg',
				imageAlt: 'Running Diary landing page — sync Strava runs to a Google Sheet',
				preview:
					'Sync Strava runs to a Google Sheet for a shareable training diary. Connect with Strava, pick (and own) your spreadsheet data, then sync rich activity data including distance, pace, heart rate, elevation and perceived effort. Chart, analyse, share to your coach or friends.',
				tags: ['Strava', 'Google Sheets'],
				stats: 'Automated training log · Coach-friendly sharing',
				cta: 'View Project →'
			}
		]
	}
];
