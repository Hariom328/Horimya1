const mongoose  = require('mongoose');

let Schema = new mongoose.Schema({
    PlayerID: String,
    PlayerName: String,
    PlayerScore: String,
})

module.exports = mongoose.model('leaderboards', Schema)