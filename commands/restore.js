const { fetchTranscript,timeout } = require("reconlx");
const Discord = require('discord.js')

module.exports = {
	name: 'restore',
	aliases: ['transcript', 'restoremessages', 'restoremessage', 'restore'],
	description: 'restore certain amount of messages',
	args: true,
	permission: 'ADMINISTRATOR',
	guildOnly: true,
	async execute(message, args) {
		var number = parseInt(args[0])
		if (number <= 99){
			fetchTranscript(message, number, true).then(async (data) => {
				const file = new Discord.MessageAttachment(data, "index.html");
				message.channel.send(`\`Please **Download** The File Below To see the Transcripted Messages\` \n||To delete the transcript, Please react to the Emoji||`)
				const messageToDelete = await message.channel.send(file);
				timeout(message, messageToDelete, 5000);
			});
		} else {
			message.channel.send(`Please keep the number of messages Under **100**`);
		}
	},
};