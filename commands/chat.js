const Chatbot  =  require("discord-chatbot");

module.exports = {
	name: 'chat',
	aliases: ['chat'],
	description: 'chatting',
	cooldown: 2,
	//args: true/false,
	//usage: '',
	//permission: '',
	// guildOnly: true/false,
	execute(message, args) {
        const chatbot  =  new  Chatbot({name: "Udit", gender: "Male"});
        chatbot.chat(args[1]).then(response=>console.log(response)).catch(e => console.log(e));
	},
};