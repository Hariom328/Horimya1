module.exports = {
	name: 'nuclearcodes',
	aliases: ['codes','code','random', 'nuclear'],
	description: 'hackermans nuclear codes',
	execute(message, args) {
		message.reply('nuclear codes are:- ' + Math.random());
	},
};