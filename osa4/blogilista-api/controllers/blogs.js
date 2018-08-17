const blogsRouter = require( 'express' ).Router();
const Blog = require( '../modules/blog' );

blogsRouter.get( '/', async ( request, response ) => {
	const blogs = await Blog.find({});
	response.json( blogs.map( Blog.format )  )
} );

blogsRouter.post( '/', ( request, response ) => {
	const blog = new Blog( request.body );

	blog
		.save()
		.then( result => {
			response.status( 201 ).json( result )
		} );
} );

module.exports = blogsRouter;