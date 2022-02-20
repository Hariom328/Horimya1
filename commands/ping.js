module.exports={
    name:'ping',
    description: "check latency of bot",
    execute(message, args){
        message.channel.send(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms`);
    }
};