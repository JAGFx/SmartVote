var express   = require( 'express' );
var router    = express.Router();
var QuestionService = require( '../services/question.service.js' );

var questions = [
	{
		id: 0,
		text:    "Une question ?",
		answers: [
			{
				id:    1,
				text:  'answer 1',
				value: true
			},
			{
				id:    2,
				text:  'answer2',
				value: false
			}
		]
	}
];

/* GET home page. */
router.get( '/', function ( req, res ) {
	
	// INSERT ENTITY
	/*mysql.insertEntity( 'question', {
		id:   2,
		text: "Une question ?"
	}, function ( err, res ) {
		console.log( err, res );
	} );*/
	
	// UPDATE
	/*mysql.updateEntity( 'question', {
		id:   2,
		text: "Une PLOP omega ?"
	}, function ( err, res ) {
		console.log( err, res );
	} );*/
	
	// DELETE
	/*mysql.deleteEntity( 'question', 3, function ( err, res ) {
		console.log( err, res );
	} );*/
	
	// SELECT
	/*var q = 'SELECT * FROM question';
	mysql.find( q, [] , function ( err, res ) {
		console.log( err, res );
	} );*/
	
	// Example User QuestionService
	QuestionService.findAllByTags( [ 'SF3' ], function ( questions ) {
		console.log( questions );
		
		res.render( 'index.ejs', { title: questions } );
	} );
	//res.render( 'index.ejs', { title: '' } );
	
	//res.redirect('/users/login');
} )

.get('/manager.html', function ( req, res ) {
	var students = [];

	QuestionService.findAll(function(questions) {
		console.log( 'questions' );
		console.log( questions );

		res.render('manager.ejs', { questions: questions } );
	 });
} )

	.post( '/:idQuestion/question', function ( req, res, next ) {
		var student = {
			name: req.body['name'],
			nickname: req.body['nickname'],
			salon: req.body['salon']
		};

		if ( typeof req.params.idQuestion === "undefined"
			|| typeof questions[ req.params.idQuestion ] === "undefined" )
			next();

		req.params[ 'student' ] = student;
		req.params[ 'question' ] = questions[ req.params.idQuestion ];

		res.render('question.ejs', req.params);
	} )

	.get( '/:idQuestion/resultat.html', function ( req, res ) {
		res.render( 'resultat.ejs', req.params );
	} );

module.exports = router;
