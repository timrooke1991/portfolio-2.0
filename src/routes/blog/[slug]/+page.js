// src/routes/blog/[slug]/+page.js
import { formatDate } from '$lib/utils';

export async function load({ params }) {
	try {
		const post = await import(`../${params.slug}.md`);
		const { title, date } = post.metadata;
		const content = post.default;

		return {
			content,
			...post.metadata,
			title,
			date: formatDate(date)
		};
	} catch (e) {
		return {
			status: 404,
			error: 'Not found'
		};
	}
}
