const blogsRouter = require( 'express' ).Router();
const Blog = require( '../modules/blog' );

blogsRouter.get( '/', async ( request, response ) => {
	const blogs = await Blog.find({});
	response.json( blogs.map( Blog.format )  )
} );

blogsRouter.post( '/', async ( request, response ) => {
	try {
		const body = request.body;

		const blog = new Blog( {
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes ? body.likes : 0
		} );

		const savedBlog = await blog.save();
		response.status( 201 ).json( Blog.format( savedBlog ) );

	} catch ( exception ) {
		console.log( exception );
		response.status( 500 ).json({ error: 'something went wrong...' });
	}

} );

module.exports = blogsRouter;