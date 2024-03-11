
export const fetchMarkdownPosts = async () => {
	const allPostFiles = import.meta.glob('/src/routes/blog/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const postPath = path.slice(11, -3);
			return {
				meta: {
					...metadata,
					rawDate: metadata.date
				},
				path: postPath
			};
		})
	);

	return allPosts;
};

export function formatDate(dateStr) {
	const dateParts = dateStr.split('-');
	const year = dateParts[0];
	const month = dateParts[1] - 1; // Month is 0-indexed in JavaScript Date
	const day = dateParts.length > 2 ? dateParts[2] : 1; // Default to 1 if day is not provided

	const date = new Date(year, month, day);

	const options = {
		month: 'long' // Full month name
		// year: '2-digit' // Two digit year
	};

	// Include day in the options if it was provided in the dateStr
	if (dateParts.length > 2) {
		options.day = 'numeric';
	}

	const formatter = new Intl.DateTimeFormat('en', options);

	return formatter.format(date);
}
