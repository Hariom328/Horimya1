const Discord = require("discord.js");

module.exports = {
	name: 'role',
	aliases: ['role', 'roleadd'],
	description: 'give a role',
	args: true,
	usage: '${give/remove} <user>, I will ask for which role to give after that',
	permission: 'MANAGE_ROLES',
	guildOnly: true,
	
	execute(message, args) {
		var guild = message.guild;
		if(!guild.me.hasPermission("MANAGE_ROLES")){
			message.channel.send(` I do not have **MANAGE ROLES** permission \nPlease set my role above the "User" you want me to give role to`)
			
		} else{
		const rolegiver = message.member;
		if(message.member.hasPermission("MANAGE_ROLES")){
			if(args[0] === "give"){
				const member = message.mentions.members.first();

				let filter = m => m.author.id === message.author.id
				message.channel.send(`Which role do you want to give \nPlease write specifc name`).then(() => {
				message.channel.awaitMessages(filter, {
					max: 1,
					time: 30000,
					errors: ['time']
					})
					.then(message => {
					message = message.first()

						let role = message.guild.roles.cache.find(r => r.name === message.content);
						let guild = message.guild
		
						if(!member){
							var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});//random color for embed
							const embed = new Discord.MessageEmbed()//embed reply
								.setColor(randomColor)
								.setTitle(`PLEASE MENTION`)
								.setDescription(`PLEASE MENTION THE PERSON WHOM TO GIVE ROLE ${rolegiver}`)
							message.channel.send(embed);
						} else {
							member.roles.add(role);
							var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});//random color for embed
							const embed = new Discord.MessageEmbed()//embed reply
								.setColor(randomColor)
								.setTitle(`ROLE SUCCESSFULLY GIVEN`)
								.setDescription(`ROLE SUCCESSFULLY GIVEN TO ${member} BY ${rolegiver}`)
							message.channel.send(embed);
						}

					})
					.catch(collected => {
						message.channel.send('Timeout');
					});
				})


			} else if(args[0] === "remove"){
				
				const member = message.mentions.members.first();

				let filter = m => m.author.id === message.author.id
				message.channel.send(`Which role do you want to remove \n\`Please write specifc name\``).then(() => {
				message.channel.awaitMessages(filter, {
					max: 1,
					time: 30000,
					errors: ['time']
					})
					.then(message => {
					message = message.first()

						let role = message.guild.roles.cache.find(r => r.name === message.content);
						let guild = message.guild
		
						if(!member){
							var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});//random color for embed
							const embed = new Discord.MessageEmbed()//embed reply
								.setColor(randomColor)
								.setTitle(`PLEASE MENTION`)
								.setDescription(`PLEASE MENTION THE PERSON OF WHOM TO REMOVE ROLE ${rolegiver}`)
							message.channel.send(embed);
						} else {
							member.roles.remove(role);
		
							var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});//random color for embed
							const embed = new Discord.MessageEmbed()//embed reply
								.setColor(randomColor)
								.setTitle(`ROLE SUCCESSFULLY REMOVED`)
								.setDescription(`ROLE SUCCESSFULLY REMOVED OF ${member} BY ${rolegiver}`)
							message.channel.send(embed);
						}

					})
					.catch(collected => {
						message.channel.send('Timeout');
					});
				})

			}
		} else {
			message.reply("You do not have 'GIVE ROLES' permission of this server!")
		}
	}
	},
};