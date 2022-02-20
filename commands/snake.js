// const SnakeGame = require('snakecord');
// const snakeGame = new SnakeGame({
//     title: 'Snake Game',
//     color: "GREEN",
//     timestamp: false,
//     gameOverTitle: "Game Over"
// });
const nidhish = require('nidhishpackage');
module.exports = {
	name: 'snake',
	aliases: ['snake', 'playsnake'],
	description: 'Snake game Built right in UwU',
	execute(message, args) {
        const SnakeGame = new nidhish.SnakeGame()
        SnakeGame.startGame(message)
	},
};