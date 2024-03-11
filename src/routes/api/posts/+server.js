// src/routes/api/posts/+server.js
import { json } from '@sveltejs/kit';
import { fetchMarkdownPosts } from '$lib/utils'; // Adjust the import path as necessary

export const GET = async ({ url }) => {
	// Fetch all posts
	const allPosts = await fetchMarkdownPosts();

	// Check for 'grouped' query parameter
	const isGrouped = url.searchParams.get('grouped') === 'true';

	if (isGrouped) {
		// Group posts by year and month, then by theme
		const groupedPosts = groupPosts(allPosts);
		return json(groupedPosts);
	} else {
		// Sort posts by date if not grouped
		const sortedPosts = allPosts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
		return json(sortedPosts);
	}
};

function groupPosts(posts) {
	return posts.reduce((acc, post) => {
		const date = new Date(post.meta.date);
		const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

		if (!acc[yearMonth]) {
			acc[yearMonth] = { themed: [], topLevel: [] };
		}

		if (post.meta.theme === 'toplevel' || !post.meta.theme) {
			acc[yearMonth].topLevel.push(post);
		} else {
			acc[yearMonth].themed.push(post);
		}

		return acc;
	}, {});
}
