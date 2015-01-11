$(function(){
	var socket = io.connect();

	$('#button').click(function(){

		var message = $('#input').val();
		var name = $('#name').val();

		$('body').append('<p>' + name + ': ' + message + '</p>');
		socket.emit('message',{
			name: name,
			message: message
		});
	});

	socket.on('message',function(data){
		$('body').append('<p>' + data.name + ': ' + data.message + '</p>');
	});

	socket.on('online',function(){
		$('body').append('<p>' + 'someone enters the room' + '</p>');
	});

	socket.on('offline',function(name){
		$('body').append('<p>' + name + ' left the room' + '</p>');
	});
});
