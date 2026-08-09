<script>
	import RaceElevations from '$lib/components/RaceElevations.svelte';
	import MarathonMajors from '$lib/components/MarathonMajors.svelte';
	import RunningPulse from '$lib/components/RunningPulse.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Tim Rooke | AI Product Engineer & Marathon Runner</title>
	<meta property="og:title" content="Home" />
	<meta
		name="description"
		content="Tim Rooke - AI Product Engineer and Marathon Runner based in Bournemouth"
	/>
</svelte:head>

<section class="intro">
	<div class="title-container">
		<h1>
			<span class="wave">👋</span>
			<span class="highlight">Hi, I'm Tim</span>
		</h1>
		<h2 class="roles">
			AI Product Engineer and Marathon Runner
		</h2>
	</div>

	<p class="bio">
		I specialise in product engineering at small and scaleup companies, bringing both
		<span class="highlight">engineering</span> and <span class="highlight">product management</span> expertise.
		Always curious and learning - currently exploring the world of
		<span class="tech-highlight">Svelte</span>.
	</p>

	<RunningPulse stats={data.strava} />
</section>

<RaceElevations races={data.strava?.lastThreeRaces ?? []} />

<footer>
	<div class="footer-grid">
		<div class="footer-section about">
			<h3>About</h3>
			<p>
				Software engineer focused on building great products with JavaScript (TypeScript, React,
				Vue and Svelte) and Python. Previous experience with Node, Ruby, and PHP. Exploring the AI
				world with tools like Cursor and Claude.
			</p>
			<p class="place-line">Poole · Isle of Purbeck · Dorset coast</p>
			<div class="social-links">
				<a href="https://github.com/timrooke1991" class="social-link">GitHub</a>
				<a href="https://twitter.com/timrooke1991" class="social-link">Twitter</a>
				<a href="https://www.strava.com/athletes/12160480" class="social-link">Strava</a>
			</div>
		</div>

		<div class="footer-section posts">
			<h3>Latest Posts</h3>
			<ul>
				<li><a href="/blog/with-the-benefit-of-hindsight">With the Benefit of Hindsight</a></li>
				<li><a href="/blog/svelte-first-impressions">Reflections on Svelte</a></li>
				<li><a href="/blog/neetcode-150">Neetcode 150</a></li>
			</ul>
		</div>

		<div class="footer-section majors">
			<MarathonMajors compact />
		</div>
	</div>
</footer>

<style lang="scss">
	h1 {
		font-size: clamp(2.5rem, 1.5rem + 3vw, 4rem);
		margin-bottom: var(--quarterNote);
		font-weight: 600;
		color: var(--ink);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.wave {
		display: inline-block;
		animation: wave 2.5s infinite;
		transform-origin: 70% 70%;
	}

	@keyframes wave {
		0% { transform: rotate(0deg); }
		10% { transform: rotate(14deg); }
		20% { transform: rotate(-8deg); }
		30% { transform: rotate(14deg); }
		40% { transform: rotate(-4deg); }
		50% { transform: rotate(10deg); }
		60% { transform: rotate(0deg); }
		100% { transform: rotate(0deg); }
	}

	h2.roles {
		font-size: clamp(1.2rem, 0.8rem + 2vw, 2rem);
		color: var(--offWhite);
		font-weight: 400;
		line-height: 1.4;
	}

	.bio {
		font-size: 1.1rem;
		line-height: 1.6;
		margin: var(--halfNote) 0;
	}

	.tech-highlight {
		background: linear-gradient(transparent 50%, rgba(255, 200, 0, 0.2) 50%);
		padding: 0 0.3em;
		border-radius: 4px;
	}

	.title-container {
		margin-bottom: var(--halfNote);
	}

	footer {
		margin-top: var(--wholeNote);
		padding: var(--halfNote) 0 var(--wholeNote);
		border-top: 1px solid rgba(225, 225, 225, 0.15);
		font-size: 0.9rem;
		color: var(--lightGray);
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1.4fr 0.9fr 1.4fr;
		gap: var(--halfNote);
		align-items: start;

		@media (max-width: 900px) {
			grid-template-columns: 1fr 1fr;

			.majors {
				grid-column: 1 / -1;
			}
		}

		@media (max-width: 600px) {
			grid-template-columns: 1fr;
		}
	}

	.footer-section {
		h3 {
			color: var(--offWhite);
			font-size: 1rem;
			margin: 0 0 0.75rem;
			font-weight: 500;
		}

		p {
			line-height: 1.5;
			margin: 0 0 0.75rem;
		}

		ul {
			list-style: none;
			padding: 0;
			margin: 0;

			li {
				margin-bottom: 0.5rem;

				a {
					color: var(--lightGray);
					text-decoration: none;
					transition: color 0.2s ease;

					&:hover {
						color: var(--yellow);
					}
				}
			}
		}
	}

	.place-line {
		font-family: var(--codeFont);
		font-size: 0.75rem;
		color: var(--yellow);
		margin: 0 0 1rem;
	}

	.social-links {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;

		.social-link {
			color: var(--lightGray);
			text-decoration: none;
			transition: color 0.2s ease;

			&:hover {
				color: var(--yellow);
			}
		}
	}

	.majors :global(.majors) {
		margin: 0;
		max-width: none;
	}

	.majors :global(.majors-header) {
		margin-bottom: 0.5rem;
		padding-bottom: 0.5rem;
	}

	.majors :global(.majors-list) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.45rem 0.85rem;
	}
</style>
