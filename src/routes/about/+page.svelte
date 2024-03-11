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
		I'm a web developer from the UK. I've been working in the industry for over 10 years and have
		experience in a wide range of technologies. I'm currently working as a full-stack developer at a
		digital agency in the UK.
	</p>
	<p>
		I'm a web developer from the UK. I've been working in the industry for over 10 years and have
		experience in a wide range of technologies. I'm currently working as a full-stack developer at a
		digital agency in the UK.
	</p>
	<h3 class="page-title title-accent">My background</h3>
	<p>
		I'm a web developer from the UK. I've been working in the industry for over 10 years and have
		experience in a wide range of technologies. I'm currently working as a full-stack developer at a
		digital agency in the UK.
	</p>
	<p>
		I'm a web developer from the UK. I've been working in the industry for over 10 years and have
		experience in a wide range of technologies. I'm currently working as a full-stack developer at a
		digital agency in the UK.
	</p>
	<h3 class="page-title title-accent">My experience</h3>
	<p>
		I'm a web developer from the UK. I've been working in the industry for over 10 years and have
		experience in a wide range of technologies. I'm currently working as a full-stack developer at a
		digital agency in the UK.
	</p>
	<p>
		I'm a web developer from the UK. I've been working in the industry for over 10 years and have
		experience in a wide range of technologies. I'm currently working as a full-stack developer at a
		digital agency in the UK.
	</p>
	<h3 class="page-title title-accent">My interests</h3>
	<p>
		I'm a web developer from the UK. I've been working in the industry for over 10 years and have
		experience in a wide range of technologies. I'm currently working as a full-stack developer at a
		digital agency in the UK.
	</p>
	<Callout items={callouts} />
	<p>
		I'm a web developer from the UK. I've been working in the industry for over 10 years and have
		experience in a wide range of technologies. I'm currently working as a full-stack developer at a
		digital agency in the UK.
	</p>
</section>

<style lang="scss">
</style>
