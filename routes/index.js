var express   = require( 'express' );
var router    = express.Router();
var questions = [
	{
		id:      1,
		text:    "Une question ?",
		answers: [
			{
				text:  'answer 1',
				value: true
			},
			{
				text:  'answer2',
				value: false
			}
		]
	}
];

/* GET home page. */
router.get( '/', function ( req, res ) {
	res.render( 'index', { title: 'Express' } );
} )

// Page de détails (e.g. liste des objets)
	.get( '/manager.html', function ( req, res ) {
		res.render( 'manager.ejs', [] );
	} )
	
	.get( '/:idQuestion/question.html', function ( req, res, next ) {
		//console.log( req.params.idQuestion, typeof questions[ req.params.idQuestion ] );
		
		if ( typeof req.params.idQuestion === "undefined"
			|| typeof questions[ req.params.idQuestion ] === "undefined" )
			next();
		
		res.render( 'question.ejs', {
			question: questions[ req.params.idQuestion ]
		} );
	} )
	
	// Page de détails d'un objet
	.get( '/:idQuestion/resultat.html', function ( req, res ) {
		res.render( 'resultat.ejs', req.params );
	} )
	
	.use( function ( req, res, next ) {
		res.setHeader( 'Content-Type', 'text/plain; charset=utf-8' );
		res.status( 404 ).send( 'Vous êtes sur une page inconnue.' );
	} );

module.exports = router;
