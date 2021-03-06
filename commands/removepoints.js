const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
const fs = require("fs")
let spoints = JSON.parse(fs.readFileSync(__dirname + "/../points.json"))
module.exports.run = async function(bot, message, args, points){
    message.delete().catch(O_o=>{})
    if(!message.member.roles.find("name","Founder") && !message.author.id == owner) return "You have insufficient perms";
	let spUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!spUser) return message.channel.send("Couldn't find user.");
    if(!points[spUser.id + '']){
        points[spUser.id + ''] = {
            points: 0
        }
    }
    points[spUser.id].points -= parseFloat(args[1]);
    fs.writeFile(__dirname + "/../points.json", JSON.stringify(points), (err)=>{
        if (err) console.log(err)
    })
    message.channel.send("Taken "+ args[1] + " points from " + spUser.user.username)
    return points;
}
module.exports.help = {
    name:"removepoints"
}