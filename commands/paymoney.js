const moneySchema = require('../models/money');
const Discord = require('discord.js');

module.exports = {
	name: 'paymoney',
	aliases: ['pay', 'paymoney'],
	description: 'Pay Someone You Want',
	cooldown: 10,
	args: true,
	usage: '<tag the person> <amount of money> (all data will be deleted on release)',
	//permission: '',
	// guildOnly: true/false,
	async execute(message, args) {
		const member = message.mentions.members.first();
		if(member.id == message.author.id) return message.channel.send(`Don't Act Smart to me Nor try to Break me!`);
        if(!member) return message.channel.send(`Please specifiy the person you wanna give money to`);
		const res = parseInt(args[1]);
		if(!res) return message.channel.send(`Please Specify the Amount you Wanna Give`);
		let confirmation
		
		moneySchema.findOne({ Id: message.author.id }, async(err, data) =>{
			if(err) throw err;
			if(data && data.Coins >= res) {
				data.Coins -= res

				moneySchema.findOne({ Id: member.id }, async(err, data) =>{
					if(err) throw err;
					if(data && data.Coins >= 500) {
						data.Coins += res
						confirmation = 1
						console.log('added ' + res + 'coins To <@' + member.id + `>'s wallet`);
					} else {
						confirmation = 0
						message.channel.send('``` Needs atleast 500 coins in wallet to continue with payments ```')
					}
					data.save();
				})
				if(confirmation = 0){
					data.Coins += res
				} else {
					let embed1 = new Discord.MessageEmbed()
						.setColor("GREEN")
						.setAuthor(`Soup`, 'https://cdn.discordapp.com/avatars/727077691605647381/58be8d0e89671f764141cff2c43df489.png?size=256')
						.setDescription('Transaction Completed Successfully')
						.addField("Transaction Summary", [
							'``` Removed ' + res + 'coins from Account ID:- ' + message.author.id + ' wallet ```',
							'``` Added ' + res + 'coins to Account ID:- ' + member + ' wallet ```'
						])
					message.channel.send(embed1)
					console.log('removed ' + res + 'coins From <@' + message.author.id + `>'s wallet`);
				}
			} else {
				message.channel.send('``` You are Broke yourself, Earn something First ```')
			}
			data.save();
		})

	},
};