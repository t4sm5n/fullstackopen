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
	await Blog.remove({});

	for ( let blog of initialBlogs ) {
		let blogObject = new Blog( blog );
		await blogObject.save();
	}
} );

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

afterAll( () => {
	server.close();
} );