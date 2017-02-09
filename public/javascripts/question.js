var socket;
socket = io.connect('http://localhost:8000');

var student = {
  name:      $("input[name='name']").val(),
  nickname:  $("input[name='nickname']").val(),
  salon:     $("input[name='salon']").val()
};

$(function() {
    $('div.question').css('display', 'none');
    $('input').attr('data-selected', 'false').click(switchSelectedValue(this));
});

function switchSelectedValue(element) {
    var element = $(element);
    if (element.data('selected') == 'true') {
        element.data('selected', 'false');
    } else {
        element.data('selected', 'true');
    }
}

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
        student: student
    });
});

function displayQuestionById(questionId) {
    $('div#'+questionId).css('display', "block");
}

// $('form').submit(function(e) {
//     e.preventDefault();
//     var formData = new FormData(this);
//     var answerId = formData.get('answers');
//
//     socket.emit('answerByQuestionId', {answerId: answerId});
// });
