/**
 * Created by SMITHE on 23-Jan-17.
 */
var express = require( 'express' );
var server  = express();
// Page d'accueil
server.get( '/', function ( req, res ) {
	res.setHeader( 'Content-Type', "text/html; charset=utf-8" );
	res.end( '<html>' +
		 '<head>' +
		 '<style>' +
		 'p {color : blue;}' +
		 '</style>' +
		 '</head>' +
		 '<body>' +
		 '<p>Vous êtes sur la page d\'accueil</p>' +
		 '</body>' +
		 '</html>' );
} )

// Page de détails (e.g. liste des objets)
	.get( '/detail.html', function ( req, res ) {
		res.setHeader( 'Content-Type', "text/plain; charset=utf-8" );
		res.end( 'Vous êtes sur une page de détail' );
	} )
	
	// Page de détails d'un objet
	.get( '/pages/:idObjet/detail.html', function ( req, res ) {
		res.setHeader( 'Content-Type', 'text/plain; charset=utf-8' );
		res.end( 'Vous êtes sur la page de détail pour l\'objet ' + req.params.idObjet );
	} )
	
	.use( function ( req, res, next ) {
		res.setHeader( 'Content-Type', 'text/plain; charset=utf-8' );
		res.status( 404 ).send( 'Vous êtes sur une page inconnue.' );
	} );

server.listen( 8080 );
