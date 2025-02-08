<script>
	import Callout from '$lib/components/Callout.svelte';
	import { socialsMap } from '$lib/data/links.js';
	const currentYear = new Date().getFullYear();
	let skills = [
		{
			value: 'Product',
			subvalue: '4 years'
		},
		{
			value: 'Engineering',
			subvalue: currentYear - 2017 + ' years'
		},
		{
			value: 'Startups',
			subvalue: '10+ years'
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
			subvalue: 'Marshall'
		},
		{
			value: 'Brightside',
			subvalue: 'Mentor'
		},
		{
			value: 'Meet A Mentor',
			subvalue: 'Mentor'
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
		the tech industry, including roles in Software Engineering and Product Management. I enjoy
		building products and writing code. Currently, I work at Legl, a SaaS platform designed for law
		firms.
	</p>
	<Callout items={skills} />

	<h3 class="page-title title-accent">Interests</h3>
	<p>
		Outside of work, I'm passionate about sports, particularly running. I regularly participate in
		marathons and half-marathons, with the New York Marathon on my bucket list. Since moving to
		Dorset, I've enjoyed exploring the running trails around the Isle of Purbeck. Feel free to get
		in touch on <a target="_blank" href={socialsMap['strava']}>Strava</a>. I'm also an enthusiastic
		cook, with plans to build an elaborate outdoor kitchen in my garden.
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
		experienced significant company growth. You can read more about my experience on my <a
			target="_blank"
			href={socialsMap['linkedin']}>LinkedIn</a
		>.
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
		events, and mentoring.
	</p>

	<Callout items={volunteering} />
	<p>
		I was lucky enough to change careers and choose a career path that I truly found interesting and
		engaging. It took me some time to figure this out, and I often wonder if I had a mentor,
		teacher, or someone earlier in life whether that person may have coached, helped, or steered me
		toward potentially better, more suited decisions at key stages in my early education. Through
		Brightside and Meet A Mentor, I guide young individuals and aspiring developers, helping them
		navigate their career paths and overcome challenges in entering the tech industry.
	</p>
</section>

<style lang="scss">
	p {
		line-height: 1.5;
	}
</style>
