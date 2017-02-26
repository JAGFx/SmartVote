var socket = io.connect('http://localhost:8000');
// var QuestionService = require( '../services/question.service.js' );
var dataQuestion  = [];
var statusWaiting = 'En attente de réponse';
var statusOK      = 'A répondu';

socket.emit('managerConnection');


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
      .append($('<td>').attr('data-socketId', socketId).addClass('student-status badge info').html(statusWaiting))
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
    $('td[data-socketId="'+answerData.socketId+'"]')
        .removeClass('info')
        .addClass('success')
        .html(statusOK);
    dataQuestion[answerData.answerId].nb++;
    updateChart(dataQuestion);
}

function sendQuestion(evt) {
    var questionId = $(evt.currentTarget).data('questionId');
    var question = questions[questionId];
    initDataQuestion(question);
    updateChart(dataQuestion);
    initStudentsStatus();
    socket.emit("displayQuestionById", questionId);
}

function initStudentsStatus() {
    $('.student-status').removeClass('success').addClass('info').html(statusWaiting);
}

function initDataQuestion(question) {
    dataQuestion = [];
    for (var i in question.answers) {
        var answer = question.answers[i];
        dataQuestion.push({"label": answer.text, "nb": 0});
    }
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

// TODO: Dynamic add question in form
// TODO: Dynamic add other answer
$( 'form#addQuestionForm' ).submit( function ( e ) {
	e.preventDefault();

	var $this    = $( this );
	var formdata = new FormData( $this[ 0 ] );
	var indexs   = JSON.parse( formdata.get( 'indexs' ) );
	var question = formdata.get( 'question' );
	var tags     = formdata.get( 'tags' );
	var data     = {
		text:    question,
		tags:    tags.split( ',' ),
		answers: []
	};

	// Insert anwers
	for ( var i in indexs ) {
		var index  = indexs[ i ];
		var answer = parseInt( formdata.get( 'response' + index ) );
		var valid  = formdata.get( 'reponse' + index + 'Valide' ) === 'on';

		if (!isNaN( answer )) {
            data.answers.push( {id: answer, value: valid} );
        }
	}

	socket.emit( 'addQuestion', data );
	socket.on( 'feedbackAddQuestion', function ( okStatus ) {
		if ( okStatus ) {
			alert( 'Question ajouté' );
			$this[ 0 ].reset();

		} else
			alert( 'Impossible d\'ajouter la question' );
	} );
} );
