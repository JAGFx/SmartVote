var socket;
socket = io.connect('http://localhost:8000');

var student = {
  name:      $("input[name='name']").val(),
  nickname:  $("input[name='nickname']").val(),
  salon:     $("input[name='salon']").val()
};

$(function() {
    $('div.question').css('display', 'none');
});

socket.emit('newStudentConnection', student);

socket.on('redirect', function(destination) {
    window.location.href = destination;
});
socket.on('receiveQuestionId', displayQuestionById);

$('form').submit(function(e) {
    e.preventDefault();
    var buttonChecked = $("input[type=radio]:checked");

    socket.emit('answer', {
        answerId : buttonChecked.val(),
        questionId: buttonChecked.attr('name'),
        student: student
    });
});

function displayQuestionById(questionId) {
    $('div#'+questionId).css('display', "block");
}
