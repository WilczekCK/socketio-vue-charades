const express = require('express');
const app = express();

server = app.listen(3001, function(){
    console.log('server is running on port 3001')
});

let playerList = {};
const io = require('./socket');

io.on('connection', function(socket){
    playerList[socket.id] = { id: socket.id, username: undefined };

    console.log(`User ${socket.id} connected`)

    socket.on("PLAYER_CONNECTED", function(data){
        playerList[socket.id].username = data;

        io.emit("PLAYER_CONNECTED_INFO", data);
        io.emit("PLAYER_LIST_UPDATE");

        io.emit('SYSTEM_MESSAGE', {
            user: playerList[socket.id].username,
            text: `just joined! Say Hi to him :)`,
            role:'joined_info'
        })
    })

    socket.on("SEND_MESSAGE", function(data){
        io.emit("MESSAGE", data);
    })

    socket.on("OS_MESSAGE", function (data){
        io.emit("SYSTEM_MESSAGE", data);
    })

    socket.on("PLAYER_LIST", (callback) => {
        callback(playerList);
    })

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`)

        //Remove user from the array
        delete playerList[socket.id];
        io.emit("PLAYER_LIST_UPDATE");
    })
})