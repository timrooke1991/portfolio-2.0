<header>
	<a href="/">Tim Rooke</a>

	<nav>
		<a href="/about"><span>About</span></a>
		<a href="/blog"><span>Blog</span></a>
		<a href="/projects"><span>Projects</span></a>
	</nav>
</header>

<slot></slot>


<style>
    header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.25rem;
		background: var(--yellow);
	}

	nav {
		display: flex;
		gap: 1.5em;
	}

	nav a {
		display: inline-flex;
		text-decoration: none;
		margin: 0;
		position: relative;
		color: var(--white-ink);
		width: max-content;
		transition: color 0.15s;
	}

	nav a span::after {
		position: absolute;
		bottom: 0;
		left: 0;
		content: '';
		transform: scaleX(0);
		display: block;
		width: 100%;
		height: 0.1em;
		background: yellow;
		transition: transform 0.1s cubic-bezier(0.5, 0, 0.5, 1);
	}

	nav a:hover span::after {
		transform: scaleX(1);
		transform-origin: left;
	}
</style>
