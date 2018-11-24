const dummy = require( '../utils/list_helper' ).dummy;
const totalLikes = require( '../utils/list_helper' ).totalLikes;
const favouriteBlog = require( '../utils/list_helper' ).favouriteBlog;
const mostBlogs = require( '../utils/list_helper' ).mostBlogs;
const mostLikes = require( '../utils/list_helper' ).mostLikes;

describe.skip( 'list helpers', () => {

	test( 'dummy is called', () => {
		const blogs = [];

		const result = dummy( blogs );
		expect( result ).toBe( 1 );
	} );

	describe( 'total likes', () => {
		test( 'when list has no blogs, equal 0', () => {
			const result = totalLikes([]);
			expect( result ).toBe( 0 );
		} );

		test( 'when list has only one blog, equal likes of that blog', () => {
			const result = totalLikes( blogs.slice( 0, 1 ) );
			expect( result ).toBe( 7 );
		} );

		test( 'when list has many blogs, equal likes of all of them combined', () => {
			const result = totalLikes( blogs );
			expect( result ).toBe( 36 );
		} );

	} );

	describe( 'most likes', () => {
		test( 'when list has no blogs, equal undefined', () => {
			const result = favouriteBlog([]);
			expect( result ).toEqual( undefined ) ;
		} );

		test( 'when list has only one blog, equal that blog', () => {
			const listOfOneBlog = blogs.slice( 0, 1 );
			const result = favouriteBlog( listOfOneBlog );
			const blog = listOfOneBlog[0];

			expect( result ).toEqual( {
				title: blog.title,
				author: blog.author,
				likes: blog.likes
			} );
		} );

		test( 'when list has many blogs, equal the one with the most likes', () => {
			const result = favouriteBlog( blogs );
			expect( result ).toEqual( {
				title: "Canonical string reduction",
				author: "Edsger W. Dijkstra",
				likes: 12
			} )
		} );

	} );

	describe( 'most blogs', () => {
		test( 'when list has no blogs, equal undefined', () => {
			const result = mostBlogs([]);
			expect( result ).toEqual( undefined ) ;
		} );

		test( 'when list has only one blog, equal that blogs author', () => {
			const listOfOneBlog = blogs.slice( 0, 1 );
			const result = mostBlogs( listOfOneBlog );
			const blog = listOfOneBlog[0];

			expect( result ).toEqual( {
				author: blog.author,
				blogs: 1
			} );
		} );

		test( 'when list has many blogs, equal the author who has the most', () => {
			const result = mostBlogs( blogs );
			expect( result ).toEqual( {
				author: "Robert C. Martin",
				blogs: 3
			} )
		} );

	} );

	describe( 'most likes', () => {
		test( 'when list has no blogs, equal undefined', () => {
			const result = mostLikes([]);
			expect( result ).toEqual( undefined ) ;
		} );

		test( 'when list has only one blog, equal that blogs author', () => {
			const listOfOneBlog = blogs.slice( 0, 1 );
			const result = mostLikes( listOfOneBlog );
			const blog = listOfOneBlog[0];

			expect( result ).toEqual( {
				author: blog.author,
				likes: blog.likes
			} );
		} );

		test( 'when list has many blogs, equal the author who has the most likes', () => {
			const result = mostLikes( blogs );
			expect( result ).toEqual( {
				author: "Edsger W. Dijkstra",
				likes: 17
			} )
		} );

	} );

} );

const blogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0
	}
];