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

const mostBlogs = ( blogs ) => {
	if ( blogs.length === 0 ) {
		return undefined;
	}

	const reducer = ( previous, current, index, array ) => {
		return ( array.filter( item => item === previous ).length >= array.filter( item => item === current ).length ) ? previous : current
	};

	const author = blogs
		.map( blog => blog.author )
		.reduce( reducer );

	const amount = blogs
		.filter( blog => blog.author === author )
		.length;

	return {
		author,
		blogs: amount
	}
};

const mostLikes = ( blogs ) => {
	if ( blogs.length === 0 ) {
		return undefined;
	}

	const reducer = ( previous, current, index, array ) => {
		let previousAuthorsBlogs = array.filter( blog => blog.author === previous.author );
		let currentAuthorsBlogs = array.filter( blog => blog.author === current.author );
		return ( totalLikes( previousAuthorsBlogs ) >= totalLikes( currentAuthorsBlogs ) ? previous : current );
	};

	const author = blogs.reduce( reducer, 0 ).author;

	return {
		author,
		likes: totalLikes( blogs.filter( blog => blog.author === author ) )
	};

};

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
};