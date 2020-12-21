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
    onConnect: (id, data) => {
        onlineList = [...onlineList, new User(id, data, 0)];

        io.emit('SYSTEM_MESSAGE', {
            user: data,
            text: `just joined! Say Hi to him :)`,
            role:'joined_info'
        })

        io.emit("PLAYER_CONNECTED_INFO", data);
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