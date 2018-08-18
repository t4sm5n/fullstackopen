const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const userSchema = new Schema( {
	name: String,
	username: String,
	passwordHash: String,
	adult: Boolean
} );

userSchema.statics.format = function( user ) {
	return {
		name: user.name,
		username: user.username,
		passwordHash: user.passwordHash,
		adult: user.adult,
		id: user._id
	};
};

userSchema.statics.formatNoPasswordHash = function( user ) {
	return {
		name: user.name,
		username: user.username,
		adult: user.adult,
		id: user._id
	};
};

const User = mongoose.model( 'User', userSchema );

module.exports = User;