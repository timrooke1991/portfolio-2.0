// src/routes/blog/+page.js
export const load = async ({ fetch }) => {
    try {
        const response = await fetch(`/api/posts`);
        const posts = await response.json();

        return {
            posts
        };
    } catch (e) {
        return {
            status: 500,
            error: 'Internal server error'
        };
    }
};
