<script>
	// Generate random heights for the bars to create a pace/elevation chart look
	const barCount = 200;
	const bars = Array.from({ length: barCount }, () => ({
		height: Math.random() * 100,
		width: 4
	}));

	let containerRef = $state();
	let isVisible = $state(false);

	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
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
</script>

<div class="separator-container" bind:this={containerRef}>
	<div class="chart" class:visible={isVisible}>
		{#each bars as bar}
			<div 
				class="bar" 
				style:height="{bar.height}%"
				style:width="{bar.width}vw"
			/>
		{/each}
	</div>
</div>

<style lang="scss">
	.separator-container {
		width: 100vw;
		height: 80px;
		overflow: visible;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		margin-top: var(--wholeNote);
	}

	.chart {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: flex-end;
		gap: 1px;
		max-width: 2000px;
		margin: 0 auto;
		padding-bottom: 2px;
		border-bottom: 1px solid rgba(229, 229, 229, 0.25);
		opacity: 0;
		transition: opacity 0.3s ease;

		&.visible {
			opacity: 1;

			.bar {
				animation: waveIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
				animation-fill-mode: forwards;
			}

			@for $i from 1 through 200 {
				.bar:nth-child(#{$i}) {
					animation-delay: #{$i * 0.004}s;
				}
			}
		}
	}

	.bar {
		background: var(--lightGray);
		opacity: 0.6;
		min-height: 3px;
		border-radius: 1px 1px 0 0;
		transform: scaleY(0);
		transform-origin: bottom;
		will-change: transform;

		&:hover {
			opacity: 1;
			transition: opacity 0.3s ease;
			background: var(--yellow);
		}
	}

	@keyframes waveIn {
		0% {
			transform: scaleY(0);
		}
		50% {
			transform: scaleY(1.2);
		}
		100% {
			transform: scaleY(1);
		}
	}
</style> 