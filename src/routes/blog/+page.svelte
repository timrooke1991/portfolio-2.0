<!-- src/routes/blog/+page.svelte -->
<script>
    let { data } = $props();
</script>

<h1>Blog</h1>

<ul>
	{#each data.posts as post}
		<div>
			<h2>
				<a href={post.path}>
					{post.meta.title}
				</a>
			</h2>
			Published {post.meta.date}
		</div>
	{/each}
</ul>

<style lang="scss">
    :where(h2, h3, h4, h5, h6) {
        .icon-link {
            position: relative;

            &::before {
                content: '#';
                position: absolute;
                left: -1ch;
                top: 0;
                line-height: 1;
                opacity: 0;
                text-decoration: underline;
            }
        }

        &:hover .icon-link::before {
            opacity: 1;
        }
    }
</style>