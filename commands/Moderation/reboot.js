const { Command } = require("discord-akairo")

class RebootCommand extends Command {
  constructor() {
    super("reboot", {
      aliases: ["reboot"],
      category: "Moderation",
      userPermissions: "ADMINISTRATOR",
      description: {
        content: "Redémarre le bot",
        usage: "reboot"
      }
    })
  }

  async exec(message) {
    await message.channel.send("Redémarrage en cours...")
    await process.exit()
  }
}

module.exports = RebootCommand
