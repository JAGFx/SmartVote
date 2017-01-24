/**
 * Created by SMITHE on 23-Jan-17.
 */
var express = require( 'express' );
var server  = express();
// Page d'accueil
server.get( '/', function ( req, res ) {
	res.setHeader( 'Content-Type', "text/html; charset=utf-8" );
    params = [];
    res.end('<html><body>Vous êtes sur la page d\'accueil</body></html>');
	// res.render('/views/manager.ejs', params);
} )

    // Page de détails (e.g. liste des objets)
	.get( '/manager.html', function ( req, res ) {
		res.render('manager.ejs', []);
	} )

    .get( '/:idQuestion/question.html', function ( req, res ) {
        res.render('question.ejs', req.params);
    } )
	
	// Page de détails d'un objet
	.get( '/:idQuestion/resultat.html', function ( req, res ) {
        res.render('resultat.ejs', req.params);
	} )
	
	.use( function ( req, res, next ) {
		res.setHeader( 'Content-Type', 'text/plain; charset=utf-8' );
		res.status( 404 ).send( 'Vous êtes sur une page inconnue.' );
	} );

server.listen( 8080 );