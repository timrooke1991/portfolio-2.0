import { json } from '@sveltejs/kit';
import { fetchMarkdownPosts, formatDate } from '$lib/utils'; // Adjust the import path as necessary

export const GET = async () => {
	// Fetch all posts
	const allPosts = await fetchMarkdownPosts();

	// Group posts by year and month, then by theme
	const groupedPosts = groupPosts(allPosts);
	return json(groupedPosts);
};

function groupPosts(posts) {
	return posts.reduce((acc, post) => {
		const date = new Date(post.meta.date);
		const yearMonth = formatDate(
			`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
		);

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
