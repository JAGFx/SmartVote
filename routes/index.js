var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

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

module.exports = router;
