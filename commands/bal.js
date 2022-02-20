const moneySchema = require('../models/money');
const Discord = require('discord.js');

module.exports = {
	name: 'bal',
	aliases: ['bal', 'balance'],
	description: 'hello command',
	cooldown: 2,
	args: false,
	usage: '<amount of money> (all data will be deleted on release)',
	//permission: '',
	// guildOnly: true/false,
	async execute(message, args) {
		let user = message.mentions.members.first() || message.author;
		moneySchema.findOne({ Id: user.id }, async(err, data) =>{
            if(err) throw err;
            if(data){
                cash = data.Coins;
				let embed1 = new Discord.MessageEmbed()
					.setColor("GREEN")
					.setAuthor('Soup', 'https://cdn.discordapp.com/avatars/727077691605647381/58be8d0e89671f764141cff2c43df489.png?size=256')
					.addField("Balance", [
						'```Account ID :- ' + user + '\nMoney :- ' + cash + '```'
					])
					.setTimestamp()
				message.channel.send(embed1);
                console.log(cash + ` coins`);
            } else {
                message.channel.send(`You're Poor \n use add money command`);
            }
		})
	},
};