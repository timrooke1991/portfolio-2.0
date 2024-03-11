<script>
	let { post } = $props();
</script>

<article class="post">
	<a href={post.path}>
		<h3>
			{post.meta.title}
		</h3>
		<p class="preview">
			{post.meta.preview}
		</p>
		<p class="meta">
			<span class="date">{post?.meta.date}</span>
			<span class="time">{post.meta?.readingTime ?? 5} min read</span>
		</p>
	</a>
</article>

<style>
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
		color: var(--midGray);
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
