<!-- src/routes/[slug]/+page.svelte -->
<script>
	import { onMount } from 'svelte';

	let { data } = $props();
	let readingTime = $state(1);

	onMount(() => {
        console.log("data", data?.content);
		const words = 500 // data?.content.trim().split(/\s+/).length;
		const wordsPerMinute = 225; // Average reading speed
		readingTime = Math.max(1, Math.ceil(words / wordsPerMinute));
	});
</script>

<svelte:head>
	<title>Blog - {data.title}</title>
	<meta property="og:title" content={data.title} />
</svelte:head>

<article class="page-container-center">
	<div class="header title-accent">
		<h1>{data.title}</h1>
		<p class="meta">
			<span class="date">{data?.date}</span>
			<span class="time">{readingTime} min read</span>
		</p>
	</div>

	<svelte:component this={data.content} />

	{#if data.categories?.length}
		<aside>
			<ul class="no-bullets title-accent">
				{#each data.categories as category, index}
					{#if index !== 0}
						<span class="separator"></span>
					{/if}
					<li><a href="categories/{category}">{category}</a></li>
				{/each}
			</ul>
		</aside>
	{/if}
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		margin: auto;
		max-width: 38em;
		color: var(--ink);
	}

	.header {
		margin-bottom: var(--quarterNote);
	}

	article h1 {
		font-size: clamp(1.8rem, 1rem + 3vw, 3.5rem);
		margin-bottom: var(--sixteenthNote);
		margin-top: 0;
		font-weight: 400;
		max-width: 17em;
		color: var(--ink);
	}
	article p {
		font-family: var(--codeFont);
		font-size: 0.75em;
		margin: 0;
		color: var(--purple);
	}

	p.meta {
		display: flex;
		font-family: var(--codeFont);
		justify-content: space-between;
		padding-left: 0.3em;

		span.date {
			font-size: 0.85em;
			color: var(--greyLight);
		}

		span.time {
			font-size: 0.85em;
			color: var(--purple);
		}
	}

	.separator::before {
		content: '•';
		color: var(--yellow);
		padding: 0 8px;
		font-size: 24px;
		vertical-align: middle;
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
		margin-top: var(--halfNote);

		li {
			text-decoration: none;
			color: inherit;
		}
	}
</style>
