var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

server.listen(9999, '25.69.121.252', () => {
    console.log(`Server listening on: ${server.address().address}:${server.address().port}`);
});

var players = {};

io.on('connection', (socket) => {
    socket.on('newPlayer', () => {
        // players[socket.id] = new players();
        // console.log(players);
    });

    socket.on('disconnect', () => {
        // delete players[socket.id];
        // console.log(players);
    });
});