// src/routes/api/posts/+server.js
import { fetchMarkdownPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';
import { formatDate } from '$lib/utils';

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();

	// Sort posts by date
	const sortedPosts = allPosts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));

	// Group posts by year and month, then by theme
	const groupedPosts = sortedPosts.reduce((acc, post) => {
		const date = new Date(post.meta.date);
		const yearMonth = formatDate(
			`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
		);

		if (!acc[yearMonth]) {
			acc[yearMonth] = { themed: [], topLevel: [] };
		}

		// Assuming 'toplevel' is the identifier for top-level posts
		if (post.meta.theme === 'toplevel' || !post.meta.theme) {
			acc[yearMonth].topLevel.push(post);
		} else {
			acc[yearMonth].themed.push(post);
		}

		return acc;
	}, {});

	return json(groupedPosts);
};
