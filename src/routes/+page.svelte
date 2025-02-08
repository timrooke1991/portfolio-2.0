<script>
	import LinkList from '$lib/components/LinkList.svelte';
	import { navLinks } from '$lib/data/links.js';
</script>

<svelte:head>
	<title>Tim Rooke | Software Engineer & Marathon Runner</title>
	<meta property="og:title" content="Home" />
	<meta name="description" content="Tim Rooke - Software Engineer, Marathon Runner, and Aspiring Chef based in Bournemouth" />
</svelte:head>

<section class="intro">
	<div class="title-container">
		<h1>
			<span class="wave">👋</span>
			<span class="highlight">Hi, I'm Tim</span>
		</h1>
		<h2 class="roles">
			Software Engineer, Marathon Runner 
			<span class="accent">& Aspiring Chef</span>
		</h2>
	</div>

	<p class="subheading">
		Building products at <a href="https://legl.com" class="company-link">Legl</a> in Bournemouth
	</p>

	<p class="bio">
		I specialise in product engineering at small and scaleup companies, bringing both 
		<span class="highlight">engineering</span> and <span class="highlight">product management</span> expertise. 
		Always curious and learning - currently exploring the world of 
		<span class="tech-highlight">Svelte</span>.
	</p>

	<LinkList links={navLinks} />
</section>

<footer>
	<div class="footer-section">
		<div class="marathon-grid">
			<div class="grid-header">// World Marathon Majors</div>
			<div class="marathon-row">
				<span class="emoji">🎌</span>
				<span class="city">Tokyo</span>
				<span class="status">[ ]</span>
			</div>
			<div class="marathon-row">
				<span class="emoji">🍀</span>
				<span class="city">Boston</span>
				<span class="status">[ ]</span>
			</div>
			<div class="marathon-row completed">
				<span class="emoji">🇬🇧</span>
				<span class="city">London</span>
				<span class="status">[✓]</span>
			</div>
			<div class="marathon-row completed">
				<span class="emoji">🏛️</span>
				<span class="city">Berlin</span>
				<span class="status">[✓]</span>
			</div>
			<div class="marathon-row">
				<span class="emoji">⭐</span>
				<span class="city">Chicago</span>
				<span class="status">[ ]</span>
			</div>
			<div class="marathon-row">
				<span class="emoji">🗽</span>
				<span class="city">New York</span>
				<span class="status">[ ]</span>
			</div>
		</div>
	</div>
	<div class="footer-section">
		<div class="tech-grid">
			<div class="grid-header">// Tech</div>
			<a href="/blog/category/javascript" class="tech-row">
				<span class="emoji">💻</span>
				<span class="tech">JavaScript</span>
				<span class="years">10 yrs</span>
			</a>
			<a href="/blog/category/react" class="tech-row">
				<span class="emoji">⚛️</span>
				<span class="tech">React</span>
				<span class="years">5 yrs</span>
			</a>
			<a href="/blog/category/typescript" class="tech-row">
				<span class="emoji">🎯</span>
				<span class="tech">TypeScript</span>
				<span class="years">5 yrs</span>
			</a>
			<a href="/blog/category/node" class="tech-row">
				<span class="emoji">🎯</span>
				<span class="tech">Node</span>
				<span class="years">5 yrs</span>
			</a>
			<a href="/blog/category/python" class="tech-row">
				<span class="emoji">🐍</span>
				<span class="tech">Python</span>
				<span class="years">3 yrs</span>
			</a>
			<a href="/blog/category/vue" class="tech-row">
				<span class="emoji">♥️</span>
				<span class="tech">Vue</span>
				<span class="years">3 yrs</span>
			</a>
		</div>
	</div>
	<div class="footer-section">
		<div class="blog-grid">
			<div class="grid-header">// Recent topics</div>
			<a href="/blog/category/ai" class="blog-row">
				<span class="emoji">🤖</span>
				<span class="title">AI & LLMs</span>
			</a>
			<a href="/blog/category/algorithms" class="blog-row">
				<span class="emoji">🧮</span>
				<span class="title">Algorithms</span>
			</a>
			<a href="/blog/category/svelte" class="blog-row">
				<span class="emoji">🎨</span>
				<span class="title">Svelte</span>
			</a>
			<a href="/blog/category/system-design" class="blog-row">
				<span class="emoji">🔍</span>
				<span class="title">Systems</span>
			</a>
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

	.accent {
		color: var(--yellow);
	}

	.subheading {
		font-size: clamp(1.1rem, 0.6rem + 2vw, 1.6rem);
		margin: var(--halfNote) 0;
		color: var(--ink);
		line-height: 1.4;
	}

	.company-link {
		color: var(--yellow);
		text-decoration: none;
		position: relative;
		
		&::after {
			content: '';
			position: absolute;
			bottom: -2px;
			left: 0;
			width: 100%;
			height: 2px;
			background: var(--yellow);
			transform: scaleX(0);
			transform-origin: right;
			transition: transform 0.3s ease;
		}

		&:hover::after {
			transform: scaleX(1);
			transform-origin: left;
		}
	}

	.bio {
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: var(--wholeNote);
	}

	.tech-highlight {
		background: linear-gradient(transparent 50%, rgba(255, 200, 0, 0.2) 50%);
		padding: 0 0.3em;
		border-radius: 4px;
	}

	.title-container {
		margin-bottom: var(--wholeNote);
	}

	@keyframes scaleUp {
		to {
			transform: scaleX(1);
		}
	}

	@keyframes fade_in_intro {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fade_in_intro_reduced {
		from {
			opacity: 0;
			transform: translateY(0);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	// Common grid styles
	.marathon-grid,
	.tech-grid,
	.blog-grid {
		font-family: var(--monoFont);
		font-size: 0.8rem;
		color: var(--lightGray);
	}

	.grid-header {
		margin-bottom: 0.5rem;
	}

	// Common row styles
	.marathon-row,
	.tech-row,
	.blog-row {
		display: grid;
		gap: 0.5rem;
		line-height: 1.6;

		.emoji {
			display: inline-block;
			width: 2rem;
		}
	}

	// Specific grid layouts
	.marathon-row {
		grid-template-columns: 2rem 5rem 3rem auto;
		
		&.completed {
			color: var(--offWhite);
		}
	}

	.tech-row {
		grid-template-columns: 2rem 5rem 3rem;
	}

	.blog-row {
		grid-template-columns: 2rem 8rem 4rem;
	}

	// Link styles
	.tech-row,
	.blog-row {
		text-decoration: none;
		transition: all 0.2s ease;
		color: var(--offWhite);
		opacity: 0.7;
		
		&:hover {
			transform: translateX(4px);
			opacity: 1;
		}

		.tech,
		.title,
		.years {
			color: inherit;
			display: inline-block;
		}
	}

	// Footer layout
	footer {
		margin-top: var(--wholeNote);
		padding-top: var(--wholeNote);
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--wholeNote);

		.footer-section:not(:first-child) {
			padding-left: var(--wholeNote);
		}
	}
</style>

