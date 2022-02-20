var fs = require("fs");
const react = require('./reactionstore.json');

module.exports = {
	name: 'reaction',
	aliases: ['r','react', 'reaction'],
	description: 'reaction test',
	execute(message, args) {

		

   if(args[0] === "simp"){
			message.channel.send("https://cdn.discordapp.com/attachments/739509968469884969/748160741843927120/image01.jpg")
		} else if (args[0] === "nou"){
			message.channel.send("https://tenor.com/view/reverse-uno-card-game-colorful-gif-16633402")
		} else if(args[0] === "ithinkso"){
			message.channel.send("https://tenor.com/view/yeah-ithink-so-robbie-amell-nathan-ithink-so-iagree-gif-17072106")
		} else if(args[0] === "loading"){
			message.channel.send("https://media.tenor.com/images/ad7ede2fa1078a8347b43c6d4c2a4b43/tenor.gif")
		} else if(args[0] === "yay"){
			message.channel.send("https://media.tenor.com/images/8cf38543eebff103df6f1ec2730a5bde/tenor.gif")
		} else if(args[0] === "punch"){
			message.channel.send("https://media.tenor.com/images/bef50761d75e855c95cb94139c8c292f/tenor.gif")
		} else if(args[0] === "stfu"){
			message.channel.send("https://media.tenor.com/images/a5a49125c87a23d61bda212c1a455dda/tenor.gif")
		}  else if(args[0] === "tfusay"){
			message.channel.send("https://cdn.discordapp.com/attachments/748413469715595305/748457583588802560/PicsArt_08-22-12.50.44.jpg")
		} else if(args[0] === "obanana"){
			message.channel.send("https://cdn.discordapp.com/attachments/748413469715595305/748474856433254440/image2.gif")
		} else if(args[0] === "kden"){
			message.channel.send("https://cdn.discordapp.com/attachments/748413469715595305/748475777485504522/IMG_20200710_025514.jpg")
		} else if(args[0] === "bored"){
			message.channel.send("https://tenor.com/view/buffy-chair-naughty-spinning-bored-buffy-gif-15214128")
		} else if(args[0] === "shutup"){
			message.channel.send("https://cdn.discordapp.com/attachments/739509968469884969/749153170189451284/2020-08-28.png")
		} else if(args[0] === "hmmm"){
			message.channel.send("https://cdn.discordapp.com/attachments/676050159641034757/749874217364750398/Screenshot_20200824-025505_Gallery.jpg")
		} else if(args[0] === "vapingcat"){
			message.channel.send("https://cdn.discordapp.com/attachments/739509968469884969/749897230265221120/unknown.png")
		} else if(args[0] === "hnnn"){
			message.channel.send("https://cdn.discordapp.com/attachments/703493557805383700/749898215297515551/Screenshot_2020-08-31-11-55-55-560_com.discord.png")
		} else if(args[0] === 'add'){
			console.log(react)
			message.reply('msg printed in console UwU')
		}
	},
};