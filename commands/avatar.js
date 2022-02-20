module.exports = {
	name: 'avatar',
	aliases: ['avatar','pfp','profile','profilepic'],
	description: 'shows said user avatar',
	execute(message, args) {
		if(args[0]){
			let user = message.mentions.users.first();
			message.channel.send(user.avatarURL({ format: 'png', size: 4096, dynamic : true })).catch(console.error);
		} else {
			message.channel.send(message.author.displayAvatarURL({ format: 'png', size: 4096, dynamic : true})).catch(console.error);
		}
	},
};