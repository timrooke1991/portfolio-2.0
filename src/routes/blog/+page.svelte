<!-- src/routes/blog/+page.svelte -->
<script>
	let { data } = $props();
	import { formatDate } from '$lib/utils';
	console.log('data', data);
</script>

<section class="page-container-center">
	<h1 class="page-title title-accent">Blog</h1>

	{#each Object.keys(data.posts) as monthYear}
		<div class="month-section no-transition">
			<h2 class="month-title">
				{monthYear} - {data.posts[monthYear].themed.length > 0
					? data.posts[monthYear].themed[0].meta.theme
					: 'general'}
			</h2>

			{#if data.posts[monthYear].themed.length > 0}
				<div class="posts-container">
					{#each data.posts[monthYear].themed as themedPost}
						<article class="post">
							<a href={themedPost.path}>
								<h3>
									{themedPost.meta.title}
								</h3>
							</a>
							<p class="preview">
								{themedPost.meta.preview}
							</p>
							<p class="meta">
								<span class="date">{themedPost?.meta.date}</span>
								<span class="time">{themedPost.meta?.readingTime ?? 5} min read</span>
							</p>
						</article>
					{/each}
				</div>
			{/if}

			<div class="posts-container no-border">
				{#each data.posts[monthYear]?.topLevel as topLevelPost}
					<h2 class="month-title">{formatDate(topLevelPost.meta.date)}</h2>
					<article class="post">
						<a href={topLevelPost.path}>
							<h3>
								{topLevelPost.meta.title}
							</h3>
						</a>
						<p class="preview">
							{topLevelPost.meta.preview}
						</p>
						<p class="meta">
							<span class="date">{topLevelPost?.meta.date}</span>
							<span class="time">{topLevelPost.meta?.readingTime ?? 5} min read</span>
						</p>
					</article>
				{/each}
			</div>
		</div>
	{/each}
</section>

<style lang="scss">
	.month-section {
		margin-bottom: 2rem;
	}

	.month-title {
		margin-bottom: 1rem;
		font-size: 0.85em;
		font-family: var(--codeFont);
		color: var(--yellow);
		text-transform: lowercase;
		line-height: 1.2;
	}

	.posts-container {
		margin: 1rem 0.5rem;
		padding: 0.5rem;
		border-left: 2px solid var(--purple);

		&.no-border {
			border-left: none;
		}
	}

	h3 {
		position: relative; /* This is crucial for positioning the ::before content correctly */
		color: var(--ink);
		font-size: 1.2em;
        font-weight: 400;
	}

	h3::before {
		content: '';
		display: inline-block;
		width: 18px;
		height: 18px;
		border-radius: 9px;
		border: 2px solid var(--purple);
		background-color: var(--grey);
		margin-right: 1rem;
		margin-left: -2.02rem;
		transition: background-color 0.3s ease-in-out;
		transition-delay: 0.12s;
	}

	.post {
		margin-left: 1rem;
		margin-bottom: 0.5rem;
		margin-top: 1rem;
		transition: transform 0.3s ease-in-out;

		&:hover {
			transform: translateX(10px);
			cursor: pointer;
			h3::before {
				background-color: var(--purple);
			}
		}
	}

	p.preview {
		color: var(--lighterGrey);
	}

	p.meta {
		display: flex;
		font-family: var(--codeFont);
		justify-content: space-between;

		span.date {
			font-size: 0.75em;
			color: var(--greyLight);
		}

		span.time {
			font-size: 0.75em;
			color: var(--purple);
		}
	}
</style>
