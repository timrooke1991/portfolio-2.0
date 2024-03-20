import { json } from '@sveltejs/kit';
import { fetchMarkdownPosts } from '$lib/utils'; // Adjust the import path as necessary

export const GET = async () => {
	// Fetch all posts
	const allPosts = await fetchMarkdownPosts();

	// Sort posts by date
	const sortedPosts = allPosts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
	return json(sortedPosts);
};
