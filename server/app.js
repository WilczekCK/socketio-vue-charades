const server = require('./server');
server;

const users = require('./controllers/users');
const io = require('./socket');

let playerList = {};
io.on('connection', function(socket){
    playerList[socket.id] = { id: socket.id, username: undefined };

    console.log(`User ${socket.id} connected`)

    socket.on("PLAYER_CONNECTED", function(username){
        playerList[socket.id].username = username;
        users.onConnect(socket.id, username);

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
        users.onDisconnect(socket.id);
    })
})