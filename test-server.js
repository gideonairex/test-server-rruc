'use strict';

let express = require( 'express' );
let _ = require( 'lodash' );
let app = express();
let bodyParser = require( 'body-parser' );

app.use( bodyParser.json() );

let todos = [
	{
		'id'   : '32ccc7df-5333-4cb6-aa21-1f75e5e2ff10',
		'name' : 'Wake up'
	}
];

app.use( function( req, res, next ) {
	res.header( 'Access-Control-Allow-Origin', '*' );
	res.header( 'Access-Control-Allow-Headers', 'X-Requested-With' );
	res.header( 'Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS' );
	res.header( 'Access-Control-Allow-Headers', 'Content-Type' );
	next();
} );

app.get( '/api/v1/todos', function ( req, res ) {
	res.send( todos );
} );

app.put( '/api/v1/todos/:id', function ( req, res ) {
	let index = _.findIndex( todos, function ( todo ) {
		return todo.id === req.params.id;
	} );
	let todo = todos[ index ];

	todo.name = req.body.name;
	todos[ index ] = todo;
	res.send( req.body );
} );

app.post( '/api/v1/todos', function ( req, res ) {
	todos.push( req.body );
	res.send( todos );
} );

app.listen( 3000 );
