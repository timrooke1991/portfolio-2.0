<script>
	import LinkList from '$lib/components/LinkList.svelte';
	import { navLinks } from '$lib/data/links.js';
	import StravaSeparator from '$lib/components/StravaSeparator.svelte';
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

<StravaSeparator />

<footer>
	<div class="footer-section">
		<h3>About</h3>
		<p>Software engineer focused on building great products with JavaScript (TypeScript, React, Vue and Svelte) and Python. Previous experience with Node, Ruby, and PHP. Exploring the AI world with tools like Cursor and Claude.</p>
		<div class="social-links">
			<a href="https://github.com/timrooke1991" class="social-link">
				<span class="emoji">📦</span>GitHub
			</a>
			<a href="https://twitter.com/timrooke1991" class="social-link">
				<span class="emoji">🐦</span>Twitter
			</a>
		</div>
	</div>
	<div class="footer-section">
		<h3>Latest Posts</h3>
		<ul>
			<li><a href="/blog/svelte-first-impressions">Reflections on Svelte</a></li>
			<li><a href="/blog/neetcode-150">Neetcode 150</a></li>
		</ul>
	</div>
	<div class="footer-section">
		<h3>Marathon Majors</h3>
		<ul class="marathon-list">
			<li class="completed">
				<a href="https://www.strava.com/activities/2748903017" class="marathon-link">
					<span class="emoji">🏛️</span>
					<span>Berlin</span>
				</a>
			</li>
			<li class="completed">
				<a href="https://www.strava.com/activities/8943674317" class="marathon-link">
					<span class="emoji">🇬🇧</span>
					<span>London</span>
				</a>
			</li>
			<li>
				<a class="marathon-link">
					<span class="emoji">🎌</span>
					<span>Tokyo</span>
				</a>
			</li>
			<li>
				<a class="marathon-link">
					<span class="emoji">🍀</span>
					<span>Boston</span>
				</a>
			</li>
			<li>
				<a class="marathon-link">
					<span class="emoji">⭐</span>
					<span>Chicago</span>
				</a>
			</li>
			<li>
				<a class="marathon-link">
					<span class="emoji">🗽</span>
					<span>New York</span>
				</a>
			</li>
		</ul>
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

	// Footer layout
	footer {
		margin-top: var(--wholeNote);
		padding: var(--halfNote) 0;
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: var(--halfNote);
		font-size: 0.9rem;
		color: var(--lightGray);

		.footer-section {
			h3 {
				color: var(--offWhite);
				font-size: 1rem;
				margin-bottom: 0.75rem;
				font-weight: 500;
			}

			p {
				line-height: 1.5;
				margin-bottom: 1rem;
			}

			ul {
				list-style: none;
				padding: 0;

				li {
					margin-bottom: 0.5rem;

					a {
						color: var(--lightGray);
						text-decoration: none;
						transition: all 0.2s ease;

						&:hover {
							color: var(--yellow);
						}
					}
				}
			}

			.marathon-list {
				list-style: none;
				padding: 0;

				li {
					margin-bottom: 0.5rem;
					opacity: 0.5;
					transition: all 0.2s ease;

					&.completed {
						opacity: 1;
					}

					.marathon-link {
						display: flex;
						align-items: center;
						gap: 0.75rem;
						color: var(--lightGray);
						text-decoration: none;
						transition: all 0.2s ease;
						cursor: pointer;

						&:hover {
							transform: translateX(4px);
							color: var(--yellow);
						}

						.emoji {
							font-size: 1.1rem;
						}
					}
				}
			}
		}

		.social-links {
			display: flex;
			gap: 1rem;

			.social-link {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				color: var(--lightGray);
				text-decoration: none;
				transition: all 0.2s ease;

				&:hover {
					color: var(--yellow);
					transform: translateY(-1px);
				}

				.emoji {
					font-size: 1.1rem;
				}
			}
		}

		@media (max-width: 1024px) {
			grid-template-columns: 1fr 1fr;

			.footer-section:first-child {
				grid-column: 1 / -1;
			}
		}

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: var(--quarterNote);
			margin-top: var(--quarterNote);
			padding: var(--quarterNote) 0;

			.footer-section {
				padding-bottom: var(--quarterNote);
			}
		}
	}
</style>

