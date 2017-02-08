var socket;
socket = io.connect('http://localhost:8000');

var student = {
  name:      $("input[name='name']").val(),
  nickname:  $("input[name='nickname']").val(),
  salon:     $("input[name='salon']").val()
};

socket.emit('newStudentConnection', student);

socket.on('redirect', function(destination) {
    window.location.href = destination;
});

$('form').submit(function(e) {
  e.preventDefault();
  var buttonChecked = $("input[type=radio]:checked");

  console.log({
    answerId : buttonChecked.val(),
    questionId: buttonChecked.attr('name'),
    student: student
  });

  socket.emit('answer', {
    answerId : buttonChecked.val(),
    questionId: buttonChecked.attr('name'),
    student: student
  });
});
