const djsGames = require('djs-games')
const RockPaperScissors = new djsGames.RockPaperScissors()

module.exports = {
	name: 'rockpaperscissors',
	aliases: ['rps', 'rockpaperscissor', 'rockpaperscissors', 'rockpapersiccors'],
	description: 'Play Rock Paper Scissor With someone Yout Tag',
	args: true,
	usage: '<person you wanna play against>',
	execute(message, args) {
        RockPaperScissors.startGame(message)
	},
};