const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const blogSchema = new Schema( {
	title: String,
	author: String,
	url: String,
	likes: Number,
	user: { type: Schema.Types.ObjectId, ref: 'User' }
} );

blogSchema.statics.format = function( blog ) {
	return {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes,
		id: blog._id,
		user: blog.user
	};
};

const Blog = mongoose.model( 'Blog', blogSchema );

module.exports = Blog;