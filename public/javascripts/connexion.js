console.log( "connexion aux sockets" );

var socket = io.connect( 'http://localhost:8000' );
socket.on( 'info', function ( message ) {
    console.log( 'Le serveur a un message pour vous :' + message.text + message.sessionId );
} );

$( 'form' ).submit( function ( e ) {
    e.preventDefault();
    formData = new FormData( this );

    console.log( 'click sur connexion' );
    socket.emit( 'request', {
        command: 'identify',
        data:    {
            name:      formData.get( 'name' ),
            firstname: formData.get( 'firstname' ),
            salon:     formData.get( 'salon' )
        }
    } );
} )