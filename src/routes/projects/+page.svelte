<script>
</script>

<svelte:head>
	<title>Tim Rooke | Projects</title>
	<meta data-key="projects" name="My noteworthy projects" />
	<meta property="og:image" content="https://timrooke.co.uk/images/site-image.png" />
	<meta name="twitter:image" content="https://timrooke.co.uk/images/site-image.png" />
</svelte:head>

<section class="page-container-center">
	<h1 class="page-title title-accent">Stuff that I have built</h1>
	<p class="intro">
		Side projects that follow curiosity — marathon training forensics, football graphs, manifesto
		hindsight, and training logs that sync to a sheet your coach can actually read.
	</p>
	<h2 class="section-title">2026</h2>
	<div class="projects-container">
		<article>
			<div class="project">
				<a
					href="https://github.com/timrooke1991/raceblocks"
					target="_blank"
					rel="noopener noreferrer"
				>
					<h3>Raceblocks</h3>
					<p class="preview">
						Ingest Strava race-tagged marathons, set a 10–15 week build window, and get a structured
						read on volume, intensity, taper, load dynamics, and conversion vs projected fitness —
						then compare builds week-by-week (London vs Amsterdam, and so on).
					</p>
					<aside class="categories">
						<ul class="no-bullets">
							<li>Next.js</li>
							<li>Strava</li>
							<li>SQLite</li>
						</ul>
					</aside>
					<p class="meta">
						<span class="stats">Training block analysis · compare builds · GitHub</span>
						<span class="link-text">View on GitHub →</span>
					</p>
				</a>
			</div>
		</article>
		<article>
			<div class="project">
				<a
					href="https://footballbacon.onrender.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<h3>Football Bacon</h3>
					<p class="preview">
						Six degrees of Kevin Bacon — for footballers. Build a chain between two players through
						overlapping club teammates, then pit your route against the shortest path found with
						bidirectional BFS. Daily and free-play modes over Top 5 league careers (2012+), with
						lives, hints, and shareable results.
					</p>
					<aside class="categories">
						<ul class="no-bullets">
							<li>Next.js</li>
							<li>SQLite</li>
							<li>Graph search</li>
						</ul>
					</aside>
					<p class="meta">
						<span class="stats">Daily puzzle · Top 5 leagues · shortest-path oracle</span>
						<span class="link-text">View Project →</span>
					</p>
				</a>
			</div>
		</article>
	</div>

	<h2 class="section-title">2025</h2>
	<div class="projects-container">
		<article>
			<div class="project">
				<a href="https://politicoretro.netlify.app/" target="_blank" rel="noopener noreferrer">
					<h3>Political Manifesto Retrospective</h3>
					<p class="preview">
						A century of UK manifestos and US platforms, scored by an LLM with the benefit of
						hindsight — born from an old political-history debate about Harold Wilson, finished as
						a weekend evals experiment. Conservative and Labour from the 19th century on, plus US
						platforms back to the mid-1800s.
					</p>
					<aside class="categories">
						<ul class="no-bullets">
							<li>Python</li>
							<li>OpenAI</li>
							<li>LLM-as-a-Judge</li>
						</ul>
					</aside>
					<p class="meta">
						<span class="stats">🇬🇧 66 Manifestos · 🇺🇸 91 Platforms</span>
						<span class="link-text">View Project →</span>
					</p>
				</a>
				<a href="/blog/with-the-benefit-of-hindsight" class="blog-link">
					Read the blog post
				</a>
			</div>
		</article>
		<article>
			<div class="project">
				<a
					href="https://trainingdiary.up.railway.app/dashboard"
					target="_blank"
					rel="noopener noreferrer"
				>
					<h3>Running Diary</h3>
					<p class="preview">
						Sync Strava runs to a Google Sheet for a shareable training diary. Connect with Strava, pick (and
						own) your spreadsheet data, then sync rich activity data including distance, pace, heart rate, elevation and
						perceived effort. Chart, analyse, share to your coach or friends.
					</p>
					<aside class="categories">
						<ul class="no-bullets">
							<li>Strava</li>
							<li>Google Sheets</li>
						</ul>
					</aside>
					<p class="meta">
						<span class="stats">Automated training log · Coach-friendly sharing</span>
						<span class="link-text">View Project →</span>
					</p>
				</a>
			</div>
		</article>
	</div>
</section>

<style lang="scss">
	p.intro {
		margin-bottom: var(--halfNote);
		line-height: 1.5;
		color: var(--offWhite);
	}

	.section-title {
		margin-bottom: 1rem;
		font-size: 0.85em;
		font-family: var(--codeFont);
		color: var(--yellow);
		text-transform: lowercase;
		line-height: 1.2;
	}

	.projects-container {
		margin: 1rem 0.5rem;
		padding: 0.5rem;
		border-left: 2px solid var(--purple);
	}

	article {
		transition: background-color 0.3s ease-in-out;
		transition-delay: 0.12s;
	}

	article::before {
		content: '';
		display: inline-block;
		position: absolute;
		width: 18px;
		height: 18px;
		margin-top: 5px;
		border-radius: 9px;
		border: 2px solid var(--purple);
		background-color: var(--grey);
		margin-right: 1rem;
		margin-left: -1rem;
		transition: background-color 0.3s ease-in-out;
		transition-delay: 0.12s;
	}

	article:hover::before {
		background-color: var(--purple);
	}

	.project {
		margin-left: 1rem;
		margin-bottom: 0.5rem;
		margin-top: 1rem;
		transition: transform 0.3s ease-in-out;

		&:hover {
			transform: translateX(0.75rem);
			cursor: pointer;
		}
	}

	h3 {
		position: relative;
		color: var(--ink);
		font-size: 1.2em;
		font-weight: 400;
	}

	p.preview {
		color: var(--midGray);
	}

	aside.categories {
		margin-bottom: var(--quarterNote);

		ul {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.5em;
			margin: 0;
			padding: 0;

			li {
				text-decoration: none;
				background-color: var(--purple);
				padding: 0.2em 0.4em;
				border-radius: 0.1em;
				font-size: 0.75em;
				color: var(--grey);

				&:hover {
					filter: brightness(90%);
				}
			}
		}
	}

	p.meta {
		display: flex;
		font-family: var(--codeFont);
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;

		span.stats {
			font-size: 0.75em;
			color: var(--greyLight);
		}

		span.link-text {
			font-size: 0.75em;
			color: var(--purple);
		}
	}

	.blog-link {
		display: inline-block;
		margin-top: 0.75rem;
		font-size: 0.85em;
		color: var(--yellow);
		text-decoration: none;
		transition: all 0.2s ease;

		&:hover {
			transform: translateX(4px);
		}
	}
</style>
