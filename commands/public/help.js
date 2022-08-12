const { Command } = require("discord-akairo")

class HelpCommand extends Command {
  constructor() {
    super("help", {
      aliases: ["help", "h"],
      category: "Public",
      description: {
        content: "Renvoie la liste des commandes du bot",
        usage: "help <command>"
      },
      args: [{ id: "command", type: "commandAlias" }]
    })
  }

  exec(message, args) {
    const prefix = this.handler.prefix
    const command = args.command

    if (!command) {
      let embed = this.client.functions.embed().setAuthor("[ HELP ]")
        .setDescription(`
                    Voici la liste de toutes les commandes disponibles
                    Faire \`${prefix}help <commande/alias>\` pour plus d'informations à propos d'une commande.
                    **--------------------**
                `)

      for (const category of this.handler.categories.values()) {
        embed.addField(
          `ф ${category.id}`,
          `${category
            .filter(cmd => cmd.aliases.length > 0)
            .map(cmd => `\`${cmd.aliases[0]}\``)
            .join(", ")}`
        )
      }

      embed.addField("--------------------", `Préfix du bot : \`${prefix}\``)

      return message.channel.send({ embeds: [embed] })
    } else {
      let embed = this.client.functions
        .embed()
        .setAuthor(
          `[ Commande :  ${command.aliases[0].toUpperCase()} ${command.ownerOnly
            ? "‼ Admin Only ‼"
            : ""} ]`
        )
        .addField("Description", `${command.description.content}`)
        .addField("Utilisation", `\`${prefix}${command.description.usage}\``)
        .addField("Alias", `\`${command.aliases.join(", ")}\``, true)

      return message.channel.send({ embeds: [embed] })
    }
  }
}

module.exports = HelpCommand
