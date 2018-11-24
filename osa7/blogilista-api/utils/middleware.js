const tokenExtractor = ( request, response, next ) => {
	if ( process.env.NODE_ENV === 'test' ) {
		return next();
	}

	const authorization = request.get( 'authorization' );

	if ( authorization && authorization.toLowerCase().startsWith( 'bearer' ) ) {
		request.token = authorization.substring(7);
	}

	return next();
};

module.exports = {
	tokenExtractor
};