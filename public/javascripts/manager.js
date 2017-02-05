var socket;
socket = io.connect('http://localhost:8000');

socket.on('newUser', receiveUserData);

function receiveUserData(data) {
  console.log(data);
  $('p').html(data.name);
}
