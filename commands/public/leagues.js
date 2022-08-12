const { Command } = require("discord-akairo")
const fs = require("fs")

class LeaguesCommand extends Command {
  constructor() {
    super("leagues", {
      aliases: ["leagues"],
      category: "Public",
      description: {
        content: "Renvoie le nom des ligues",
        usage: "leagues"
      },
      typing: true
    })
  }

  async exec(message) {
    if (!fs.existsSync("data/leagues.json")) {
      return message.channel.send(
        "Le fichier de ligues JSON n'a pas été trouvé."
      )
    }

    const leagues = JSON.parse(fs.readFileSync("data/leagues.json"))
    const data = await this.client.functions.get("getLeagues", [])
    if (!data) {
      return message.channel.send("Erreur lors de la récupération des ligues.")
    }
    const embed = this.client.functions.embed().setTitle("Ligues")

    let description = ""

    Object.values(data.leagues).forEach(league => {
      description += `**${league.name}** (${league.region})\n`

      if (leagues[league.name] && leagues[league.name].id != league.id) {
        leagues[league.name] = league.id
        fs.writeFileSync(
          "data/leagues.json",
          JSON.stringify(leagues, null, "\t")
        )
      } else {
        leagues[league.name] = league.id
        fs.writeFileSync(
          "data/leagues.json",
          JSON.stringify(leagues, null, "\t")
        )
      }
    })

    embed.setDescription(description)

    return message.channel.send({ embeds: [embed] })
  }
}

module.exports = LeaguesCommand
