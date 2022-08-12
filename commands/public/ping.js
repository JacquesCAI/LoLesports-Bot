const { Command } = require("discord-akairo")

class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping"],
      category: "Public",
      description: {
        content: "Renvoie la latence du bot",
        usage: "ping"
      },
      typing: true
    })
  }

  exec(message) {
    const botPing = Math.round(this.client.ws.ping)

    message.channel.send("pong :ping_pong:").then(m => {
      return message.channel.send({
        embeds: [
          this.client.functions
            .embed()
            .setTitle("Latences")
            .setColor("#1AECFF")
            .addField("💟 ** API**", botPing + "ms")
            .addField(
              "🔂 ** Bot**",
              m.createdTimestamp - message.createdTimestamp + "ms"
            )
        ]
      })
    })
  }
}

module.exports = PingCommand
