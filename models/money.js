const mongoose  = require('mongoose');

let Schema = new mongoose.Schema({
        Id: String,
        UserName: String,
        Coins: Number
})

module.exports = mongoose.model('money', Schema)