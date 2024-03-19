<script>
	import Callout from '$lib/components/Callout.svelte';

	let callouts = [
		{
			value: 'Svelte',
			subvalue: 'Last month'
		},
		{
			value: 'Go',
			subvalue: 'This month'
		},
		{
			value: 'Generative AI',
			subvalue: 'Next month'
		}
	];
	let jobs = [
		{
			value: 'Bili',
			subvalue: "Aug '17 - Jul '18"
		},
		{
			value: 'Axis Workshops',
			subvalue: "Jul '18 - Jul '22"
		},
		{
			value: 'Legl',
			subvalue: "Aug '22 - Present"
		}
	];
	let volunteering = [
		{
			value: 'Parkrun',
			subvalue: "Marshall"
		},
		{
			value: 'Brightside',
			subvalue: "Mentor"
		},
		{
			value: 'Meet A Mentor',
			subvalue: "Mentor"
		}
	];
</script>

<svelte:head>
	<title>Tim Rooke | About me</title>
	<meta
		data-key="description"
		name="description"
		content="A bit about my personal life and work history."
	/>
</svelte:head>

<section class="page-container-center">
	<h1 class="page-title title-accent">About me</h1>
	<p>
		I'm a Software Engineer based in Bournemouth, Dorset, UK, with over a decade of experience in
		the tech industry, including roles in Software Engineering and Product Management. Currently, I
		work at Legl, a SaaS platform designed for law firms.
	</p>
	<h3 class="page-title title-accent">Interests</h3>
	<p>
		Inside of work, I really love to build products. As an engineer, I lean towards being practical
		and adaptable rather than strictly dogmatic to a set of principles. Having work primarily at
		startups, I, like many, have written plenty of abstractions that have never been used, built
		functionality based on false assumptions and optimised for a future that never matierialised.
	</p>
	<p>
		Outside of work, I'm passionate about sports, particularly running. I regularly participate in
		marathons and half-marathons, with the New York Marathon on my bucket list. Since moving to
		Dorset, I've enjoyed exploring the running trails around the Isle of Purbeck. Feel free to get in touch on Strava. I'm also an
		enthusiastic cook, with plans to build an elaborate outdoor kitchen in my garden.
	</p>
	<h3 class="page-title title-accent">My background</h3>
	<p>
		I hold a Law degree and a postgraduate degree in International Relations from a university in
		London. My career began with various jobs during my studies, one of which evolved into a
		full-time Project Management role at Unruly, an AdTech company. I thrived in this dynamic,
		tech-focused environment and eventually moved into a Product Management position, where I led
		the development and launch of several products.
	</p>
	<h3 class="page-title title-accent">Transition to Software Engineering</h3>
	<p>
		While working as a Product Manager, I found the technical aspects managed by our Software
		Engineering team particularly intriguing. This interest led me to pursue a career in Software
		Engineering, starting with a coding bootcamp. My first role post-bootcamp was with Bili, an
		EdTech startup, where I gained valuable experience in a professional engineering environment. I
		later joined Axis Workshops, a SaaS company, where I worked with JavaScript technologies and
		experienced significant company growth.
	</p>
	<Callout items={jobs} />
	<p>
		Currently, at Legl, I focus on integrating third-party APIs, developing features using
		Generative AI, and redesigning user interfaces with Vue. My work on AI-driven features at Legl
		has deepened my interest in Generative AI, presenting new challenges and perspectives on product
		development.
	</p>
	<h3 class="page-title title-accent">Volunteering and Mentoring</h3>
	<p>
		I'm committed to giving back to the community through volunteering, especially at local Parkrun
		events, and mentoring. Through Brightside and Meet A Mentor, I guide young individuals and
		aspiring developers, helping them navigate their career paths and overcome challenges in
		entering the tech industry.
	</p>
	<Callout items={volunteering} />
</section>

<style lang="scss">
</style>
