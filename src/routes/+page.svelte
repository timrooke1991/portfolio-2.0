<main>
	<div class="graph-container">
		<svg class="elevation-graph" viewBox="0 0 1000 100" preserveAspectRatio="none">
			<!-- Elevation Path -->
			<path
				id="elevationPath"
				d="M0,100 L15.3,78.04 L40.8,75.26 L56.1,69.99 L81.6,77.30 L96.9,75.70 L122.4,76.60 L137.7,70.45 L163.2,75.82 L178.5,79.88 L204.0,77.77 L219.3,64.95 L244.8,47.45 L260.2,40.26 L285.7,45.74 L301.0,52.82 L326.5,53.81 L341.8,42.23 L367.3,51.52 L382.6,55.65 L408.1,51.50 L423.4,54.27 L448.9,42.87 L464.2,43.17 L489.7,49.20 L505.1,10.49 L530.6,52.61 L545.9,59.91 L571.4,40.36 L586.7,42.81 L612.2,46.29 L627.5,40.83 L653.0,56.65 L668.3,45.70 L693.8,43.31 L709.1,58.72 L734.6,40.61 L750.0,51.80 L775.5,71.38 L790.8,78.55 L816.3,71.44 L831.6,72.85 L857.1,78.08 L872.4,76.79 L897.9,76.06 L913.2,76.14 L938.7,66.27 L954.0,72.24 L979.5,72.18 L994.8,74.82 L1000,100"
				fill="none"
				stroke="#cccccc"
				stroke-width="1"
			/>

			<!-- Tracing Beam Effect -->
			<path
				id="tracingBeam"
				d="M0,100 L20.0,72.37 L40.0,25.06 L60.0,39.01 L80.0,72.37 L100.0,25.13 L120.0,76.02 L140.0,43.44 L160.0,57.21 L180.0,62.28 L200.0,27.55 L220.0,40.94 L240.0,30.09 L260.0,47.59 L280.0,26.13 L300.0,66.40 L320.0,32.01 L340.0,40.58 L360.0,71.64 L380.0,37.32 L400.0,50.06 L420.0,63.77 L440.0,43.72 L460.0,74.74 L480.0,61.02 L500.0,54.68 L520.0,54.61 L540.0,26.49 L560.0,77.93 L580.0,43.11 L600.0,68.49 L620.0,48.27 L640.0,55.09 L660.0,29.96 L680.0,62.72 L700.0,45.79 L720.0,46.60 L740.0,56.85 L760.0,55.86 L780.0,67.46 L800.0,25.91 L820.0,36.88 L840.0,49.63 L860.0,74.58 L880.0,59.26 L900.0,62.34 L920.0,64.76 L940.0,36.14 L960.0,74.49 L980.0,72.10 L1000.0,62.82 L1000,100"
				fill="none"
				stroke="red"
				stroke-width="1"
				stroke-dasharray="1500"
				stroke-dashoffset="1500"
			/>
		</svg>
	</div>
	<span class="angle-bracket-one">[</span>
	<div class="angle-bracket-content">Welcome</div>
	<span>]</span>
	<h1>Hello, you've found my portfolio!</h1>
	<h2>I am based in Bournemouth, and work for Legl as a Software Engineer</h2>
	<p>
		My experience is in product engineering at small or scaleup companies. I've held roles in
		Product Management and Software Engineering. I am curious and love to learn new things.
		Currently, I learning <span>Svelte</span>.
	</p>

	<ul>
		<li>
			<a href="/about">Read more about my approach to learning</a>
		</li>
		<li>
			<a href="/blog">Other ramblings</a>
		</li>
		<li>
			<a href="/projects">Stuff that I have built</a>
		</li>
		<li>
			<a href="/uses">Where to find me</a>
		</li>
	</ul>
</main>

<style>
	.graph-container {
		width: 100%;
		overflow: hidden;
	}

	.elevation-graph {
		width: 100%;
		height: auto;
	}

	#tracingBeam {
		animation: trace 2s linear forwards;
	}

	@keyframes trace {
		to {
			stroke-dashoffset: 0;
		}
	}

	:global(body) {
		background: #020711;
		color: white;
		font-family: 'Averta-Std';
		margin: 0;
	}

	/* Header component */

	/* Page body  */

	.angle-bracket-one {
		font-family: var(--headingFont);
		font-weight: 400;
		font-size: 1.25em;
		color: var(--lightGray);
		margin: 0 0.1em 0 0;
		z-index: 2;
		position: relative;
		left: -1px;
	}

	.angle-bracket-content {
		position: relative;
		z-index: 1;
		background: linear-gradient(90deg, #a7a8aa, #92abb2, #5eca78, #b6ec1f, #ffd100);
		background-clip: text;
		font-family: var(--headingFont);
		text-transform: lowercase;
		flex: 0 1 auto;
		white-space: nowrap;
		line-height: 1.2;
	}
</style>
