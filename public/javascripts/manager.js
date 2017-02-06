var socket;
socket = io.connect('http://localhost:8000');

socket.on('newUser', receiveUserData);

function receiveUserData(data) {
  console.log(data);
  $('tbody').children().remove();
  for (var socketId in data) {
    student = data[socketId];
    var newLine = $('tbody').append('<tr>');
    newLine.append($('<td>').html(student.name))
           .append($('<td>').html(student.nickname))
           .append($('<td>').html(student.salon));
  }
}
