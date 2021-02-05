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

    socket.on('NEXT_ROUND', (force) => {
        console.log(game.isPlayerDrawing, users.getPlayerList().length)
        if(!game.isPlayerDrawing && users.getPlayerList().length > 1 || force){
            game.rollPlayer();
        }
    })

    socket.on('WORD_SELECTED', (word) => {
        game.startRound(word);
    })

    socket.on("SEND_MESSAGE", function(data){
        chat.onSend(data);
        game.checkIfWordIsProper(data, socket.id);
    })

    socket.on("OS_MESSAGE", function (data){
        chat.onSend(data);
    })

    socket.on("PLAYER_LIST", (callback) => {
        callback(users.getPlayerList());
    })

    socket.on("LOAD_DRAWING_PLAYER", (callback) => {
        callback(game.drawingPlayer);
    })

    socket.on("PLAYER_DRAW_ON_BLACKBOARD", function(data) {
        game.pushShapeToBlackboard(data);
    })

    socket.on("UPDATE_FE_BLACKBOARD", (callback) => {
        return;
    })

    socket.on('GET_BLACKBOARD_DATA', (callback) => {
        callback(game.blackboard)
    })

    socket.on('disconnect', () => {
        users.onDisconnect(socket.id);
        game.isDrawingPlayerOnline();
    })
})