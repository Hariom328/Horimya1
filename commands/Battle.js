const minigames = require('discord-minigames')

module.exports = {
	name: 'Battle',
	aliases: ['fight', 'battle', 'battel'],
	description: 'Fight Your Greatest Enemy, or a Friend',
	execute(message, args) {
		let member = message.mentions.members.first()
		if (!member || member.id === '727077691605647381') return message.reply(`\`Get on my Level if you wanna Play against me 😏 \n*Tag the person you wanna play against*\``)
		minigames.startBattle(member, message)
	},
}; 