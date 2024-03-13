<script>
	import LinkList from '$lib/components/LinkList.svelte';
	import { navLinks } from '$lib/data/links.js';
</script>

<svelte:head>
	<title>Tim Rooke | My portfolio</title>
	<meta property="og:title" content="Home" />
	<meta name="description" content="Tim Rooke - Portfolio" />
</svelte:head>
<section>
	<h1>
		<span class="highlight">Hey! </span>&nbsp;You've found my portfolio!<br /> I'm a software engineer,
		marathon runner and aspiring chef.
	</h1>
	<p class="subheading">I am based in Bournemouth, and work for Legl as a Software Engineer</p>

	<p>
		My experience is in product engineering at small or scaleup companies. I've held roles in
		Product Management and Software Engineering. I am curious and love to learn new things.
		Currently, I am learning <span>Svelte</span>.
	</p>

	<LinkList links={navLinks} />
</section>

<style lang="scss">
	h1 {
		font-size: clamp(1.8rem, 1rem + 3vw, 3.5rem);
		margin-bottom: var(--halfNote);
		font-weight: 400;
		max-width: 17em;
		color: var(--ink);
	}

	.highlight {
		color: var(--yellow);
	}

	@keyframes scaleUp {
		to {
			transform: scaleX(1);
		}
	}

	.subheading {
		font-size: clamp(1.2rem, 0.6rem + 2vw, 1.8rem);
		margin-top: var(--quarterNote);
		font-family: var(--headingFont);
		margin-bottom: var(--quarterNote);
		color: var(--ink);
		line-height: 1.4;
		max-width: 23em;
	}

	p {
		margin: 0 var(--halfNote) var(--halfNote) 0;
		max-width: 38em;
		color: var(--ink);
	}
</style>
