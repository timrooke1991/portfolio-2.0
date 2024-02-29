<script>
    import '$lib/assets/scss/global.scss';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';	
	import { fade } from 'svelte/transition';
	 let { data } = $props();
</script>

<Header />

{#key data.currentRoute}
	<main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
		<slot />
	</main>
{/key}
<Footer />

