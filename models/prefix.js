const mongoose  = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: String,
    Prefix: String,
    GuildName: String,//newly added
})

module.exports = mongoose.model('prefix', Schema)