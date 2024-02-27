<script>
    import '$lib/assets/scss/global.scss';
</script>

<header>
	<a href="/">
		/* Tim Rooke */
	</a>
	<nav>
		<a href="/about"><span>About</span></a>
		<a href="/blog"><span>Blog</span></a>
		<a href="/projects"><span>Projects</span></a>
	</nav>
</header>

<main>
	<slot></slot>
</main>

<style>
	/* Nav */
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--quarterNote);
	}

	nav {
		display: flex;
		gap: 1.5em;
	}

	/* Nav Link Item */

	nav a {
		display: inline-flex;
		text-decoration: none;
		margin: 0;
		font-size: 1.25em;
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

	nav a:hover span::after {
		transform: scaleX(1);
	}
</style>
