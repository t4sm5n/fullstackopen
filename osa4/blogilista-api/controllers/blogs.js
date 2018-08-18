const blogsRouter = require( 'express' ).Router();
const Blog = require( '../models/blog' );
const User = require( '../models/user' );

const jwt = require( 'jsonwebtoken' );

blogsRouter.get( '/', async ( request, response ) => {
	const blogs = await Blog
		.find({})
		.populate( 'user', { _id: 1, username: 1, name: 1 } );
	response.json( blogs.map( Blog.format )  )
} );

blogsRouter.post( '/', async ( request, response ) => {
	const body = request.body;

	try {
		const decodedToken = jwt.verify( request.token, process.env.SECRET );

		if ( !request.token || !decodedToken.id ) {
			return response.status( 401 ).json({ error: 'token missing or invalid' });
		}

		if ( !body.author || !body.url ) {
			return response.status( 400 ).json({ error: 'author and url are required' });
		}

		const user = await User.findById( decodedToken.id );

		const blog = new Blog( {
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes ? body.likes : 0,
			user: user._id
		} );

		const savedBlog = await blog.save();

		user.blogs = user.blogs.concat( savedBlog._id );
		await user.save();

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