const Blog = require( '../models/blog' );
const User = require( '../models/user' );

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

const nonExistingId = async () => {
	const blog = new Blog();
	await blog.save();
	await blog.remove();

	return blog._id.toString();
};

const blogsInDatabase = async () => {
	const blogs = await Blog.find({});
	return blogs.map( Blog.format );
};

const purgeDatabase = async () => {
	return await Blog.remove({});
};

const initDatabase = async () => {
	return await Blog.insertMany( initialBlogs );
};

const usersInDatabase = async () => {
	const users = await User.find({});
	return users.map( User.formatNoPasswordHash );
};

module.exports = {
	initialBlogs, nonExistingId, blogsInDatabase, purgeDatabase, initDatabase, usersInDatabase
};