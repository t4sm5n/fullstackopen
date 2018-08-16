const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const morgan = require( 'morgan' );
const mongoose = require( 'mongoose' );
const blogsRouter = require( './controllers/blogs' );

const app = express();

morgan.token( 'body', ( request, response ) => {
	return JSON.stringify( request.body );
} );

const mongoUrl = 'mongodb://********:*********@ds123852.mlab.com:23852/blogilista-database';
mongoose
	.connect( mongoUrl, { useNewUrlParser: true } )
	.then( () => {
		console.log( 'connected to database', mongoUrl );
	} )
	.catch( error => {
		console.log( error );
	} );

app.use( cors() );
app.use( bodyParser.json() );
app.use( morgan( ':method :url :body :status :res[content-length] - :response-time ms' ) );
app.use( '/api/blogs', blogsRouter );

const PORT = 3003;
app.listen( PORT, () => {
	console.log( `Server running on port ${PORT}` );
} );