const blogsRouter = require( 'express' ).Router();
const Blog = require( '../models/blog' );

blogsRouter.get( '/', async ( request, response ) => {
	const blogs = await Blog.find({});
	response.json( blogs.map( Blog.format )  )
} );

blogsRouter.post( '/', async ( request, response ) => {
	try {
		const body = request.body;

		if ( !body.author || !body.url ) {
			return response.status( 400 ).json({ error: 'author and url are required' });
		}

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

blogsRouter.delete( '/:id', async ( request, response ) => {
	try {
		await Blog.findByIdAndRemove( request.params.id );

		response.status( 204 ).end();
	} catch ( exception ) {
		console.log( exception );
		response.status( 400 ).json({ error: 'id not found' })
	}
} );

blogsRouter.put( '/:id', async ( request, response ) => {
	try {
		const body = request.body;

		const blog = {
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes
		};

		const updatedBlog = await Blog.findByIdAndUpdate( request.params.id, blog, { new: true } );
		response.json( Blog.format( updatedBlog ) );

	} catch ( exception ) {
		console.log( exception );
		response.status( 400 ).send({ error: 'id not found' });
	}
} );

module.exports = blogsRouter;