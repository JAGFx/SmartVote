var socket;
socket = io.connect('http://localhost:8000');

var student = {
  name:      $("input[name='name']").attr('value'),
  nickname:  $("input[name='nickname']").attr('value'),
  salon:     $("input[name='salon']").attr('value')
};

console.log(student);
socket.emit('newStudentConnection', student);

socket.on('redirect', function(destination) {
    window.location.href = destination;
});
