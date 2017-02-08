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

io.sockets.on('connection', newConnection);

function newConnection(socket) {

  socket.on('newStudentConnection', addStudent);
  socket.on('kickUser', redirect);
  socket.on('answer', sendAnswer)

  function addStudent(student) {
    students[socket.id] = student;

    socket.broadcast.emit('students', students);
  }

  function redirect(socketId) {
    var client = io.sockets.connected[socketId];
    var destination = '/';
    delete(students[socketId]);

    socket.broadcast.emit('students', students);
    client.emit('redirect', destination);
  }

  function sendAnswer(dataAnswer) {
    for (socketId in students) {
      student = students[socketId];
      if (student.name == dataAnswer.student.name &&
          student.nickname == dataAnswer.student.nickname &&
          student.salon == dataAnswer.student.salon) {
        dataAnswer.socketId = socketId;
        break;
      }
    }

    socket.broadcast.emit('studentAnswer', dataAnswer);
  }
}

module.exports = app;
