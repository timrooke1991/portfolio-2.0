<!-- src/routes/blog/+page.svelte -->
<script>
    let { data } = $props();
</script>


<section>
    <h1>Blog</h1>

    {#each data?.posts as post}
        <article>
            <h2>
                <a href={post.path}>
                    {post.meta.title}
                </a>
            </h2>
            Published {post.meta?.date}
        </article>
    {/each}
</section>

<style lang="scss">
</style>