const Discord = require("discord.js");
const ms = require("ms")
const auth = require('../auth.json');
const owner = auth.ownerid;
module.exports.run = async function(bot, message, args) {
    message.delete().catch(O_o => {})
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mUser) return message.channel.send("Couldn't find user.");
    if (!message.member.hasPermission("MANAGE_ROLES")  && message.author.id != owner) return message.channel.send("Sorry you don't have permission");
    let muterole = message.guild.roles.find(`name`, `muted`);

    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name:"muted",
                color:"#000000",
                permissions:[]
            })
            message.guild.channels.forEach(async function(channel, id){
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    let mutetime = args[1];
    if(!mutetime || parseFloat(mutetime) == NaN) return message.reply("You either didn't specify a time or the time was invalid.") 
    await(mUser.addRole(muterole.id));
    let mReason = args.slice(1).join(" ").slice(22) || "None Given";
    let muted = message.guild.roles.find("name", "Muted");
    let muteEmbed = new Discord.RichEmbed()
        .setDescription("Mutes")
        .setColor("#ffff07")
        .addField("Muted User", `${mUser.user.username} with ID: ${mUser.id}`)
        .addField("Muted By", `${message.author.username} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Muted At", message.createdAt)
        .addField("Time", mutetime)
        .addField("reason", mReason);
    setTimeout(function(){
        mUser.removeRole(muterole.id);
    }, ms(mutetime));
    let muteschannel = message.guild.channels.find('name', 'modlogs');
    if (!muteschannel) return message.channel.send("Couldn't find modlogs channel.");
    muteschannel.send(muteEmbed);
}

module.exports.help = {
    name: "mute"
}