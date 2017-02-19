var socket = io.connect('http://localhost:8000');

var previousQuestionId = undefined;

var student = {
  name:      $("input[name='name']").val(),
  nickname:  $("input[name='nickname']").val(),
  salon:     $("input[name='salon']").val()
};

$(function() {
    $('div.question').css('display', 'none');
    $('input').attr('data-selected', 'false').click(switchSelectedValue(this));
});

function hiddenQuestionById(questionId){
    $('div#'+questionId).css('display', 'none');
}

function switchSelectedValue(element) {
    var element = $(element);
    if (element.data('selected') == 'true') {
        element.data('selected', 'false');
    } else {
        element.data('selected', 'true');
    }
}

socket.emit('studentConnection', student);

socket.on('redirect', redirection);
socket.on('receiveQuestionId', displayQuestionById);

function redirection (destination) { window.location.href = destination };

function displayQuestionById(questionId) {
    if (previousQuestionId != undefined) {
        hiddenQuestionById(previousQuestionId);
    }
    $('div#'+questionId).css('display', 'block');
    previousQuestionId = questionId;
}

$('form').submit(function(e) {
    e.preventDefault();
    var buttonChecked = $("input[type=radio]:checked");

    socket.emit('answer', {
        answerId : buttonChecked.val(),
        student: student
    });
});
