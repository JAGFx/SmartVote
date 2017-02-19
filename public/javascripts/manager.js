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

$('form').submit(function(event) {
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
});
