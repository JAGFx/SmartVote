var socket;
socket = io.connect('http://localhost:8000');

$( 'form' ).submit(function(e) {
    // e.preventDefault();
    formData = new FormData(this);

    var data = {
      name:      formData.get('name'),
      nickname:  formData.get('nickname'),
      salon:     formData.get('salon'),
      socketId:  socket.id
    };
    socket.emit('newUser', data);

    return e;
});
