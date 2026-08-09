<script>
	import { defaultElevation, elevationToBars } from '$lib/data/running.js';

	let { profile = defaultElevation, barCount = 140 } = $props();

	const bars = elevationToBars(profile.samples, barCount);

	let containerRef = $state();
	let isVisible = $state(false);
	let hovered = $state(null);

	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (containerRef) {
			observer.observe(containerRef);
			return () => observer.disconnect();
		}
	});

	function onBarEnter(index, elevation) {
		hovered = { index, elevation };
	}

	function onBarLeave() {
		hovered = null;
	}
</script>

<div class="separator-container" bind:this={containerRef}>
	<div class="meta" class:visible={isVisible}>
		{#if profile.href}
			<a href={profile.href} target="_blank" rel="noopener noreferrer" class="label">
				<span class="name">{profile.label}</span>
				<span class="detail">{profile.detail}</span>
			</a>
		{:else}
			<div class="label">
				<span class="name">{profile.label}</span>
				<span class="detail">{profile.detail}</span>
			</div>
		{/if}
		{#if hovered}
			<span class="hover-readout" aria-live="polite">
				~{hovered.elevation}{profile.unit}
			</span>
		{/if}
	</div>

	<div
		class="chart"
		class:visible={isVisible}
		role="img"
		aria-label="Elevation profile for {profile.label}"
	>
		{#each bars as bar, i}
			<span
				class="bar"
				class:active={hovered?.index === i}
				style:height="{bar.height}%"
				role="presentation"
				onmouseenter={() => onBarEnter(i, bar.elevation)}
				onmouseleave={onBarLeave}
			></span>
		{/each}
	</div>
</div>

<style lang="scss">
	.separator-container {
		width: 100vw;
		height: auto;
		overflow: visible;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		margin-top: var(--wholeNote);
		padding: 0 var(--margin);
	}

	.meta {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		max-width: 2000px;
		margin: 0 auto 0.35rem;
		opacity: 0;
		transform: translateY(6px);
		transition:
			opacity 0.6s ease,
			transform 0.6s ease;

		&.visible {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.label {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem 0.85rem;
		text-decoration: none;
		color: inherit;

		&:hover .name {
			color: var(--yellow);
		}
	}

	.name {
		font-family: var(--codeFont);
		font-size: 0.75rem;
		color: var(--offWhite);
		transition: color 0.2s ease;
	}

	.detail {
		font-family: var(--codeFont);
		font-size: 0.7rem;
		color: var(--lightGray);
	}

	.hover-readout {
		font-family: var(--codeFont);
		font-size: 0.75rem;
		color: var(--yellow);
		white-space: nowrap;
	}

	.chart {
		width: 100%;
		height: 88px;
		display: flex;
		align-items: flex-end;
		gap: 1px;
		max-width: 2000px;
		margin: 0 auto;
		padding-bottom: 2px;
		border-bottom: 1px solid rgba(229, 229, 229, 0.25);
		opacity: 0.55;
		transition: opacity 0.8s ease;

		&.visible {
			opacity: 1;
		}
	}

	.bar {
		flex: 1 1 0;
		min-width: 0;
		display: block;
		background: var(--lightGray);
		opacity: 0.55;
		cursor: crosshair;
		transition:
			opacity 0.2s ease,
			background-color 0.2s ease;

		&:hover,
		&.active {
			opacity: 1;
			background: var(--yellow);
		}
	}
</style>
