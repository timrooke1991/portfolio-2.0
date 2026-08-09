<script>
	import Callout from '$lib/components/Callout.svelte';
	import MarathonMajors from '$lib/components/MarathonMajors.svelte';
	import { socialsMap } from '$lib/data/links.js';

	const currentYear = new Date().getFullYear();

	let splits = [
		{ value: 'Product', subvalue: '4 years' },
		{ value: 'Engineering', subvalue: currentYear - 2017 + ' years' },
		{ value: 'Startups', subvalue: '10+ years' }
	];

	let jobs = [
		{ value: 'Bili', subvalue: "Aug '17 - Jul '18" },
		{ value: 'Axis Workshops', subvalue: "Jul '18 - Jul '22" },
		{ value: 'Legl', subvalue: "Aug '22 - Present" }
	];
</script>

<svelte:head>
	<title>Tim Rooke | About me</title>
	<meta
		data-key="description"
		name="description"
		content="Law graduate, product manager, software engineer — and marathon runner based in Bournemouth."
	/>
</svelte:head>

<section class="page-container-center">
	<h1 class="page-title title-accent">About me</h1>

	<p class="lede">
		I started in law and international relations, drifted into AdTech project management at Unruly,
		then product. The engineers around me had the more interesting problems — so I took a coding
		bootcamp, joined an EdTech startup, and never looked back.
	</p>

	<p>
		That path still shapes how I work: I care about what ships and why, not just how it's built.
		Today I'm a software engineer at
		<a href="https://legl.com" target="_blank" rel="noopener noreferrer">Legl</a>, a SaaS platform
		for law firms — integrating APIs, building Generative AI features, and redesigning interfaces in
		Vue. Based in Bournemouth, Dorset.
	</p>

	<Callout items={splits} />

	<h3 class="page-title title-accent">The through-line</h3>
	<p>
		Bili taught me professional engineering. Axis Workshops was the growth-stage SaaS crucible —
		JavaScript deep, company scaling fast. Legl is where product judgment and engineering meet again:
		AI features, third-party integrations, and UI that has to earn trust in a regulated industry.
		More on
		<a target="_blank" rel="noopener noreferrer" href={socialsMap['linkedin']}>LinkedIn</a>.
	</p>

	<Callout items={jobs} />

	<p>
		The law and politics degree never really left. A weekend project —
		<a href="https://politicoretro.netlify.app/" target="_blank" rel="noopener noreferrer"
			>Political Manifesto Retrospective</a
		>
		— uses LLMs to score a century of UK and US platforms with the benefit of hindsight. It started
		as a joke about Harold Wilson; it became a way of joining old academic instincts to how I think
		about evals and product leverage now. I wrote about it
		<a href="/blog/with-the-benefit-of-hindsight">here</a>.
	</p>

	<h3 class="page-title title-accent">Off the keyboard</h3>
	<p>
		Running is the other long project. Isle of Purbeck trails for training;
		<a target="_blank" rel="noopener noreferrer" href={socialsMap['strava']}>Strava</a> if you want
		the receipts. Berlin and London are done. Chicago is next — October 2026. New York is the one that won't leave the
		bucket list.
	</p>

	<MarathonMajors compact />

	<p>
		I marshal at Parkrun and mentor through Brightside and Meet A Mentor. I changed careers late
		enough to know how much a conversation at the right moment matters — so I try to be that person
		for people figuring out whether tech is for them.
	</p>

	<p class="aside">
		Also: enthusiastic cook, slowly scheming an outdoor kitchen in the garden. Fuel for the long
		runs, mostly.
	</p>
</section>

<style lang="scss">
	p {
		line-height: 1.55;
	}

	.lede {
		font-size: 1.15em;
		color: var(--offWhite);
	}

	.aside {
		margin-top: var(--halfNote);
		padding-top: var(--quarterNote);
		border-top: 1px solid rgba(225, 225, 225, 0.15);
		font-style: italic;
		color: var(--lightGray);
		font-size: 0.95em;
	}
</style>
