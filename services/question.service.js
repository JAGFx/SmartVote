/**
 * Created by SMITHE on 08-Feb-17.
 */

var mysql = require( '../services/mysql.service' );

exports.add = function ( question, callback ) {
	if ( typeof callback !== "function" )
		throw "The callback isn't a valid function.";
	
	var answers = question.answers;
	delete question.answers;
	question.tags = JSON.stringify( question.tags );
	
	mysql.insertEntity( 'question', question, function ( err, res ) {
		console.log( err, res );
		
		if ( !err ) {
			for ( var i in answers ) {
				var answer = answers[ i ];
				
				var questionAnswer = {
					question_id: res.insertId,
					answer_id:   answer.id,
					value:       answer.value
				};
				
				var ok = true;
				mysql.insertEntity( 'question_answer', questionAnswer, function ( err, res ) {
					console.log( err, res );
					
					if ( err )
						ok = false;
				} );
			}
			
		} else
			ok = false;
		
		callback( ok, res );
	} );
};
/*
 exports.remove = function ( question ) {
 if ( typeof question.id === "undefined" )
 throw "Invalid Student entity. ID dosen't exist";
 
 mysql.deleteEntity( table, question.id, function ( err, res ) {
 console.log( err, res );
 } );
 };
 
 exports.update = function ( question ) {
 var entity = prepareEntity( question );
 
 mysql.updateEntity( table, entity.mainObj, function ( err, res ) {
 console.log( err, res );
 } );
 };*/

exports.findOneByID = function ( id, callback ) {
	if ( typeof callback !== "function" )
		throw "The callback isn't a valid function.";
	
	var q = 'SELECT q.id AS qId, q.text AS qText, q.tags AS tags, a.id AS aId, a.text AS aText, qa.value FROM answers a JOIN question_answer  qa ON qa.answer_id = a.id JOIN question q ON qa.question_id = q.id WHERE q.id = ? ORDER BY q.id, a.id';
	
	mysql.find( q, [ id ], function ( err, res ) {
		//console.log( err, res );
		
		if ( err )
			throw err;
		
		callback( prepareEntity( res ) );
	} );
};

exports.findAll = function ( callback ) {
	if ( typeof callback !== "function" )
		throw "The callback isn't a valid function.";
	
	var q = 'SELECT q.id AS qId, q.text AS qText, q.tags AS tags, a.id AS aId, a.text AS aText, qa.value FROM answers a JOIN question_answer  qa ON qa.answer_id = a.id JOIN question q ON qa.question_id = q.id ORDER BY q.id, a.id';
	
	mysql.find( q, [], function ( err, res ) {
		
		//console.log( err, res );
		
		if ( err )
			throw err;
		
		
		callback( prepareEntity( res ) );
	} );
};

exports.findAllTags = function ( callback ) {
	if ( typeof callback !== "function" )
		throw "The callback isn't a valid function.";
	
	var q = 'SELECT q.tags FROM question q';
	
	mysql.find( q, [], function ( err, res ) {
		if ( err )
			throw err;
		
		var brutListTags = [];
		var finalListTags = [];
		
		// Build pre-tag array
		for ( var id in res ) {
			var row = res[ id ];
			
			if( JSON.parse( row.tags ) !== null )
				brutListTags = brutListTags.concat( JSON.parse( row.tags ) );
		}
		
		// Delete duplicate tag
		for ( var i = 0; i < brutListTags.length; ++i ) {
			if ( finalListTags.indexOf( brutListTags[ i ] ) == -1 )
				finalListTags.push( brutListTags[ i ] );
		}
		
		callback( finalListTags );
	} );
};

exports.findAllByTags = function ( tags, callback ) {
	if ( typeof callback !== "function" )
		throw "The callback isn't a valid function.";
	if ( !tags instanceof Array )
		throw "The tags isn't a valid Array.";
	
	var q = 'SELECT q.id AS qId, q.text AS qText, q.tags AS tags, a.id AS aId, a.text AS aText, qa.value FROM answers a JOIN question_answer  qa ON qa.answer_id = a.id JOIN question q ON qa.question_id = q.id WHERE JSON_CONTAINS( q.tags, ? ) = 1 ORDER BY q.id, a.id';
	
	mysql.find( q, [ JSON.stringify( tags ) ], function ( err, res ) {
		//console.log( err, res );
		
		if ( err )
			throw err;
		
		callback( prepareEntity( res ) );
	} );
};

var prepareEntity = function ( res ) {
	var questions       = [];
	var currentQuestion = {};
	var currentId       = undefined;
	var first           = true;
	
	for ( var id in res ) {
		var row = res[ id ];
		
		
		if ( currentId !== row.qId ) {
			if ( !first ) {
				questions.push( currentQuestion );
				currentId = undefined;
			}
			
			currentQuestion = {
				id:      row.qId,
				text:    row.qText,
				tags:    (row.tags)
						 ? JSON.parse( row.tags )
						 : [],
				answers: []
			};
			currentId       = currentQuestion.id;
			
			//console.log( '----------------------------------- INSIDE' , Object.keys( questions ).length > 0);
			
		}
		
		currentQuestion.answers.push( {
			id:    row.aId,
			text:  row.aText,
			value: row.value
		} );
		
		if ( first )
			first = false;
		
		//console.log( currentId, currentQuestion.id, row.qId, questions.length );//console.log( currentId !== currentQuestion.id , currentId, currentQuestion.id , row.qId, questions.length );
	}
	
	questions.push( currentQuestion );
	
	return questions;
};