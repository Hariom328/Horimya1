const { tictactoe } = require('nidhishpackage')

module.exports = {
	name: 'tictactoe',
	aliases: ['tictactoe', 'ttt'],
	description: 'Play a game of TicTacToe, please mention a person to play with',
	execute(message, args) {
        let user = message.mentions.members.first()
        if(!user) return message.channel.send('please mention someone to play against')
        let game = new tictactoe({
            message: message,
            player_two: user,
        });

	},
};