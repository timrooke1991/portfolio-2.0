<script>
	import { projectYears } from '$lib/data/projects.js';
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

	{#each projectYears as group}
		<h2 class="section-title">{group.year}</h2>
		<div class="projects-container">
			{#each group.projects as project}
				<article>
					<div class="project">
						<a href={project.href} target="_blank" rel="noopener noreferrer">
							<h3>{project.name}</h3>
							<figure class="project-shot">
								<img
									src={project.image}
									alt={project.imageAlt}
									width="1600"
									height="1200"
									loading="lazy"
									decoding="async"
								/>
							</figure>
							<p class="preview">{project.preview}</p>
							<aside class="categories">
								<ul class="no-bullets">
									{#each project.tags as tag}
										<li>{tag}</li>
									{/each}
								</ul>
							</aside>
							<p class="meta">
								<span class="stats">{project.stats}</span>
								<span class="link-text">{project.cta}</span>
							</p>
						</a>
						{#if project.blogHref}
							<a href={project.blogHref} class="blog-link">{project.blogLabel}</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	{/each}
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
		position: relative;
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

	.project-shot {
		margin: 0.85rem 0 1rem;
		padding: 0;
		border: 1px solid color-mix(in srgb, var(--purple) 42%, transparent);
		background: color-mix(in srgb, var(--grey) 88%, var(--purple));
		overflow: hidden;
		line-height: 0;
		aspect-ratio: 4 / 3;

		img {
			width: 100%;
			height: 100%;
			aspect-ratio: 4 / 3;
			object-fit: cover;
			object-position: top center;
			display: block;
			/* Light desat so shots sit in the topo site — colour returns on hover */
			filter: grayscale(0.12) contrast(1.05) brightness(0.98);
			transition:
				filter 0.35s ease,
				transform 0.45s ease;
		}
	}

	.project:hover .project-shot {
		border-color: color-mix(in srgb, var(--purple) 72%, transparent);

		img {
			filter: grayscale(0) contrast(1.06) brightness(1);
			transform: scale(1.012);
		}
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
