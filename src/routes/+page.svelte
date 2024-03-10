<script>
	import LinkList from "$lib/components/LinkList.svelte";
	let links = [
		{
			href: '/post',
			name: 'Learning',
			label: 'Read more about my approach to learning'
		},
		{
			href: '/blog',
			name: 'Blog',
			label: 'Mad ramblings'
		},
		{
			href: '/projects',
			name: 'Projects',
			label: 'Stuff that I have built'
		},
		{
			href: '/contact',
			name: 'Contact',
			label: 'Where to find me'
		}
	];
</script>
<section>
	<h1><span class="highlight">Hey!</span> <span class="underline">You've found my portfolio</span>!<br> I'm a software engineer, marathon runner and aspiring chef.</h1>
	<p class="subheading">I am based in Bournemouth, and work for Legl as a Software Engineer</p>
	
	<p>
		My experience is in product engineering at small or scaleup companies. I've held roles in
		Product Management and Software Engineering. I am curious and love to learn new things.
		Currently, I am learning <span>Svelte</span>.
	</p>

	<LinkList {links} />
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

	.underline {
		position: relative;
	}

	.underline::after {
		position: absolute;
		bottom: 0;
		left: 0;
		content: '';
		transform: scaleX(0); /* Initial state */
		transform-origin: left;
		display: block;
		width: 100%;
		height: 0.05em;
		background: var(--yellow);
		animation: scaleUp 1.3s cubic-bezier(0.5, 0, 0.5, 1) 2s forwards; /* Use animation instead of transition */
	}

	@keyframes scaleUp {
		to {
			transform: scaleX(1);
		}
	}	

	.subheading {
		font-size: clamp(1.2rem, .6rem + 2vw, 1.8rem);
		margin-top: var(--quarterNote);
		font-family: var(--headingFont);
		margin-bottom: var(--quarterNote);
		color: var(--ink);
		line-height: 1.4;
		max-width: 23em;	
	}

	p {
		margin: 0 var(--halfNote) var(--quarterNote) 0;
		max-width: 38em;
		color: var(--ink);

	}
</style>
