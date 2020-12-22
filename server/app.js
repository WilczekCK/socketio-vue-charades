const server = require('./server');
server;

const users = require('./controllers/users');
const chat = require('./controllers/chat');
const game = require('./controllers/game');

const io = require('./socket');

io.on('connection', function(socket){
    socket.on("PLAYER_CONNECTED", function(username){
        users.onConnect(socket.id, username);
        if(!game.isPlayerDrawing && users.getPlayerList().length > 1){
            game.rollPlayer();
        }
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

    socket.on("ROLL_PLAYER", () => {
        game.rollPlayer();
    })

    socket.on("LOAD_DRAWING_PLAYER", (callback) => {
        callback(game.drawingPlayer);
    })

    socket.on('disconnect', () => {
        users.onDisconnect(socket.id);
    })
})