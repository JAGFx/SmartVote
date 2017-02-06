var socket;
socket = io.connect('http://localhost:8000');

socket.on('kickStudentById', kick);

function kick(socketId) {
  console.log('socket.id = '+socket.id);
  console.log('socketId = '+socketId);
  if (socket.id == socketId) {
    window.location.replace('http://localhost:8000');
  }
}
