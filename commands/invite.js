const Discord = require("discord.js");

module.exports = {
	name: 'invite',
	aliases: ['invite', 'join'],
	description: 'invite link',
	execute(message, args) {
		var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});//random color for embed
		const embed = new Discord.MessageEmbed()//embed reply
			.setColor(randomColor)
			.setTitle(`INVITE`)
			.setDescription(`My server invite link is :- https://discord.com/api/oauth2/authorize?client_id=944679787933339649&permissions=8&scope=bot`)
		message.channel.send(embed);
	},
};

// https://discord.com/api/oauth2/authorize?client_id=727077691605647381&permissions=261421985009&scope=bot