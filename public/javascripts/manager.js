var socket;
socket = io.connect('http://localhost:8000');

var data_question = [
  {"label" : "Réponse 1", "nb" : 0 },
  {"label" : "Réponse 2", "nb" : 0 },
  {"label" : "Réponse 3", "nb" : 0 },
  {"label" : "Réponse 4", "nb" : 0 }
]

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
    data_question[answerData.answerId].nb++;
    generatechart(data_question,".chart",".button-change");
}

function sendQuestion(evt) {
    socket.emit("displayQuestionById", $(evt.currentTarget).data('questionId'));
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
