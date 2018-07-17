const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
module.exports.run = async function(bot, message, args){
    message.delete().catch(O_o=>{});
    if(args == ""){
        return message.channel.send("What do you want me to say?");
    }else {
        var msg = "";
        for(var i = 0;i < args.length;i++){
            msg += args[i] + " ";
        }
        return message.channel.send(msg);
    }
}
module.exports.help = {
    name:"say"
}