module.exports = function Sockets(io) {
	console.log('Sockets starting...');

	io.on('connection', function (socket) {
  		//socket.emit('news', { hello: 'world' });
  		//socket.on('my other event', function (data) {
    	console.log('A new user joined!');
		// Start listening for mouse move events
		socket.on('mousemove', function (data) {
			// This line sends the event (broadcasts it)
			// to everyone except the originating client.
			socket.broadcast.emit('moving', data);
		});
		socket.on('reset', function () {
			socket.broadcast.emit('reset');
		});
		socket.on('message', function (message) {
			socket.broadcast.emit('message', message)
		});
  	});

};