var socket;
socket = io.connect('http://localhost:8000');

socket.on('students', receiveStudentsData);
socket.on('studentAnswer', updateAnswerStatus);

function receiveStudentsData(studentsData) {
  console.log($('tbody'));
  $('tbody').children().remove();
  for (var socketId in studentsData) {
    student = studentsData[socketId];
    var newLine = $('<tr>');

    newLine.append($('<td>').html(student.name))
      .append($('<td>').html(student.nickname))
      .append($('<td>').html(student.salon))
      .append($('<td>').attr('data-socketId', socketId).html('En attente de réponse'))
      .append($('<td>')
        .append($('<button>').attr('id', socketId).html('Kick')
        .click(function() {
          socket.emit('kickUser', socketId);
        })
      ));

    $('tbody').append(newLine);
  }
}

function updateAnswerStatus(answerData) {
  $('td[data-socketId="'+answerData.socketId+'"]').html("A répondu");
}
