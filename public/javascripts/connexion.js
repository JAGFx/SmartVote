var socket;
socket = io.connect('http://localhost:8000');

$( 'form' ).submit(function(e) {
    e.preventDefault();
    formData = new FormData(this);

    console.log('click sur connexion');
    var data = {
      name:      formData.get( 'name' ),
      nickname:  formData.get( 'firstname' ),
      salon:     formData.get( 'salon' )
    };
    socket.emit('newUser', data);
    window.location.replace('http://localhost:8000/0/question');
});
