const Discord = require("discord.js")

module.exports = {
	name: 'steal-emoji',
	aliases: ['steal-emoji', 'stealemoji', 'stealemojis', 'steal-emojis'],
	description: 'Steals an emoji from someother server and addes it to your server',
	cooldown: 5,
	args: true,
	usage: '<emoji>',
	permission: 'MANAGE_EMOJIS',
	guildOnly: true,
	execute(message, args) {
		const user = message.author;
        for (const emojis of args){
            const getEmoji = Discord.Util.parseEmoji(emojis);

            if(getEmoji.id){
                const extenstion = getEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${getEmoji.id + extenstion}`
                message.guild.emojis.create(url , getEmoji.name)
                    .then((emoji) => {
						let embed = new Discord.MessageEmbed()
							.setTitle(`Emoji Stolen Successfully`)
							.setAuthor(user.username , user.displayAvatarURL({ dynamic : true }))
							.setThumbnail(emoji.url)
							.setTimestamp()
							.setColor("GREEN")
						message.channel.send(embed);
						console.log(`ADDED: \`${emoji.url}\` to ${message.guild.id}`);
					})
            }
        }
	},
};