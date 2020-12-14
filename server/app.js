const express = require('express');
const app = express();

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
    let actualConnected = socket.id;

    socket.on("SEND_MESSAGE", function(data){
        io.emit("MESSAGE", data);
    })
})