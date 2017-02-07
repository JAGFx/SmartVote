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
	res.redirect('/users/login');
} )

// Page de détails (e.g. liste des objets)
	.get( '/manager.html', function ( req, res ) {
		var students = [];
		req.params[ 'students' ] = students;
		res.render( 'manager.ejs', req.params );
	} )

	.post( '/:idQuestion/question', function ( req, res, next ) {
		var student = {
			name: req.body['name'],
			nickname: req.body['nickname'],
			salon: req.body['salon']
		}

		if ( typeof req.params.idQuestion === "undefined"
			|| typeof questions[ req.params.idQuestion ] === "undefined" )
			next();

		req.params[ 'student' ] = student;
		req.params[ 'question' ] = questions[ req.params.idQuestion ];

		console.log(req.params);

		res.render('question.ejs', req.params);
	} )

	// Page de détails d'un objet
	.get( '/:idQuestion/resultat.html', function ( req, res ) {
		res.render( 'resultat.ejs', req.params );
	} )

/*.use( function ( req, res, next ) {
		res.setHeader( 'Content-Type', 'text/plain; charset=utf-8' );
		res.status( 404 ).send( 'Vous êtes sur une page inconnue.' );
 } );*/

module.exports = router;
