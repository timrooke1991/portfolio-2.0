<script>
	import { bioForYear } from '$lib/data/yearBios.js';

	let { year } = $props();

	const bio = $derived(bioForYear(year));
</script>

{#if bio}
	<div class="year-bio">
		<p class="list-eyebrow">At the time</p>

		<p class="chapter">{bio.chapter}</p>

		<div class="place">
			{#if bio.orgHref}
				<a class="org" href={bio.orgHref} target="_blank" rel="noopener noreferrer"
					>{bio.org}</a
				>
			{:else}
				<span class="org">{bio.org}</span>
			{/if}
			<span class="sep">·</span>
			<span class="role">{bio.role}</span>
		</div>

		<p class="summary">{bio.summary}</p>

		{#if bio.highlights?.length}
			<ul class="highlights">
				{#each bio.highlights as item}
					<li>{item}</li>
				{/each}
			</ul>
		{/if}

		{#if bio.stack?.length}
			<ul class="stack" aria-label="Stack">
				{#each bio.stack as item}
					<li>{item}</li>
				{/each}
			</ul>
		{/if}

		{#if bio.projects?.length}
			<ul class="projects">
				{#each bio.projects as project}
					<li>
						{#if project.href}
							<a href={project.href} target="_blank" rel="noopener noreferrer">
								<span class="pname">{project.name}</span>
								{#if project.meta}
									<span class="pmeta">{project.meta}</span>
								{/if}
							</a>
						{:else}
							<span class="pname">{project.name}</span>
							{#if project.meta}
								<span class="pmeta">{project.meta}</span>
							{/if}
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
{/if}

<style lang="scss">
	.year-bio {
		min-width: 0;
	}

	.list-eyebrow {
		margin: 0 0 0.65rem;
		font-family: var(--headingFont);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--lightGray);
	}

	.chapter {
		margin: 0 0 0.35rem;
		font-family: var(--codeFont);
		font-size: 0.75rem;
		color: var(--green);
		text-transform: lowercase;
	}

	.place {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.35rem;
		margin-bottom: 0.45rem;
	}

	.org {
		font-family: var(--headingFont);
		font-size: 1rem;
		color: var(--offWhite);
		text-decoration: none;
		transition: color 0.2s ease;

		&:hover {
			color: var(--green);
		}
	}

	span.org {
		cursor: default;
	}

	.sep {
		color: var(--lightGray);
	}

	.role {
		font-family: var(--codeFont);
		font-size: 0.75rem;
		color: var(--lightGray);
	}

	.summary {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.5;
		color: var(--midGray);
	}

	.highlights {
		list-style: none;
		margin: 0.65rem 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;

		li {
			position: relative;
			padding-left: 0.85rem;
			font-family: var(--codeFont);
			font-size: 0.75rem;
			line-height: 1.45;
			color: var(--offWhite);

			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 0.45em;
				width: 0.35rem;
				height: 0.35rem;
				border-radius: 1px;
				background: var(--green);
			}
		}
	}

	.stack {
		list-style: none;
		margin: 0.65rem 0 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;

		li {
			font-family: var(--codeFont);
			font-size: 0.65rem;
			color: var(--grey);
			background: var(--green);
			padding: 0.15em 0.4em;
			border-radius: 0.1em;
		}
	}

	.projects {
		list-style: none;
		margin: 0.75rem 0 0;
		padding: 0;
		border-top: 1px solid rgba(225, 225, 225, 0.12);

		li {
			border-bottom: 1px solid rgba(225, 225, 225, 0.12);
		}

		a {
			display: flex;
			flex-direction: column;
			gap: 0.15rem;
			padding: 0.55rem 0;
			text-decoration: none;
			color: inherit;
			transition: transform 0.2s ease;

			&:hover {
				transform: translateX(3px);

				.pname {
					color: var(--green);
				}
			}
		}
	}

	.pname {
		font-family: var(--headingFont);
		font-size: 0.9rem;
		color: var(--offWhite);
		transition: color 0.2s ease;
	}

	.pmeta {
		font-family: var(--codeFont);
		font-size: 0.7rem;
		color: var(--lightGray);
	}
</style>
