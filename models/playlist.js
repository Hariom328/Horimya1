const mongoose  = require('mongoose');

let Schema = new mongoose.Schema({
        Id: String,
        UserName: String,
        Playlist1: String,
        Playlist2: String,
        Playlist3: String,
        Playlist4: String,
        Playlist5: String
})

module.exports = mongoose.model('playlist', Schema)