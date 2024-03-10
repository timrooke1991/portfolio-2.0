<script>
	import LinkList from '$lib/components/LinkList.svelte';
	let links = [
		{
			href: 'https://www.linkedin.com/in/tim-rooke/',
			name: 'LinkedIn',
			target: '_blank'
		},
		{
			href: 'https://twitter.com/timrooke1991',
			name: 'Twitter',
			target: '_blank'
		},
		{
			href: 'https://github.com/timrooke1991',
			name: 'Github',
			target: '_blank'
		},
		{
			href: 'mailto:timrooke1991+portfolio.com',
			name: 'Email',
			target: '_blank'
		}
	];
</script>

<svelte:head>
	<title>Tim Rooke | Contact</title>
	<meta data-key="contact" name="contact" content="My social media and contact details." />
</svelte:head>

<section class="page-container-center">
	<h1 class="page-title title-accent">Where to find me</h1>
	<p>
		I'm a web developer from the UK. I've been working in the industry for over 10 years and have
		experience in a wide range of technologies. I'm currently working as a full-stack developer at a
		digital agency in the UK.
	</p>
	<LinkList {links} />
</section>
