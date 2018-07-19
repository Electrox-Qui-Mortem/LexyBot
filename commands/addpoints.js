const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
const fs = require("fs");
module.exports.run = async function(bot, message, args, points){
    message.delete().catch(O_o=>{})
    if(/*!message.member.roles.find("name","Founder") && */!message.author.id == owner) return "You have insufficient perms";
	let apUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!apUser) return message.channel.send("Couldn't find user.");
    if(!points[apUser.id + '']){
        points[apUser.id + ''] = {
            points: 0
        }
    }
    points[apUser.id].points += parseFloat(args[1]);
    fs.writeFile(__dirname + "/../points.json", JSON.stringify(points), (err)=>{
        if (err) console.log(err)
    })
    message.channel.send("Given "+ args[1] + " points to " + apUser.user.username)
    return points;
}

module.exports.help = {
    name:"addpoints"
}