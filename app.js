var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket = require('socket.io');

var app = express();
var server = app.listen(8000);
var io = socket(server);

var index = require('./routes/index');
var users = require('./routes/users');

var managerSocket, projectorSocket;
var students = {};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));
app.use(express.static(path.join(__dirname, 'public/stylesheets')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// socket parts
io.sockets.on('connection', connection);

function connection(socket) {
    socket.on('studentConnection', addStudent);
    socket.on('managerConnection', newManager);
    socket.on('projectorConnection', newProjector);
    socket.on('kickUser', redirect);
    socket.on('answer', sendAnswer);
    socket.on('displayQuestionById', sendQuestionId);

    function addStudent(student) {
        students[socket.id] = student;
        socket.broadcast.emit('students', students);
    }

    function newManager() { managerSocket = socket; }

    function newProjector() { projectorSocket = socket; }

    function redirect(socketId) {
        var client = io.sockets.connected[socketId];
        delete(students[socketId]);
        client.emit('redirect', '/');
    }

    function sendAnswer(data) {
        data.socketId = getSocketIdFromData(data);
        socket.broadcast.emit('studentAnswer', data);
    }

    function sendQuestionId(questionId) {
        socket.broadcast.emit("receiveQuestionId", questionId);
    }

    function getSocketIdFromData(data) {
        for (socketId in students) {
            student = students[socketId];
            if (student.name == data.student.name &&
                student.nickname == data.student.nickname &&
                student.salon == data.student.salon) {

                return socketId;
            }
        }

        return false;
    }
}

module.exports = app;
