const { prefix } = require('../config.json');
const Discord = require('discord.js')

module.exports = {
	name: 'credits',
	aliases: ['creator', 'info', 'makerinfo', 'dev'],
	description: 'developer info',
	execute(message, args) {
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic : true}))
            .setColor("GREEN")
            .setDescription("```Hello Friend, \nMy Name Is Horimya. I am a Multipurpose Discord Bot Made by HariOm Mishra \nI have Abilitiy to do a lot of things \n\nTo get Started Please Tag me!```")
            .addField("Info:- ", [
                `Deveploper:- `,
                `Packages Used :- YtDl, Distube, reconlx, Discord.js, Snakecord, Djs-Minigames, Aki-api, Mongoose etc`,
                `Important Note:- This Bot is still underdevelopment, Please Note Try not to overwork this bot or it may crash or bug out, Please report to the Developer for any Bugs`,
            ])
        message.channel.send(embed);
	},
};