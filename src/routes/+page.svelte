<script>
	import TwinPractices from '$lib/components/TwinPractices.svelte';

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
		<h2 class="roles">AI Product Engineer and Marathon Runner</h2>
	</div>

	<p class="bio">
		I specialise in product engineering at small and scaleup companies, bringing both
		<span class="highlight">engineering</span> and
		<span class="highlight">product management</span> expertise. Always curious and learning -
		currently exploring the world of
		<span class="tech-highlight">Svelte</span>.
	</p>
</section>

<TwinPractices github={data.github} strava={data.strava} />

<footer class="home-close">
	<nav class="links" aria-label="Elsewhere">
		<a href="https://github.com/timrooke1991" target="_blank" rel="noopener noreferrer">GitHub</a>
		<a href="/blog">Blog</a>
		<a href="https://www.strava.com/athletes/12160480" target="_blank" rel="noopener noreferrer"
			>Strava</a
		>
		<a href="/about">About</a>
	</nav>
	<p class="credit">Tim Rooke · 2026</p>
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
		0% {
			transform: rotate(0deg);
		}
		10% {
			transform: rotate(14deg);
		}
		20% {
			transform: rotate(-8deg);
		}
		30% {
			transform: rotate(14deg);
		}
		40% {
			transform: rotate(-4deg);
		}
		50% {
			transform: rotate(10deg);
		}
		60% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(0deg);
		}
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
		margin: var(--halfNote) 0 0;
		max-width: 42rem;
	}

	.tech-highlight {
		background: linear-gradient(transparent 50%, rgba(255, 200, 0, 0.2) 50%);
		padding: 0 0.3em;
		border-radius: 4px;
	}

	.title-container {
		margin-bottom: var(--halfNote);
	}

	.home-close {
		margin-top: var(--wholeNote);
		padding: var(--halfNote) 0 var(--wholeNote);
		border-top: 1px solid rgba(225, 225, 225, 0.15);
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem 1.1rem;

		a {
			font-family: var(--codeFont);
			font-size: 0.75rem;
			color: var(--lightGray);
			text-decoration: none;
			transition: color 0.2s ease;

			&:hover {
				color: var(--offWhite);
			}
		}
	}

	.credit {
		margin: 0;
		font-family: var(--codeFont);
		font-size: 0.7rem;
		color: var(--lightGray);
		opacity: 0.75;
	}
</style>
