'use strict';

angular.module('App').controller('drawCtrl', function ($scope) {
	//connect socket
	var socket = io.connect();
	socket.emit('hay', 'teksti');
	//Check if canvas works on user's browser
	if(!('getContext' in document.createElement('canvas'))){
		alert('Sorry, it looks like your browser does not support canvas!');
		return false;
	}

	$(document).ready(function() {
		
		var canvas = $('#board');
		var width = $(window).width() * 0.75; 
		var height = $(window).height();
		canvas.width(width);
		canvas.height(height);
		var ctx = canvas[0].getContext('2d');
		ctx.canvas.width = width;
		ctx.canvas.height = height;
		var image = new Image();
		image.src = '../views/images/LoLMap.jpg';
		image.onload = function(){
			ctx.drawImage(image,0,0,width,height);
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
					'id': id
				});
				lastEmit = $.now();
			}

		// Draw a line for the current user's movement, as it is
		// not received in the socket.on('moving') event above
			if(drawing){
				drawLine(prev.x, prev.y, e.pageX, e.pageY);
				prev.x = e.pageX;
				prev.y = e.pageY;
			}
		});

		function drawLine(fromx, fromy, tox, toy){
			ctx.moveTo(fromx, fromy);
			ctx.lineTo(tox, toy);
			ctx.stroke();
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
				drawLine(clients[data.id].x, clients[data.id].y, data.x, data.y);
			}
			// Saving the current client state
			clients[data.id] = data;
			clients[data.id].updated = $.now();
		});

	});

});