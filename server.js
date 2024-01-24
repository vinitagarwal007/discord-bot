require("dotenv").config(); //initialize dotenv
require("./slashCommandRegister")()
var app = require('express')()
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const data = require("./data.json")
const client = new Client({
    intents: [
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ]
  });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith('!')) return;
    const commandBody = message.content.slice('!'.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if (command === "ping") {
        message.reply(`Pong`);
    } 
});

client.on('interactionCreate', async (interaction) => {
    try{
        if(interaction.isCommand()){
            if(interaction.commandName === "ping"){
                interaction.reply("pong")
            }
            if(interaction.commandName === "assign"){
                console.log(data[interaction.options.data[0]['value']].split(","))
                if(interaction.options.data[0]['name'] === "identity" && data[interaction.options.data[0]['value']]){
                    var role = interaction.guild.roles.cache.filter(role => data[interaction.options.data[0]['value']].split(",").includes(role.name));
                    interaction.member.roles.add(role)
                    interaction.reply(`${interaction.options.data[0]['value']} ${data[interaction.options.data[0]['value']]} were assigned`)
                }else{
                    interaction.reply("Error Occured or Identity not found")
                }
                
            }
        }
    }
    catch(err){
        interaction.reply("Error Occured or Identity not found")
    }

});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
app.use("/",(req,res)=>{
    res.send("not found")
})
app.listen(process.env.PORT)
