const prefixSchema = require('../models/prefix');

module.exports = {

	name: 'setprefix',

	aliases: ['setprefix', 'prefix', 'prefixchange', 'serverprefix'],

	description: 'Set different prefix of the Bot(Server Specific)',

	cooldown: 50,

	args: true,

	usage: '<Prefix you would like to set>',

	permission: 'ADMINISTRATOR',

	guildOnly: true,

	async execute(message, args) {
        const res = args.join(" ");
        if(!res) return message.channel.send(`please specify the prefix you would like to set`);
        if(res === '*'){
            await prefixSchema.findOneAndDelete({ Guild: message.guild.id })
            return message.channel.send(`The prefix has been reset to **${res}**`)
        }

        prefixSchema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if (data) {
                await prefixSchema.findOneAndDelete({Guild: message.guild.id})
                data = new prefixSchema({
                    Guild: message.guild.id,
                    Prefix: res,
                    GuildName: message.guild.name
                })
                data.save()
                message.channel.send(`Prefix has Been Updated to **${res}**`);
            } else {
                data = new prefixSchema({
                    Guild: message.guild.id,
                    Prefix: res,
                    GuildName: message.guild.name
                })
                data.save()
                message.channel.send(`Prefix has Been Set to **${res}**`);
            }
        })
	},

};