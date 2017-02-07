var socket;
socket = io.connect('http://localhost:8000');

socket.on('students', receiveStudentsData);

function receiveStudentsData(studentsData) {
  console.log(studentsData);
  $('tbody').children().remove();
  for (var socketId in studentsData) {
    student = studentsData[socketId];
    var newLine = $('<tr>');

    newLine.append($('<td>').html(student.name))
      .append($('<td>').html(student.nickname))
      .append($('<td>').html(student.salon))
      .append($('<td>')
        .append($('<button>').attr('id', socketId).html('Kick')
        .click(function() {
          socket.emit('kickUser', socketId);
        })
      ));

    $('tbody').append(newLine);
  }
}
