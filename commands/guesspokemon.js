const { Pokemon } = require('djs-games')

module.exports = {
	name: 'guesspokemon',
	aliases: ['guesspokemon', 'guessthepokemon', 'gtp'],
	description: 'Whos That Pokemon',
	execute(message, args) {
		const game = new Pokemon({
		message: message,
		token: "MTYyNTcxNDM5NA.z5nQI9x4p802bSmShLmRqbkzUHEDARZi.a1f752a3d231ffe8", // Get Your Api Token at https://dagpi.xyz/dashboard
		})
		game.start()
	},
};