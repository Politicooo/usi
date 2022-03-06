const Discord = require("discord.js")
const client = new Discord.Client(
    { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] })

client.login(process.env.token)

client.on ("ready", () =>  {
    console.log ("Il bot è online!")

    var server = client.guilds.cache.get("947792744804409345")
    server.commands.create({
        name: "request-add-server",
        description: "richiesta d'aggiunzione server nell'unione usi",
        options: [
            {
                name: "id-server",
                description: "id del server",
                type: "STRING",
                required: true
            },
            {
                name: "invito",
                description: "link server",
                type: "STRING",
                required: true
            }
        ]
    })
    server.commands.create({
        name: "request-remove-server",
        description: "richiesta per rimuovere un server dall'unione usi",
        options: [
            {
                name: "id-server",
                description: "id del server da rimuovere",
                type: "STRING",
                required: true
            },
            {
                name: "invito",
                description: "link del server da rimuovere",
                type: "STRING",
                required: true
            },
            {
                name: "motivo",
                description: "ragione per cui lasci l'unione",
                type: "STRING",
                required: true
            }
        ]
    })
})


client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) return

    if(interaction.commandName == "request-add-server") {
        var embed = new Discord.MessageEmbed()
            .setTitle("Richiesta effettuata!")
            .setDescription("***Grazie per aver fatto richiesta! Un amministratore ti scriverà in dm per dirti se sei stato accettato!***")
        interaction.reply({ embeds: [embed], ephemeral: true})
    }

    let id = interaction.options.getString("id-server") 
    let invito = interaction.options.getString("invito")
    client.channels.cache.get("949983336456130630").send(`Richiesta d'aggiunzione eseguita da:${interaction.member.toString()}
Id Server:${id.toString()}  
Invito Server: ${invito.toString()}`)

    if(interaction.commandName == "request-remove-server") {
        var embed = new Discord.MessageEmbed()
            .setTitle("Richiesta effettuata!")
            .setDescription("***Grazie per aver fatto la richiesta! Un amministratore ti confermerà in dm l'uscita dall'unione usi!***")
        interaction.reply({ embeds: [embed], ephemeral: true })
    }

    let Id = interaction.options.getString("id-server")
    let Invito = interaction.options.getString("invito")
    let motivo = interaction.options.getString("motivo")
    client.channels.cache.get("949983336456130630").send(`Richiesta d'uscita eseguita da:${interaction.member.toString()}
Id Server:${id.toString()}
Invito Server: ${invito.toString()}
Motivo: ${motivo.toString()} `)
}) 