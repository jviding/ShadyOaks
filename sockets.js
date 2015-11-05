var HashTable = require('hashtable');
var hashtable = new HashTable();

module.exports = function Sockets(io) {
	console.log('Sockets starting...');

	io.on('connection', function (socket) {
		socket.on('mousemove', function (data) {
			socket.broadcast.emit('moving', data);
		});
		socket.on('reset', function () {
			socket.broadcast.emit('reset');
		});
		socket.on('message', function (message) {
			socket.broadcast.emit('message', message);
		});
		socket.on('new user', function (username) {
			socket.broadcast.emit('new user', username);
			hashtable.forEach(function (key, value) {
				socket.emit('new user', value);
			});
			hashtable.put(socket.id, username);
		});
		socket.on('disconnect', function () {
			socket.broadcast.emit('user left', hashtable.get(socket.id));
			hashtable.remove(socket.id);
		});
  	});

};