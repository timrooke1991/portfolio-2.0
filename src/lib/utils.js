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
					date: formatDate(metadata.date),
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

export function getRelatedPosts(currentTheme, allPosts, currentTitle) {
	let filteredPosts = allPosts.filter((post) => post?.meta.title !== currentTitle);

	if (currentTheme) {
		let themeRelatedPosts = filteredPosts.filter((post) => post?.meta.theme === currentTheme);
		if (themeRelatedPosts.length >= 3) {
			return themeRelatedPosts.slice(0, 3); // Return the first 3 posts with the same theme
		}
	}

	// If there's no theme or not enough theme-related posts, return the 3 most recent posts
	return filteredPosts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date)).slice(0, 3);
}

export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
