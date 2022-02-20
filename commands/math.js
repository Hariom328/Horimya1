var nerdamer = require('nerdamer'); 
require('nerdamer/Algebra'); 
require('nerdamer/Calculus'); 
require('nerdamer/Solve'); 
require('nerdamer/Extra');
const Discord = require("discord.js");

module.exports = {
	name: 'math',
	aliases: ['maths', 'math'],
	description: 'Maths with expression',
	cooldown: 10,
	//args: true/false,
	//usage: '',
	//permission: '',
	// guildOnly: true/false,
	execute(message, args) {
		if(!args[2]){
			if(args[0] === 'diff'  || args[0] === 'Differentiate'){
				var x = nerdamer(`diff(${args[1]}, x)`);
				var output = x.toString()
				message.channel.send(`Succesfully Differentiated:- ${args[1]}` + output)
			}
			else if(args[0] === 'inti' || args[0] === 'integrate'){
				var x = nerdamer(`integrate(${args[1]}, x)`);
				var output = x.toString()
				message.channel.send(`Succesfully integrate:- ${args[1]}` + output)
			}
			else if (args[0] === 'def_int' || args[0] === 'Definite_Integral'){
				var x = nerdamer(`defint(${args[1]}, 1, 2)`);
				var output = x.text()
				message.channel.send(`Succesfully Definite Integral:- ${args[1]}` + output)
			}
		} else {
			if(args[0] === 'diff'  || args[0] === 'Differentiate'){
				var x = nerdamer(`diff(${args[1]}, ${args[2]})`);
				var output = x.toString()
				message.channel.send(`Succesfully Differentiated ${args[1]}` + output)
			}
			else if(args[0] === 'inti' || args[0] === 'integrate'){
				var x = nerdamer(`integrate(${args[1]}, ${args[2]})`);
				var output = x.toString()
				message.channel.send(`Succesfully integrate ${args[1]}` + output)
			}
		}

	},
};