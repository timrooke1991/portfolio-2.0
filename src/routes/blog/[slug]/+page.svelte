<!-- src/routes/[slug]/+page.svelte -->
<script>
    let { data }  = $props();
    console.log("In scripting", data);
</script>

<svelte:head>
	<title>My blog - {data.title}</title>
	<meta property="og:title" content={data.title} />
</svelte:head>
<article>
    Hello
    <h1>{data.title}</h1>
    <p>Published: {data.date}</p>

    {#if data.categories.length}
	<aside>
		<h2>Posted in:</h2>
		<ul>
			{#each data.categories as category}
				<li>
					<a href="/blog/category/{category}">
						{category}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
    {/if}

    <svelte:component this={data.content} />
</article>

<style lang="scss">
    article {
        margin: 0 var(--halfNote) var(--halfNote) 0;
        max-width: 38em;
        color: var(--ink);
    }
    article h1 {
        font-size: clamp(1.8rem, 1rem + 3vw, 3.5rem);
        margin-bottom: var(--halfNote);
        font-weight: 400;
        max-width: 17em;
        color: var(--ink);
    }
    article p {
        margin: 0 var(--halfNote) var(--quarterNote) 0;
        max-width: 38em;
        color: var(--ink);
    }
</style>