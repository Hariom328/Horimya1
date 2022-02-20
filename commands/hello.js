module.exports = {
	name: 'hello',
	aliases: ['soup', 'hi', 'hewwo', 'sup'],
	description: 'hello command',
	cooldown: 2,
	//args: true/false,
	//usage: '',
	//permission: '',
	// guildOnly: true/false,
	execute(message, args) {
		message.reply('Hello');
		console.log(message)
	},
};