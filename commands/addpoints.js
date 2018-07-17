const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
const fs = require("fs")
let apoints = JSON.parse(fs.readFileSync(__dirname + "/../points.json"))
module.exports.run = async function(bot, message, args){
    message.delete().catch(O_o=>{})
    if(/*!message.member.roles.find("name","Founder") && */!message.author.id == owner) return "You have insufficient perms";
	let apUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!apUser) return message.channel.send("Couldn't find user.");
    if(!apoints[apUser.id + '']){
        apoints[apUser.id + ''] = {
            points: 0
        }
    }
    apoints[apUser.id].points += parseFloat(args[1]);
    fs.writeFile(__dirname + "/../points.json", JSON.stringify(apoints), (err)=>{
        if (err) console.log(err)
    })
    message.channel.send("Given "+ args[1] + " points to " + apUser.user.username)
}

module.exports.help = {
    name:"addpoints"
}