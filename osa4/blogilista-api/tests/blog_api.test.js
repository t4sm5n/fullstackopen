const supertest = require( 'supertest' );
const { app, server } = require( '../index' );
const api = supertest( app );
const Blog = require( '../models/blog' );
const helper = require( './test_helper' );

beforeEach( async () => {
	await helper.purgeDatabase();
	await helper.initDatabase();
} );

describe( 'get \'/api/blogs\'', () => {

	test( 'blogs are returned as json', async () => {
		await api
			.get( '/api/blogs' )
			.expect( 200 )
			.expect( 'Content-Type', /application\/json/ );
	} );

	test( 'all blogs are returned', async () => {
		const response = await api
			.get( '/api/blogs' );

		expect( response.body.length ).toBe( helper.initialBlogs.length );
	} );

	test( 'a specific blog is within the returned blogs', async () => {
		const response = await api
			.get( '/api/blogs' );

		const titles = response.body.map( r => r.title );

		expect( titles ).toContain( 'API:t käytännössä - selkokielinen katsaus' );
	} );

} );

describe( 'post \'/api/blogs\'', () => {

	test( 'a valid blog can be added', async () => {
		const newBlog = {
			title: 'Master Data Management pähkinänkuoressa',
			author: 'Jarkko Vähäkangas',
			url: 'https://www.alfame.com/blog/master-data-management-pahkinankuoressa',
			likes: 56
		};

		const blogsBefore = await helper.blogsInDatabase();

		await api
			.post( '/api/blogs' )
			.send( newBlog )
			.expect( 201 )
			.expect( 'Content-Type', /application\/json/ );

		const blogsAfter = await helper.blogsInDatabase();

		expect( blogsAfter.length ).toBe( blogsBefore.length + 1 );
		expect( blogsAfter.map( b => b.title ) ).toContain( newBlog.title );
	} );

	test( 'likes defaults to zero if no value specified', async () => {
		const newBlog = {
			title: 'Master Data Management pähkinänkuoressa',
			author: 'Jarkko Vähäkangas',
			url: 'https://www.alfame.com/blog/master-data-management-pahkinankuoressa'
		};

		const addedBlog = await api
			.post( '/api/blogs' )
			.send( newBlog )
			.expect( 201 )
			.expect( 'Content-Type', /application\/json/ );

		expect( addedBlog.body.likes ).toBe( 0 );

	} );

	test( 'invalid blog can\'t be added', async () => {
		const newBlog = {
			author: 'Jarkko Vähäkangas'
		};

		await api
			.post( '/api/blogs' )
			.send( newBlog )
			.expect( 400 );

		const response = await api
			.get( '/api/blogs' );

		expect( response.body.length ).toBe( helper.initialBlogs.length );

	} );

} );

describe( 'delete \'/api/blogs\'', async () => {

	test( 'delete blog', async () => {
		const addedBlog = new Blog( {
			title: 'Master Data Management pähkinänkuoressa',
			author: 'Jarkko Vähäkangas',
			url: 'https://www.alfame.com/blog/master-data-management-pahkinankuoressa',
			likes: 12
		} );

		await addedBlog.save();

		const blogsBefore = await helper.blogsInDatabase();

		await api
			.delete( `/api/blogs/${ addedBlog._id }` )
			.expect( 204 );


		const blogsAfter = await helper.blogsInDatabase();

		const titles = blogsAfter.map( blog => blog.title );

		expect( titles ).not.toContain( addedBlog.title );
		expect( blogsAfter.length ).toBe( blogsBefore.length - 1 );

	} );

} );

afterAll( () => {
	server.close();
} );