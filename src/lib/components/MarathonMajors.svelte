<script>
	import { majors, majorsDone, majorsTotal } from '$lib/data/running.js';

	let { compact = false } = $props();

	function formatDate(iso) {
		if (!iso) return null;
		return new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<section class="majors" class:compact aria-label="World Marathon Majors progress">
	<header class="majors-header">
		<p class="eyebrow">World Marathon Majors</p>
		<p class="progress">
			<span class="count">{majorsDone}</span>
			<span class="slash">/</span>
			<span class="total">{majorsTotal}</span>
		</p>
	</header>

	<ol class="majors-list">
		{#each majors as major}
			<li class="major" data-status={major.status}>
				{#if major.href}
					<a
						href={major.href}
						class="major-link"
						target="_blank"
						rel="noopener noreferrer"
						title="{major.name}{major.time ? ` · ${major.time}` : ''}"
					>
						<span class="mark" aria-hidden="true"></span>
						<span class="text">
							<span class="name">{major.name}</span>
							{#if major.time}
								<span class="detail">
									{major.time}
									{#if major.pace}<span class="sep">·</span>{major.pace}{/if}
								</span>
								<span class="detail subtle">{formatDate(major.date)}</span>
							{:else if major.year}
								<span class="detail">{major.year}</span>
							{/if}
						</span>
					</a>
				{:else}
					<span class="major-link static" title={major.name}>
						<span class="mark" aria-hidden="true"></span>
						<span class="text">
							<span class="name">{major.name}</span>
							<span class="detail status">
								{#if major.year}{major.year}{:else}{major.status}{/if}
							</span>
						</span>
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</section>

<style lang="scss">
	.majors {
		margin: var(--wholeNote) 0 var(--halfNote);
		max-width: 42rem;
	}

	.majors.compact {
		margin: var(--halfNote) 0 0;
	}

	.majors-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: var(--quarterNote);
		border-bottom: 1px solid rgba(225, 225, 225, 0.18);
		padding-bottom: 0.65rem;
	}

	.eyebrow {
		margin: 0;
		font-family: var(--headingFont);
		font-size: 0.85rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--lightGray);
	}

	.progress {
		margin: 0;
		font-family: var(--codeFont);
		font-size: 0.95rem;
		color: var(--yellow);
		line-height: 1;

		.slash,
		.total {
			color: var(--lightGray);
		}

		.count {
			color: var(--yellow);
		}
	}

	.majors-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.75rem 1.25rem;

		@media (max-width: 600px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.major-link {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: start;
		gap: 0.55rem;
		padding: 0.35rem 0;
		color: var(--lightGray);
		text-decoration: none;
		transition:
			color 0.2s ease,
			transform 0.2s ease;

		&.static {
			cursor: default;
		}

		&:not(.static):hover {
			color: var(--yellow);
			transform: translateX(3px);

			.detail {
				color: var(--yellow);
			}
		}
	}

	.mark {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 50%;
		border: 1.5px solid currentColor;
		background: transparent;
		flex-shrink: 0;
		margin-top: 0.4rem;
	}

	.major[data-status='done'] {
		.major-link {
			color: var(--offWhite);
		}

		.mark {
			background: var(--yellow);
			border-color: var(--yellow);
		}
	}

	.major[data-status='next'] {
		.mark {
			border-color: var(--yellow);
			background: transparent;
		}

		.detail.status {
			color: var(--yellow);
		}
	}

	.major[data-status='dream'] {
		opacity: 0.55;

		.mark {
			opacity: 0.7;
		}
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		min-width: 0;
	}

	.name {
		font-family: var(--headingFont);
		font-size: 0.95rem;
		font-weight: 500;
		line-height: 1.3;
	}

	.detail {
		font-family: var(--codeFont);
		font-size: 0.7rem;
		color: var(--lightGray);
		line-height: 1.35;

		&.subtle {
			opacity: 0.8;
		}

		&.status {
			text-transform: lowercase;
		}
	}

	.sep {
		margin: 0 0.3em;
		opacity: 0.6;
	}
</style>
