/**
 * Created by emsm on 07/02/2017.
 */

var mysql      = require( 'mysql' );
var connection = mysql.createConnection( {
	host:     'localhost',
	database: 'smartvote',
	user:     'root',
	// // Pour Mac
	// port: '3306',
	// socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
	// password: 'root'
} );

exports.insertEntity = function ( table, newEntity, callback ) {
	if ( typeof table === "undefined" )
		throw "Undefined table name. Specify it !";
	if ( typeof newEntity === "undefined" )
		throw  "Undefined entity. Spefify it !";
	if ( typeof callback !== "function" )
		throw "The callback isn't a valid function.";

	var query = 'INSERT INTO ' + table + ' SET ?';

	connection.query( query, newEntity, function ( error, results ) {
		if ( error )
			callback( error, null );

		else
			callback( null, results );
	} );
};

exports.updateEntity = function ( table, newEntity, callback ) {
	if ( typeof table === "undefined" )
		throw "Undefined table name. Specify it !";
	if ( typeof newEntity === "undefined" )
		throw  "Undefined entity. Spefify it !";
	if ( typeof callback !== "function" )
		throw "The callback isn't a valid function.";

	var query = 'UPDATE ' + table + ' SET ? WHERE id = ?';

	connection.query( query, [ newEntity, newEntity.id ], function ( error, results ) {
		if ( error )
			callback( error, null );

		else
			callback( null, results );
	} );
};

exports.deleteEntity = function ( table, id, callback ) {
	if ( typeof table === "undefined" )
		throw "Undefined table name. Specify it !";
	if ( typeof id === "undefined" )
		throw  "Undefined entity ID. Spefify it !";
	if ( typeof callback !== "function" )
		throw "The callback isn't a valid function.";

	var query = 'DELETE FROM ' + table + ' WHERE id = ?';

	connection.query( query, id, function ( error, results ) {
		return callback( error, results );
	} );
};

exports.find = function ( query, params, callback ) {
	if ( typeof callback !== "function" )
		throw "The callback isn't a valid function.";

	connection.query( query, params, function ( error, results ) {
		callback( error, results );
	} );
};
