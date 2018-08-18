const bcrypt = require( 'bcrypt' );
const usersRouter = require( 'express' ).Router();
const User = require( '../models/user' );

usersRouter.get( '/', async ( request, response ) => {
	try {
		const users = await User.find({});
		response.json( users.map( User.formatNoPasswordHash ) );
	} catch ( exception ) {
		console.log( exception );
		response.status( 500 ).json({ error: 'error while getting users' });
	}
} );

usersRouter.post( '/', async ( request, response ) => {
	try {
		const body = request.body;

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash( body.password, saltRounds );

		const user = new User( {
			name: body.name,
			username: body.username,
			passwordHash,
			adult: body.adult
		} );

		const savedUser = await user.save();

		response.status( 201 ).json( User.formatNoPasswordHash( savedUser ) );
	} catch ( exception ) {
		console.log( exception );
		response.status( 500 ).json({ error: 'error while creating user' });
	}
} );

module.exports = usersRouter;