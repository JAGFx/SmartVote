var express   = require( 'express' );
var router    = express.Router();
var QuestionService = require( '../services/question.service.js' );

/* GET home page. */
router
	.get( '/', function ( req, res ) {
		QuestionService.findAllByTags( [ 'SF3' ], function ( questions ) {
			res.render( 'index.ejs', { title: questions } );
		} );

		res.redirect( '/users/login' );
	} )

	.get( '/debug', function ( req, res ) {
		var question = {
			text:    'Question test',
			tags:    [ 'tag1', 'tag2' ],
			answers: [
				{
					id:    1,
					text:  'Oui',
					value: true
				},
				{
					id:    2,
					text:  'Non',
					value: true
				}
			]
		};

		QuestionService.add( question );
	} )

	.get('/manager.html', function ( req, res ) {
		QuestionService.findAll(function(questions) {
			res.render('manager.ejs', { questions: questions } );
		});
	})

	.post( '/question', function ( req, res, next ) {
		var student = {
			name:     req.body['name'],
			nickname: req.body['nickname'],
			salon:    req.body['salon']
		};

		QuestionService.findAll(function(questions) {
			req.params[ 'student' ] = student;
			req.params['questions'] = questions;

			res.render('question.ejs', req.params);
		});
	})

	.get( '/resultat.html', function ( req, res ) {
		res.render( 'resultat.ejs', req.params );
	});

module.exports = router;
