<script>
	/**
	 * Compact progress pulse for the twin columns.
	 * With `ratio`, draws a ring; without, just the copy block.
	 */
	let {
		value = '',
		muted = '',
		label = '',
		meta = '',
		ratio = null,
		accent = 'yellow',
		ariaLabel = ''
	} = $props();

	const pct = $derived(ratio == null ? null : Math.round(Math.min(1, Math.max(0, ratio)) * 100));
	const size = 64;
	const stroke = 5;
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;
	const dash = $derived(pct == null ? 0 : c * (pct / 100));
</script>

<div class="pulse accent-{accent}" aria-label={ariaLabel || value}>
	{#if pct != null}
		<svg width={size} height={size} viewBox="0 0 {size} {size}" aria-hidden="true">
			<circle class="track" cx={size / 2} cy={size / 2} r={r} stroke-width={stroke} fill="none" />
			<circle
				class="fill"
				cx={size / 2}
				cy={size / 2}
				r={r}
				stroke-width={stroke}
				fill="none"
				stroke-dasharray="{dash} {c}"
				stroke-linecap="round"
				transform="rotate(-90 {size / 2} {size / 2})"
			/>
			<text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" class="pct">
				{pct}%
			</text>
		</svg>
	{/if}
	<div class="copy">
		<p class="value">
			<span class="figure">{value}</span>
			{#if muted}
				<span class="muted">{muted}</span>
			{/if}
		</p>
		{#if label}
			<p class="label">{label}</p>
		{/if}
		{#if meta}
			<p class="meta">{meta}</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.pulse {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		min-width: 0;
	}

	.track {
		stroke: rgba(225, 225, 225, 0.15);
	}

	.fill {
		stroke: var(--pulse-accent);
		transition: stroke-dasharray 0.8s ease;
	}

	.pct {
		font-family: var(--codeFont);
		font-size: 0.65rem;
		fill: var(--offWhite);
	}

	.copy {
		min-width: 0;
	}

	.value {
		margin: 0;
		font-family: var(--headingFont);
		font-size: 1rem;
		color: var(--offWhite);
		line-height: 1.3;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.35em;
	}

	.figure {
		flex-shrink: 0;
	}

	.muted {
		color: var(--lightGray);
		font-weight: 400;
	}

	.label {
		margin: 0.15rem 0 0;
		font-family: var(--codeFont);
		font-size: 0.75rem;
		color: var(--pulse-accent);
		text-transform: lowercase;
	}

	.meta {
		margin: 0.2rem 0 0;
		font-family: var(--codeFont);
		font-size: 0.7rem;
		color: var(--lightGray);
	}

	.accent-yellow {
		--pulse-accent: var(--yellow);
	}

	.accent-green {
		--pulse-accent: var(--green);
	}
</style>
