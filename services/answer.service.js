/**
 * Created by emsm on 25/02/2017.
 */

var mysql = require( '../services/mysql.service' );

exports.findAll = function ( callback ) {
	if ( typeof callback !== "function" )
		throw "The callback isn't a valid function.";
	
	var q = 'SELECT a.* FROM answers a';
	
	mysql.find( q, [], function ( err, res ) {
		if ( err )
			throw err;
		
		callback( res );
	} );
};