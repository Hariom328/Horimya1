const mongoose = require("mongoose");
const fs = require('fs');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const ytdl = require("ytdl-core");//ytdl-core
const DisTube = require('distube')
const package = require("@stuntstorm/discord-games");
const akinator = require("discord.js-akinator");
const prefixSchema = require('./models/prefix');
const Chatbot  =  require("discord-chatbot");

const client = new Discord.Client({ 
    restTimeOffset: 0
})
require('discord-buttons')(client)
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const { prefix, token, geniusToken, mongoDB_SRV } = require('./config.json');//get token & prefix from "config,json"

client.prefix = async function(message){
    let custom;

    const data = await prefixSchema.findOne({ Guild: message.guild.id })
        .catch(err => console.log(err))
    
    if(data) {
        custom = data.Prefix
    } else {
        custom = prefix;
    }
    return custom;
}

// Create a new DisTube
const distube = new DisTube(client, {
    searchSongs: 10, 
    emitNewSongOnly: true, 
    highWaterMark:  1<<25,
    youtubeDL: true,
    updateYoutubeDL: true,
    savePreviousSongs: true,
});
client.once('ready', () =>{
    console.log(`this bot is online ${client.user.tag}! ID:- ${client.user.id}`);
        let i = 0
    client.guilds.cache.forEach(guild => {
        i = i+1;
        console.log(i + `)  server name :- ${guild.name} | server id :- ${guild.id}`);
    })
    console.log(`total of ` + i + ` servers`);
    
    client.user.setPresence({
      activity: {
        name: 'Tag Me For Help :)',
        type: 0
      }
    });

})

client.on('guildCreate', (guild) => {
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if(channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) channelToSend = channel;
    });

    if(!channelToSend) return;

    channelToSend.send(
        new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
            .setDescription(`Thanks for inviting me`)
            .addField("Prefix:-", [
                "```My prefix For This Specific Server Is :- " + prefix + "\n\nTo Know More about what i can do, Please type " + prefix + "help to know about my Features \n\nNote :- Please not This Prefix is server specific so If there is another prefix assigned to this server I won't respond to my default prefix ```"
            ])
            .addField("My Invite link is:- ", [
                `https://discord.com/api/oauth2/authorize?client_id=944679787933339649&permissions=8&scope=bot`
            ])
            .setImage('https://memegenerator.net/img/instances/69558600/thank-you-from-the-bottom-of-my-heart.jpg')
            .setColor("GREEN")
            .setTimestamp()
    );
    console.log(`Soup has been added to ${message.guild.name}`);
})

client.on('message', async message=>{

    const p = await client.prefix(message)
    if (message.mentions.users.has(client.user.id) && !message.author.bot) {
        let embed = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setDescription(`Hello my friend, \n  I can see you have mentioned me \n\n`)
            .addField("Prefix:-", [
                "```My prefix For This Specific Server Is :- " + p + "\n\nTo Know More about what i can do, Please type " + p + "help to know about my Features \n\nNote :- This Prefix is server specific so If there is another prefix assigned to this server I won't respond to my default prefix ```"
            ])
            .addField("My Invite link is:- ", [
                `https://discord.com/api/oauth2/authorize?client_id=944679787933339649&permissions=8&scope=bot`
            ])
            .setImage('https://weneedfun.com/wp-content/uploads/2016/11/Funny-Thank-You-Pictures-6.jpg')
            .setColor("GREEN")
            .setTimestamp()
        return message.channel.send(embed);
    };

    if (message.content.startsWith(p) || message.author.id === client.user.id) {
      console.log(`server:-  ${message.guild.name} ; ${message.author.username} :- ` + message.content);
    }
    if (!message.content.startsWith(p) || message.author.bot) return;
    const args = message.content.slice(p.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName == "uptime"){
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        return message.channel.send(` **__Uptime:__** \n${days}D ${hours}H ${minutes}m ${seconds}s`);
    }

    
    if(commandName == "akinator" || commandName == "aki"){
        akinator(message, client, "en");//region will default to "en" if it's not specified!
    }

    if(commandName == "chess"){
        package.chess(message, client);
    }
    if(commandName == "pokernight" || commandName == "poker"){
        package.pokernight(message, client);
    }
    if(commandName == "fishington" || commandName == "fishing"){
        package.fishington(message, client);
    }
    if(commandName == "betrayal"){
        package.betrayal(message, client);
    }
    if(commandName == "youtube" || commandName == "yt"){
        package.youtube(message, client);
    }

//-----------
    // if (commandName == "play" || commandName == "p"){
    //     embedbuilder(client, message, "YELLOW", "Searching!", args.join(" "))
    //     return distube.play(message, args.join(" "));
    // }

    // if (commandName == "pause"){
    //     let queue = distube.getQueue(message);
    //     distube.pause(queue)
    //     message.channel.send("**Paused!**")
    // }

    // if (commandName == "resume"){
    //     let queue = distube.getQueue(message);
    //     distube.resume(queue)
    // }
    
    // if (commandName == "previous"){
    //     distube.previous(message);
    //     embedbuilder(client, message, "GREEN", "STARTED PREVIOUS SONG!", "")
    // }
 
    // if (commandName == "loop" || commandName == "repeat"){
    //     if(0 <= Number(args[0]) && Number(args[0]) <= 2){
    //         distube.setRepeatMode(message,parseInt(args[0]))
    //         embedbuilder(client, message, "GREEN", "Repeat mode set to:!", `${args[0].replace("0", "OFF").replace("1", "Repeat song").replace("2", "Repeat Queue")}`)
    //     }
    //     else{
    //         embedbuilder(client, message, "RED", "ERROR", `Please use a number between **0** and **2**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
    //     }
    // }

    // if (commandName == "volume"){
    //     if (Number(args[0])){
    //         embedbuilder(client, message, "GREEN", "VOLUME!", `changed volume to \`${args[0]}%\``)
    //         return distube.setVolume(message, args[0]);
    //     } else {
    //         embedbuilder(client, message, "RED", "VOLUME!", `Please Specify Volume in **Numbers**`)
    //     }
    // }


    // if (commandName == "stop" || commandName == "leave" || commandName == "fuckoff" || commandName == "sutup" || commandName == "dc") {
    //     embedbuilder(client, message, "RED", "STOPPED!", `Left the channel`)
    //     return distube.stop(message)
    // }

    // if (commandName == "skip" || commandName == "s"){
    //     embedbuilder(client, message, "YELLOW", "SKIPPED!", `Skipped the song`)
    //     return distube.skip(message);
    // }

    // if (commandName == "shuffle"){
    //     distube.shuffle(message);
    //     message.channel.send(`PlayList has been \`SHUFFLED\``);
    // }

    // if(commandName == "seek"){
    //     embedbuilder(client, message, "GREEN", "Seeked!", `seeked the song for \`${args[0]} seconds\``)
    //     return distube.seek(message, Number(args[0]*1000))
    //     .catch(err => message.channel.send(`**Please send the value in "seconds" **`))
    // } 

    // if ( commandName == "jump"){
    //     let queue = distube.getQueue(message);
    //     if(0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length){
    //         embedbuilder(client, message, "RED", "ERROR", `Jumped ${parseInt(args[0])} songs!`)
    //         return distube.jump(message, parseInt(args[0]))
    //         .catch(err => message.channel.send("Invalid song number."));
    //     }
    //     else{
    //         embedbuilder(client, message, "RED", "ERROR", `Please use a number between **0** and **${DisTube.getQueue(message).length}**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
    //     }
    // }

    // if (commandName == "autoplay" || commandName == "ap") {
    //     let mode = distube.toggleAutoplay(message);
    //     message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    // }

    // if (commandName === "playskip" || commandName === "skipplay"){
    //     distube.play(message, args.join(" "), { skip: true });
    // }

    // if (commandName === "queue" || commandName === "q"){
    //     let queue = distube.getQueue(message);
    //     let curqueue = queue.songs.map((song, id) =>
    //     `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
    //     ).slice(0, 10).join("\n");
    //     return  embedbuilder(client, message, "GREEN", "Current Queue!", curqueue)
    // }

    // if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(commandName)) {
    //     let filter = distube.setFilter(message, commandName);
    //     return embedbuilder(client, message, "YELLOW", "Adding filter!", filter)
    // }
       if (commandName == "play" || commandName == "p")
        distube.play(message, args.join(" "));

    if (["repeat", "loop"].includes(commandName))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (commandName == "stop" || commandName == "leave") {
        distube.stop(message);
        message.channel.send("Stopped the music!");
    }

    if (commandName == "skip")
        distube.skip(message);

    if (commandName == "shuffle")
        distube.shuffle(message);

    if (commandName == "jump")
        distube.jump(message, parseInt(args[0])).catch(err => message.channel.send("Invalid song number."));

    if (commandName == "queue" || commandName == "q") {
        let queue = distube.getQueue(message);
        if(!queue){
            message.channel.send("Nothing In Queue!");
            return;
        } else {
            message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
                `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
            ).slice(0, 10).join("\n"));
        }
    }

    if (commandName == "nowplaying" || commandName == "np"){
        let queue = distube.getQueue(message);
        if (!queue){
            message.channel.send(`Nothing is queued Right now! \n\`Please Join VoiceChat & use ***play {URL/Name_of_song}** to queue a song\`\n`);
        } else {
            message.channel.send(`Currently playing :- ` + queue.songs.map((song,id) => `\`${song.name}\``)).catch(err => message.channel.send("No Song Playing Currently!"));
        }
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(commandName)) {
        let filter = distube.setFilter(message, commandName);
        message.channel.send("Current queue filter: " + (filter || "Off"));
    }
//-------------------

    const command = client.commands.get(commandName)
   		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command)return;

    //guild only
    if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

    //permission
    if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}

    //ARGS
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${p}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

    //COOLDOWN
    const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
    timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    try {
	    command.execute(message, args);
    } catch (error) {
	    console.error(error);
	    message.reply('there was an error trying to execute that command!');
    }

})

//mongoDB---- "SoupDB"
mongoose.connect(mongoDB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() =>{
    console.log(`connected to soupDB`);
}).catch((err) => {
    console.log(err);
});

// Queue status template
//const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;


// DisTube event listeners, more in the documentation page
// distube.on("searchResult", (message, result) => {
//     let i = 0;
//     message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
// });
// distube.on("searchCancel", (message) => message.channel.send(`Searching canceled`));
// distube.on("playSong", (message, queue, song) => message.channel.send(
//     `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
// ));
// distube.on("playList", (message, queue, playlist, song) => message.channel.send(
//     `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
// ));
// distube.on("noRelated", message => message.channel.send("Can't find related video to play. Stop playing music."));
// distube.on("initQueue", queue => {
//     queue.autoplay = false;
//     queue.volume = 100;
// });
// distube.on("finish", message => message.channel.send("No more song in queue"));
// distube.on("error", (message, err) => message.channel.send(
//     "An error encountered: " + err
// ));
// distube.on("empty", message => message.channel.send("Channel is empty. Leaving the channel"))
// distube.on("addSong", (message, queue, song) => message.channel.send(
//     `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
// ));
// distube.on("addList", (message, queue, playlist) => message.channel.send(
//     `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
// ));
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        console.log("An error encountered: ");
    });

// function embedbuilder(client, message, color, title, description){
//     let embed = new Discord.MessageEmbed()
//     .setColor(color)
//     .setFooter(client.user.username, client.user.displayAvatarURL());
//     if(title) embed.setTitle(title);
//     if(description) embed.setDescription(description);
//     return message.channel.send(embed);
// }

client.login(token);