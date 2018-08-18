const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const userSchema = new Schema( {
	name: String,
	username: String,
	passwordHash: String,
	adult: Boolean,
	blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }]
} );

userSchema.statics.format = function( user ) {
	return {
		name: user.name,
		username: user.username,
		passwordHash: user.passwordHash,
		adult: user.adult,
		id: user._id,
		blogs: user.blogs
	};
};

userSchema.statics.formatNoPasswordHash = function( user ) {
	return {
		name: user.name,
		username: user.username,
		adult: user.adult,
		id: user._id,
		blogs: user.blogs
	};
};

const User = mongoose.model( 'User', userSchema );

module.exports = User;