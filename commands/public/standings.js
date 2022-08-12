const { Command } = require("discord-akairo")
const fs = require("fs")

class StandingsCommand extends Command {
  constructor() {
    super("standings", {
      aliases: ["standings"],
      category: "Public",
      description: {
        content: "Renvoie le classement de la LCK",
        usage: "standings"
      },
      typing: true
    })
  }

  async exec(message) {
    if (!fs.existsSync("data/lck.json")) {
      return message.channel.send("Le fichier de LCK JSON n'a pas été trouvé.")
    }

    const lck = JSON.parse(fs.readFileSync("data/lck.json"))
    const tournaments = lck
      .sort(function(a, b) {
        var aa = a.startDate.split("/").reverse().join(),
          bb = b.startDate.split("/").reverse().join()
        return aa < bb ? -1 : aa > bb ? 1 : 0
      })
      .reverse()

    const params = {
      tournamentId: tournaments[0].id
    }
    const data = await this.client.functions.get("getStandingsV3", params)
    if (!data) {
      return message.channel.send("Erreur lors de la récupération des ligues.")
    }

    const embed = this.client.functions
      .embed()
      .setTitle("Classement de la " + data.standings[0].slug.replaceAll("_", " ").toUpperCase())

    let description = ""

    data.standings[0].stages[0].sections[0].rankings.forEach(el => {
      description += `**${el.ordinal}** ${el.teams[0].name} (${el.teams[0].record.wins}V-${el.teams[0].record.losses})\n`
    })

    embed.setDescription(description)

    return message.channel.send({ embeds: [embed] })
  }
}

module.exports = StandingsCommand
