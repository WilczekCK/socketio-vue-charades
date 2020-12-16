const express = require('express');
const app = express();
let playerList = [];

server = app.listen(3001, function(){
    console.log('server is running on port 3001')
});

const io = require('socket.io')(server, {
    cors: {
        origins: "localhost:8081",
        methods: ["GET", "POST"]
    }
});


io.on('connection', function(socket){
    let actualConnected = {id: socket.id};
    playerList.push(actualConnected);
    console.log(`User ${socket.id} connected`)

    socket.on("PLAYER_CONNECTED", function(data){
        io.emit("PLAYER_CONNECTED_INFO", data);
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
        playerList = playerList.filter(function(player){
            return player.id !== socket.id
        })
    })
})
