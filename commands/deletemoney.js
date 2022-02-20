const moneySchema = require('../models/money');

module.exports = {

	name: 'deletemoney',

	aliases: ['resetmoney'],

	description: 'Deletes all money data',

	cooldown: 100,

	args: false,

	//usage: '',

	//permission: 'ADMINISTRATOR',

	guildOnly: true,

	async execute(message, args) {
        await moneySchema.findOneAndDelete({ Id: message.author.id })
        message.channel.send(`All money has been wiped from your account`)
	},

};