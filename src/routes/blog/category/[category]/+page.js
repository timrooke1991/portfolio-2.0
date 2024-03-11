// src/routes/blog/category/[category]/+page.js
export const load = async ({ fetch, params }) => {
	try {
		const { category } = params;
		const response = await fetch(`/api/posts`);
		const allPosts = await response.json();

		const posts = allPosts.filter((post) => post.meta?.categories?.includes(category));

		return {
			category,
			posts
		};
	} catch (e) {
		return {
			status: 500,
			error: 'Internal server error',
			posts: []
		};
	}
};
