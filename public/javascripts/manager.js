var socket = io.connect('http://localhost:8000');
// var QuestionService = require( '../services/question.service.js' );

socket.emit('managerConnection');

var dataQuestion = [];

socket.on('students', receiveStudentsData);
socket.on('studentAnswer', updateAnswerStatus);

function receiveStudentsData(studentsData) {
  $('#table-students tbody').children().remove();
  for (var socketId in studentsData) {
    student = studentsData[socketId];
    var newLine = $('<tr>').attr('data-socketId', socketId);

    newLine.append($('<td>').html(student.name))
      .append($('<td>').html(student.nickname))
      .append($('<td>').html(student.salon))
      .append($('<td>').attr('data-socketId', socketId).html('En attente de réponse'))
      .append($('<td>')
        .append($('<button>').attr('id', socketId).html('Kick')
        .click(function() {
          socket.emit('kickUser', socketId);
          newLine.remove();
        })
      ));

    $('#table-students tbody').append(newLine);
  }
}

function updateAnswerStatus(answerData) {
    $('td[data-socketId="'+answerData.socketId+'"]').html("A répondu");
    dataQuestion[answerData.answerId].nb++;
    updateChart(dataQuestion);
}

function sendQuestion(evt) {
    var questionId = $(evt.currentTarget).data('questionId');
    var question = questions[questionId];
    initDataQuestion(question);
    updateChart(dataQuestion);
    socket.emit("displayQuestionById", questionId);
}

function initDataQuestion(question) {
    dataQuestion = [];
    for (var i in question.answers) {
        var answer = question.answers[i];
        dataQuestion.push({"label": answer.text, "nb": 0});
    }
    console.log(dataQuestion);
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function sendCharts() {
    socket.emit('sendChart', dataQuestion);
}

function addQuestion() {
    var formQuestion = $('#formQuestion');
    if (formQuestion.css('display') == 'none') {
        $('#formQuestion').css('display', 'block');
    } else {
        $('#formQuestion').css('display', 'none');
    }
}

function confirmAddQuestion() {
    var formQuestion = $('#formQuestion');
}

/*$('form').submit(function(event) {
    event.preventDefault();
    var formdata = new FormData($(this));
    var question, answer;
    answer.value = false;

    question.text = formdata.get(question);

    answer.text = formdata.get(response1);
    question.answers.push(answer);
    answer.text = formdata.get(response2);
    question.answers.push(answer);
    answer.text = formdata.get(response3);
    question.answers.push(answer);
    answer.text = formdata.get(response4);
    question.answers.push(answer);
    question.answers[formdata.response].value = true;

    question.tags.push(formdata.get(tags)) = formdata.get(tags);
});*/

// TODO: Dynamic add other answer
$.fn.questionsForm = function ( options ) {
	var params = $.extend( {
		dom: {
			question:   $( this ).find( '[data-qf="question"]' ),
			answers:    $( this ).find( '[data-qf="answers"]' ),
			tags:       $( this ).find( '[data-qf="tags"]' ),
			prototypes: {
				answer: $( this ).find( '[data-qf-prototype="answer"]' )
			}
		}
	}, options );
	
	
	
	
	/**
	 * ========================================================
	 * == Verification d'existance des éléments DOM NECESSAIRE
	 */
	
	
	if ( params.dom.question.length === 0 )
		throw "Invalid question element target. Please set the 'data-qf' attribut in question container.";
	
	if ( params.dom.answers.length === 0 )
		throw "Invalid answers element target. Please set the 'data-qf' attribut in answers container.";
	
	if ( params.dom.tags.length === 0 )
		throw "Invalid tags element target. Please set the 'data-qf' attribut in tags container.";
	
	if ( params.dom.prototypes.answer.length === 0 )
		throw "Invalid answer prototype element target. Please set the 'data-qf-prototype' attribut in answer prototype container.";
	
	
	return $( this ).each( function () {
		var $this = $( this );
		
		$this.indexes = {
			last: 0,
			list: []
		};
		
		
		
		
		/**
		 * ========================================================
		 * == Plug-in
		 */
		
		
		/**
		 * Initialise le plugin
		 */
		$this.init = function () {
			$.each( params.dom.prototypes, function ( key, value ) {
				value.hide();
			} );
			
			$this.addAnswer();
			
			$( '<button type="button">-</button>' )
				.click( $this.removeAnswer )
				.prependTo( params.dom.answers );
			
			$( '<button type="button">+</button>' )
				.click( $this.addAnswer )
				.prependTo( params.dom.answers );
		};
		
		
		/**
		 * Ajoute une réponse au conteneur de réponse
		 */
		$this.addAnswer = function () {
			console.log( 'INSIDE -- ADD' );
			
			$this.indexes.list.push( ++$this.indexes.last );
			console.log( $this.indexes );
			
			var domNewAnswer = preparePrototype(
				params.dom.prototypes.answer.html(),
				{ index: $this.indexes.last }
			);
			
			params.dom.answers.append( domNewAnswer );
		};
		
		
		/**
		 * Supprime une réponse du conteneur de réponse
		 */
		$this.removeAnswer = function () {
			console.log( 'INSIDE -- REMOVE' );
			
			if ( $this.indexes.list.length > 0 ) {
				var $currentAnswer = $( this );
				var indexToRemove  = $currentAnswer.parent().data( 'qf-index-answer' )
					|| $this.indexes.list[ $this.indexes.list.length - 1 ];
				
				$this.indexes.list.splice( $this.indexes.list.indexOf( indexToRemove ), 1 );
				params.dom.answers
					.find( '[data-qf-index-answer="' + indexToRemove + '"]' )
					.remove();
				
			} else
				console.warn( 'Unauthorized action. Empty indexes list' );
			
			//console.log("It's me !!", indexToRemove, $this.indexes );
		};
		
		$this.init();
		
		
		
		/**
		 * ========================================================
		 * == Evènements
		 */
		
		
		/**
		 * A l'envoi du formulaire - Traite et ajoute une nouvelle question en BDD
		 */
		$this.submit( function ( e ) {
			e.preventDefault();
			
			var $thisSubmit = $( this );
			var formdata    = new FormData( $thisSubmit[ 0 ] );
			var indexes     = $this.indexes.list;
			var question    = formdata.get( 'question' );
			var tags        = formdata.get( 'tags' );
			var data        = {
				text:    question,
				tags:    tags.split( ',' ),
				answers: []
			};
			
			// Insert anwers
			for ( var i in indexes ) {
				var index  = indexes[ i ];
				var answer = parseInt( formdata.get( 'response' + index ) );
				var valid  = formdata.get( 'reponse' + index + 'Valide' ) === 'on';
				
				if ( !isNaN( answer ) )
					data.answers.push( {
						id:    answer,
						value: valid
					} );
				
				//console.log( 'Réponse ' + index, answer, valid );
			}
			
			console.log( 'END DATA', data );
			socket.emit( 'addQuestion', data );
			socket.on( 'feedbackAddQuestion', function ( okStatus ) {
				if ( okStatus ) {
					alert( 'Question ajouté' );
					$this.indexes.last = 1;
					$this.indexes.list.forEach( $this.removeAnswer );
					
					$thisSubmit[ 0 ].reset();
				} else
					alert( 'Impossible d\'ajouter la question' );
			} );
		} );
		
		
		/**
		 * Prépare le prototype avec les données passé en paramètres
		 *
		 * @param prototype Element (HTML) du prototype
		 * @param values Tableau associatif des données à remplacer par leur valeur
		 * @returns {string} Element (HTML) préparé
		 */
		function preparePrototype( prototype, values ) {
			$.each( values, function ( key, value ) {
				var regexp = new RegExp( '({{' + key + '}})', 'gim' );
				prototype  = prototype.replace( regexp, value );
			} );
			
			return prototype;
		}
		
		
		params.dom.answers.on( 'click', '[data-qf-event="remove"]', $this.removeAnswer );
	} );
};

$( 'form#addQuestionForm' ).questionsForm();