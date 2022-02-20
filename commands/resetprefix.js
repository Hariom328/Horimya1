const prefixSchema = require('../models/prefix');
const { prefix } = require('../config.json');

module.exports = {

	name: 'resetprefix',

	aliases: ['resetprefix', 'prefixreset'],

	description: 'Set Default prefix of the Bot(Server Specific)',

	cooldown: 100,

	args: false,

	usage: '<Prefix you would like to set>',

	permission: 'ADMINISTRATOR',

	guildOnly: true,

	async execute(message, args) {
        await prefixSchema.findOneAndDelete({ Guild: message.guild.id })
        message.channel.send(`The prefix has been reset to **${prefix}**`)
	},

};