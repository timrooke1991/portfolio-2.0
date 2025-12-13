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
	<h2 class="section-title">2025</h2>
	<div class="projects-container">
		<article>
			<div class="project">
				<a href="https://politicoretro.netlify.app/" target="_blank" rel="noopener noreferrer">
					<h3>Political Manifesto Retrospective</h3>
					<p class="preview">
						A comprehensive analysis of political manifestos and party platforms, evaluated through a modern lens 
						using LLMs to see how well they've aged. Features over a century of British political manifestos 
						from Conservative and Labour parties, plus US party platforms spanning from the mid-19th century to present day.
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
	</div>
</section>

<style lang="scss">
	p.intro {
		margin-bottom: var(--halfNote);
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
