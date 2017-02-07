/**
 * Created by emsm on 07/02/2017.
 */

var mysql      = require( 'mysql' );
var connection = mysql.createConnection( {
	host:     'localhost',
	database: 'smatvote',
	user:     'root',
	password: ''
} );

exports.insertEntity = function ( table, newEntity, callback ) {
	if( typeof table === "undefined")
		throw "Undefined table name. Specify it !";
	if ( typeof newEntity === "undefined")
		throw  "Undefined entity. Spefify it !";
	if( typeof callback === "undefined")
		throw "Undefined callback. Specify it !";
	
	var query = 'INSERT INTO ' + table + ' SET ?';
	
	connection.connect();
	connection.query( query, newEntity, function ( error, results, fields ) {
		if( error )
			callback( error, null);
		
		else
			callback( null, results );
	} );
	connection.end();
};

exports.updateEntity = function ( table, newEntity, callback ) {
	if( typeof table === "undefined")
		throw "Undefined table name. Specify it !";
	if ( typeof newEntity === "undefined")
		throw  "Undefined entity. Spefify it !";
	if( typeof callback === "undefined")
		throw "Undefined callback. Specify it !";
	
	var query = 'UPDATE ' + table + ' SET ? WHERE id = ?';
	
	connection.connect();
	connection.query( query, [ newEntity, newEntity.id ],  function ( error, results, fields ) {
		if( error )
			callback( error, null);
		
		else
			callback( null, results );
	} );
	connection.end();
};

exports.deleteEntity = function ( table, id, callback ) {
	if( typeof table === "undefined")
		throw "Undefined table name. Specify it !";
	if ( typeof id === "undefined")
		throw  "Undefined entity ID. Spefify it !";
	if( typeof callback === "undefined")
		throw "Undefined callback. Specify it !";
	
	var query = 'DELETE FROM ' + table + ' WHERE id = ?';
	
	connection.connect();
	connection.query( query, id, function ( error, results, fields ) {
		if( error )
			callback( error, null);
		
		else
			callback( null, results );
	} );
	connection.end();
};

exports.find = function ( query, params, callback ) {
	if( typeof table === "undefined")
		throw "Undefined table name. Specify it !";
	if( typeof callback === "undefined")
		throw "Undefined callback. Specify it !";
	
	connection.connect();
	
	connection.query( query, params, function ( error, results, fields ) {
		if( error )
			callback( error, null);
		
		else
			callback( null, results );
	} );
	
	connection.end();
};