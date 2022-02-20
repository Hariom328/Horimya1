const Discord = require("discord.js");
const fetch = require('node-fetch');


module.exports = {
	name: 'meme',
	aliases: ['meme', 'yeet', 'makemelaugh'],
	description: 'show a random meme',
	execute(message, args) {

        fetch('https://meme-api.herokuapp.com/gimme')
            .then(res => res.json())
            .then(json => {
                var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
                const embed = new Discord.MessageEmbed()
                    .setColor(randomColor)
                    .setTitle(json.title)
                    .setImage(json.url)
                    .setFooter(`Link : ${json.postLink} | subreddit: ${json.subreddit}`)
                message.channel.send(embed)
                console.log(`soup :- meme sent | Link : ${json.postLink} | subreddit: ${json.subreddit}`)
            });
		
	},
};