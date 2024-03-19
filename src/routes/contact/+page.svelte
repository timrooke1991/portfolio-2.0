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
		I'm always excited to connect with like-minded individuals, fellow developers, and anyone
		passionate about technology, learning or running. Whether you're interested in discussing the
		software, sharing running tips, or just saying hi, get in touch on the below platforms.
	</p>
	<LinkList links={socials} />
</section>
