const server = require('./server');
server;

const users = require('./controllers/users');
const chat = require('./controllers/chat');
const io = require('./socket');

io.on('connection', function(socket){

    socket.on("PLAYER_CONNECTED", function(username){
        users.onConnect(socket.id, username);
    })

    socket.on("SEND_MESSAGE", function(data){
        chat.onSend(data);
    })

    socket.on("OS_MESSAGE", function (data){
        chat.onSend(data);
    })

    socket.on("PLAYER_LIST", (callback) => {
        callback(users.getPlayerList());
    })

    socket.on('disconnect', () => {
        users.onDisconnect(socket.id);
    })
})