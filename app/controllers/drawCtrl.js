'use strict';

angular.module('App').controller('drawCtrl', function ($scope) {
	//connect socket
	var socket = io.connect();
	//Check if canvas works on user's browser
	if(!('getContext' in document.createElement('canvas'))){
		alert('Sorry, it looks like your browser does not support canvas!');
		return false;
	}

	//Draw glyphicon color + color to draw with
	var color = '#000000';
	$scope.glyStyle = { 'color': '#000000'};
	$scope.newColor = function (newColor) {
		color = newColor;
		$scope.glyStyle = { 'color':newColor };
	};

	//Message handlers
	var messages = $('#msgBox');
	$scope.send = function (message) {
		if (message) {
			socket.emit('message', message);
			messages.append($('<li>').text(message));
			$scope.message = '';
		}
	};
	socket.on('message', function (message) {
		messages.append($('<li>').text(message));
	});


	$(document).ready(function() {
		
		var canvas = $('#board');
		var ctx = canvas[0].getContext('2d');
		var image = new Image();
		image.src = '../views/images/LoLMap.jpg';
		var chatbox = $('#chatbox');

		image.onload = function(){
			var width = ( ($(window).height() * 0.99) / image.height ) * image.width;
			var height = $(window).height() * 0.99;
			if (width > ($(window).width() * 0.75)) {
				width = $(window).width() * 0.75;
				height = $(window).height() * 0.75;
			}
			canvas.width(width);
			canvas.height(height);
			ctx.canvas.width = width;
			ctx.canvas.height = height;
			ctx.drawImage(image,0,0,width,height);
			chatbox.width($(window).width() - width - 10);

			$scope.clearBoard = function () {
				ctx.drawImage(image,0,0,width,height);
				socket.emit('reset');
			};

			socket.on('reset', function () {
				ctx.drawImage(image,0,0,width,height);
			});
		};

		var doc = $(document);

		var clients = {};
		var cursors = {};
		var drawing = false;
		var id = Math.round($.now()*Math.random());

		var prev = {};

		canvas.on('mousedown', function(e){
			e.preventDefault();
			drawing = true;
			prev.x = e.pageX;
			prev.y = e.pageY;
		});

		doc.bind('mouseup mouseleave',function(){
			drawing = false;
		});

		var lastEmit = $.now();

		doc.on('mousemove', function(e){
			if($.now() - lastEmit > 30){	
				socket.emit('mousemove',{
					'x': e.pageX,
					'y': e.pageY,
					'drawing': drawing,
					'color': color,
					'id': id
				});
				lastEmit = $.now();
			}

		// Draw a line for the current user's movement, as it is
		// not received in the socket.on('moving') event above
			if(drawing){
				drawLine(prev.x, prev.y, e.pageX, e.pageY, color);
				prev.x = e.pageX;
				prev.y = e.pageY;
			}
		});

		function drawLine(fromx, fromy, tox, toy, drawColor){
			ctx.beginPath();
			ctx.moveTo(fromx, fromy);
			ctx.lineTo(tox, toy);
			ctx.strokeStyle = drawColor;
			ctx.stroke();
			ctx.closePath();
		}

		socket.on('moving', function (data) {
			if(! (data.id in clients)){
				// a new user has come online. create a cursor for them
				cursors[data.id] = $('<div class="cursor">').appendTo('#cursors');
			}
			// Move the mouse pointer
			cursors[data.id].css({
				'left' : data.x,
				'top' : data.y
			});
			// Is the user drawing?
			if(data.drawing && clients[data.id]){
				// Draw a line on the canvas. clients[data.id] holds
				// the previous position of this user's mouse pointer
				drawLine(clients[data.id].x, clients[data.id].y, data.x, data.y, data.color);
			}
			// Saving the current client state
			clients[data.id] = data;
			clients[data.id].updated = $.now();
		});

	});

});