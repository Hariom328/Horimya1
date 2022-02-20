const { prefix } = require('../config.json');
const Discord = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
    aliases: ['commands', 'help', 'h'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
        const data = [];
        const { commands } = message.client;
        const roleColor =
        message.guild.me.displayHexColor === "#000000"
            ? "#ffffff"
            : message.guild.me.displayHexColor;

        if (!args.length) {
            const title = 'Here\'s a list of all my commands:';
            const description = data.push(commands.map(command => command.name).join('\n'));
            const footer = `You can send ${prefix}help [command name] to get info on a specific command!`;
                const helpEmbed = new Discord.MessageEmbed()
                .setColor(roleColor)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle("📬 Need help? Here are all of my commands:")
                .setDescription(`Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help gtp\`.`)
                .addField('Commands', '```' + data + '```')
                .addField("Wanna Invite me to Your Own Server?", 'Link :- https://discord.com/api/oauth2/authorize?client_id=727077691605647381&permissions=261421985009&scope=bot')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }));
            return message.channel.send(helpEmbed)

        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('NO NO!')
                .setDescription("\`The Commands you are trying to gain help for isn't valid\`")
                .setFooter(`Requested by ${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp();
	        return message.channel.send(embed);
        }

        const embed = new Discord.MessageEmbed()
            .setTitle("Command Details:")
            .addField("PREFIX:", `\`${prefix}\``)
            .addField(
            "COMMAND:",
            command.name ? `\`${command.name}\`` : "No name for this command."
            )
            .addField(
            "ALIASES:",
            command.aliases
                ? `\`${command.aliases.join("` `")}\``
                : "No aliases for this command."
            )
            .addField(
            "USAGE:",
            command.usage
                ? `\`${prefix}${command.name} ${command.usage}\``
                : `\`${prefix}${command.name}\``
            )
            .addField(
            "DESCRIPTION:",
            command.description
                ? command.description
                : "No description for this command."
            )
            .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()
            .setColor(roleColor);
        return message.channel.send(embed);
    }
};