const server = require('./server');
server;

const users = require('./controllers/users');
const io = require('./socket');

let playerList = {};
io.on('connection', function(socket){
    playerList[socket.id] = { id: socket.id, username: undefined };

    console.log(`User ${socket.id} connected`)

    socket.on("PLAYER_CONNECTED", function(data){
        playerList[socket.id].username = data;
        users.onConnect(socket.id, data);

        io.emit("PLAYER_CONNECTED_INFO", data);
        io.emit("PLAYER_LIST_UPDATE");
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