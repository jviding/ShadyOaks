var express = require('express');
var app = express();
var http = require('http');
var httpServer = http.Server(app);
var port = process.env.PORT || 3002;
//var passport = require('passport');
var morgan = require('morgan');
//var mongoose = require('mongoose');
//var configDB = require('./config/database');
var io = require('socket.io').listen(httpServer);
var sockets = require('./sockets');

//configuration
//require('./config/passport')(passport);
//mongoose.connect(configDB.url); //connect to database 

//set up express application
app.use(morgan('dev')); //log every request to console
app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'))

//for passport
//app.use(passport.initialize());
//app.use(passport.session()); //persistent login sessions

//routes
//require('./app/routes')(app, passport);
app.get('/', function(req, res){
  res.redirect('/index.html');
});


//launch
httpServer.listen(port, function() {
	console.log('Server listening on port:' + port);
});

//start socket.io
sockets(io);