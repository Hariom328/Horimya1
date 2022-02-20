const { Client, Message, MessageEmbed } = require("discord.js")
const moment = require('moment');

module.exports = {
	name: 'server',
	aliases: ['serverinfo', 'member'],
	description: 'information about this server',
	execute(message, args) {
		const guild = message.guild;
		const embed = new MessageEmbed()
			.setTitle(message.guild.name)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setColor("RANDOM")
			.addField('General Info', [
				`ID: ${guild.id}`,
				`NAME: ${guild.name}`,
				`OWNER: ${guild.owner}`,
			])
			.addField('Counts', [
				`Role: ${guild.roles.cache.size} roles`,
				`Channels: ${guild.channels.cache.size} total`,
				`Emojis: ${guild.emojis.cache.size} (Regular: ${guild.emojis.cache.filter((e) => !e.animated).size}, Animated: ${guild.emojis.cache.filter((e) => e.animated).size})`,
			])
			.addField("Additional Information", [
				`Created: ${moment(guild.createdTimestamp).format("LT")}, ${moment(guild.createdTimestamp).format("LL")}, ${moment(guild.createdTimestamp).fromNow()}`,
				`Region: ${guild.region}`,
				`Boost Tier: ${guild.premiumTier ? `Tier ${guild.premiumTier}`: 'None'}`,
				`Boost Count: ${guild.premiumSubscriptionCount || "0"}`,
			]);
		message.channel.send(embed);
	},
};