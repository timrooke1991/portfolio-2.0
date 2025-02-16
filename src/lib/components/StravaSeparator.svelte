<script>
	// Generate random heights for the bars to create a pace/elevation chart look
	const barCount = 200; // Increased from 80 to 200 bars
	const bars = Array.from({ length: barCount }, () => ({
		height: Math.random() * 100,
		width: 4 // Math.random() * 1 + 0.5 // Slightly thinner bars (0.5-1.5px)
	}));
</script>

<div class="separator-container">
	<div class="chart">
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
		gap: 1px; // Reduced gap between bars
		max-width: 2000px; // Prevent bars from getting too spread out on ultra-wide screens
		margin: 0 auto;
	}

	.bar {
		background: var(--lightGray);
        opacity: 0.6;
		min-height: 3px;
		border-radius: 1px 1px 0 0;
		transition: height 0.3s ease;

		&:hover {
            opacity: 1;
			transition: opacity 0.3s ease;
			background: var(--yellow);
		}
	}
</style> 