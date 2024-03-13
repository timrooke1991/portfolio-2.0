<script>
	import LinkList from '$lib/components/LinkList.svelte';
	import { socials } from '$lib/data/links.js';
</script>

<svelte:head>
	<title>Tim Rooke | Contact</title>
	<meta data-key="description" name="description" content="My social media and contact details." />
	<meta property="og:image" content="https://timrooke.co.uk/images/site-image.png" />
	<meta name="twitter:image" content="https://timrooke.co.uk/images/site-image.png" />
</svelte:head>

<section class="page-container-center">
	<h1 class="page-title title-accent">Where to find me</h1>
	<p>
		I'm a web developer from the UK. I've been working in the industry for over 10 years and have
		experience in a wide range of technologies. I'm currently working as a full-stack developer at a
		digital agency in the UK.
	</p>
	<LinkList links={socials} />
</section>
