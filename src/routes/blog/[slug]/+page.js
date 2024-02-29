// src/routes/blog/[slug]/+page.js
export async function load({ params }) {
	try {
		console.log('load');
		console.log('params', params);
		const post = await import(`../${params.slug}.md`);
		const { title, date } = post.metadata;
		const content = post.default;
		console.log('content', content);
		console.log('title', title);
		console.log('date', date);

		return {
			content,
			...post.metadata,
			title,
			date
		};
	} catch (e) {
		return {
			status: 404,
			error: 'Not found'
		};
	}
}
