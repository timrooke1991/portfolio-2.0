<header>
	<a href="/">
		<div class="logo">
			<span>/* --------- */</span>
			<span class="name">&nbsp;Tim Rooke&nbsp;</span>
			<span>/* --------- */</span>
		</div>
	</a>
	<nav>
		<a data-sveltekit-preload-code href="/about"><span>About</span></a>
		<a data-sveltekit-preload-code href="/blog"><span>Blog</span></a>
		<a data-sveltekit-preload-code href="/projects"><span>Projects</span></a>
		<a data-sveltekit-preload-code href="/contact"><span>Contact</span></a>
	</nav>
</header>

<style lang="scss">
	/* Nav */
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--quarterNote);

		@media (max-width: 600px) {
			flex-direction: column;
		}
	}

	.logo {
		color: var(--yellow);
		line-height: 1.4;
		font-family: 'Space Mono', monospace;
		width: 205px;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		align-self: self-start;
		font-size: 1em;

		@media (max-width: 600px) {
			font-size: 0.75em;
			display: flex;
			align-items: center;
			width: 100vw;
		}

		.name {
			color: var(--yellow);
			transition: color 0.45s ease;

			&::before {
				content: '/* ';
				color: var(--greyLight);
				transition: color 0.45s ease;
			}

			&::after {
				content: ' */';
				color: var(--greyLight);
				transition: color 0.45s ease;
			}
		}

		span {
			display: inline-flex;
			color: var(--greyLight);
			transition: color 0.45s ease;
		}

		&:hover {
			span {
				color: var(--yellow);
			}

			.name {
				color: var(--ink);

				&::before {
					color: var(--yellow);
				}

				&::after {
					color: var(--yellow);
				}
			}
		}
	}

	nav {
		display: flex;
		gap: 1.5em;

		@media (max-width: 600px) {
			margin-top: var(--quarterNote);
			flex-direction: row;
			font-size: 0.85em;
		}
	}

	/* Nav Link Item */

	nav a {
		display: inline-flex;
		text-decoration: none;
		margin: 0;
		font-size: 1em;
		position: relative;
		color: var(--white);
		width: max-content;
		transition: color 0.15s;
	}

	nav a span::after {
		position: absolute;
		bottom: 0;
		left: 0;
		content: '';
		transform: scaleX(0);
		transform-origin: left; /* Set the transform origin to 'left' */
		display: block;
		width: 100%;
		height: 0.1em;
		background: var(--yellow);
		transition: transform 0.1s cubic-bezier(0.5, 0, 0.5, 1);
	}

	nav a:hover {
		color: var(--greyLight);
	}

	nav a:hover span::after {
		transform: scaleX(1);
	}
</style>
