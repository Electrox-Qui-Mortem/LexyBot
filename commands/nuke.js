const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
module.exports.run = async function(bot, message, args){
    message.delete().catch(O_o => {});
    message.channel.fetchMessages({limit:args[0]})
    .then(function(list){
        message.channel.bulkDelete(list);
        
    }, function(err){
        
    })
    .then(function(){
        message.send(`Successfully deleted ${parseFloat(args)} messages`);
    },function(err){
        message.channel.send("ERROR: ERROR CLEARING CHANNEL.");
        console.log(err)
    });
}

module.exports.help = {
    name:"nuke"
}
