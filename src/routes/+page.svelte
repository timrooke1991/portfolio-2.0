<header>
	<a href="/">Tim Rooke</a>

	<nav>
		<a href="/about">About</a>
		<a href="/blog">Blog</a>
		<a href="/projects">Projects</a>
		<a href="/uses">Uses</a>
		<a href="/contact">Contact</a>
	</nav>
</header>
<main>
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
	/* Header component */
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
		font-weight: 400;
		text-decoration: none;
		margin: 0;
		position: relative;
		color: var(--white-ink);
		width: max-content;
	}

	/* Page body  */
</style>
