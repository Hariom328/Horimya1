const moneySchema = require('../models/money');

module.exports = {
	name: 'removemoney',
	aliases: ['remove', 'removemoney'],
	description: 'hello command',
	cooldown: 2,
	args: true,
	usage: '<amount of money> (all data will be deleted on release)',
	//permission: '',
	// guildOnly: true/false,
	async execute(message, args) {
		const member = message.mentions.members.first() || message.author.id;
		const res = parseInt(args[0])

		moneySchema.findOne({ Id: member }, async(err, data) =>{
			if(err) throw err;
			if(data && data.Coins <= res) {
				data.Coins -= res
				message.channel.send('``` removed balance:- ' + res + ' coins. ```');
			} else {
				data = new moneySchema ({
					Id: message.author.id,
					UserName: message.author.username,
					Coins: -res
				})
				console.log(`no data, data created`);
			}
			data.save();
		})
	},
};