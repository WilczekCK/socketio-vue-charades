const express = require('express');
const app = express();
const playerList = [];

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
    console.log(`User ${socket.id} connected`)
    let actualConnected = socket.id;
    playerList.push(actualConnected);

    socket.on("SEND_MESSAGE", function(data){
        io.emit("MESSAGE", data);
    })


    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`)

        //Remove user from the array
        playerList = playerList.filter(function(player){
            return player.id !== socket.id
        })
    })
})
