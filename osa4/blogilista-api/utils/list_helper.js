const dummy = ( blogs ) => {
	return 1;
};

const totalLikes = ( blogs ) => {
	const reducer = ( previous, current ) => {
		return previous + current.likes;
	};

	return blogs.length === 0 ? 0 : blogs.reduce( reducer, 0 );
};

const favouriteBlog = ( blogs ) => {
	if ( blogs.length === 0 ) {
		return undefined;
	};

	const reducer = ( previous, current ) => {
		return ( previous.likes > current.likes ) ? previous : current;
	};

	const blog = blogs.reduce( reducer );

	return {
		title: blog.title,
		author: blog.author,
		likes: blog.likes
	};
};

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog
};