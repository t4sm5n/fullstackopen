const supertest = require( 'supertest' );
const { app, server } = require( '../index' );
const api = supertest( app );
const Blog = require( '../modules/blog' );

const initialBlogs = [
	{
		title: 'API:t käytännössä - selkokielinen katsaus',
		author: 'Jani Haglund',
		url: 'https://www.alfame.com/blog/apit-kaytannossa-selkokielinen-katsaus',
		likes: 42
	},
	{
		title: 'Estä liiketoimintanne riskit prosessien automatisoinnilla!',
		author: 'Janne Tirkkonen',
		url: 'https://www.alfame.com/blog/esta-liiketoimintanne-riskit-prosessien-automatisoinnilla',
		likes: 36
	}
];

beforeAll( async () => {
	await Blog.remove( {} );

	for ( let blog of initialBlogs ) {
		let blogObject = new Blog( blog );
		await blogObject.save();
	}
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

		expect( response.body.length ).toBe( initialBlogs.length );
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

		await api
			.post( '/api/blogs' )
			.send( newBlog )
			.expect( 201 )
			.expect( 'Content-Type', /application\/json/ );

		const response = await api
			.get( '/api/blogs' );

		const titles = response.body.map( r => r.title );

		expect( response.body.length ).toBe( initialBlogs.length + 1 );
		expect( titles ).toContain( 'Master Data Management pähkinänkuoressa' );
	} );

} );

afterAll( () => {
	server.close();
} );