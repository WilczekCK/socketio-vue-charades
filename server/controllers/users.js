const io = require('../socket');

class User{
    constructor(id, username, points){
        this.id = id;
        this.username = username;
        this.points = points;
    }
}

let onlineList = [];
const userIO = {
    User: (id, username, points) => new User(id, username, points),
    onConnect: (id, username) => {
        onlineList = [...onlineList, new User(id, username, 0)];

        io.emit('SYSTEM_MESSAGE', {
            user: username,
            text: `just joined! Say Hi to him :)`,
            role:'joined_info'
        })

        io.emit("PLAYER_CONNECTED_INFO", username);
        io.emit("PLAYER_LIST_UPDATE");

    },
    onDisconnect: (id) => {
        console.log(`User ${id} disconnected`)
        
        io.emit("PLAYER_LIST_UPDATE");

        onlineList = onlineList.filter(function(player) {
            return player.id !== id;
        })

        console.log(onlineList)
    }
}

module.exports = userIO;