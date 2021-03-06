var express = require('express');
var http = require('http');
var path = require('path');
var io = require('socket.io');


var app = express();

app.use(express.static(path.join(__dirname,'./public')));

var server = http.createServer(app)
io = io.listen(server);
server.listen(4000);

io.sockets.on('connection', function (socket){
	console.log('someone is coming!');

	var name;
	socket.on('message',function(data){
		name = data.name;
		socket.broadcast.emit('message',data)
	});

	socket.on('disconnect',function(){
		socket.broadcast.emit('offline',name);
	});

	socket.broadcast.emit('online');


});