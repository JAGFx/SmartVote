var express   = require( 'express' );
var router    = express.Router();
var mysql     = require( '../components/mysql_dao' );
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
	
	//res.render( 'index.ejs', { title: '' } );
	
	res.redirect('/users/login');
} )

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

		res.render('question.ejs', req.params);
	} )

	.get( '/:idQuestion/resultat.html', function ( req, res ) {
		res.render( 'resultat.ejs', req.params );
	} )

module.exports = router;
