const { Command } = require("discord-akairo")
const fs = require("fs")

class LcsCommand extends Command {
  constructor() {
    super("lcs", {
      aliases: ["lcs"],
      category: "Public",
      description: {
        content: "Renvoie le classement de la LCS",
        usage: "lcs"
      },
      typing: true
    })
  }

  async exec(message) {
    if (!fs.existsSync("data/lcs.json")) {
      return message.channel.send("Le fichier de LCS JSON n'a pas été trouvé.")
    }

    const lcs = JSON.parse(fs.readFileSync("data/lcs.json"))
    const tournaments = lcs
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
      .setTitle(
        "Classement de la " +
          data.standings[0].slug.replaceAll("_", " ").toUpperCase()
      )

    let description = ""

    data.standings[0].stages[0].sections[0].rankings.forEach(el => {
      if (el.teams.length > 1) {
        el.teams.forEach(team => {
          description += `**${el.ordinal}** - ${team.name} (${team.record
            .wins}V-${team.record.losses})\n`
        })
      } else {
        description += `**${el.ordinal}** - ${el.teams[0].name} (${el.teams[0]
          .record.wins}V-${el.teams[0].record.losses})\n`
      }
    })

    embed.setDescription(description)

    return message.channel.send({ embeds: [embed] })
  }
}

module.exports = LcsCommand
