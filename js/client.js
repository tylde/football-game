var socket = io();

socket.emit('new-player');



socket.on('ondistconnect', () => {
    socket.emit('disconnected');
});