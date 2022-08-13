const { Command } = require("discord-akairo")
const fs = require("fs")

class LoadCommand extends Command {
  constructor() {
    super("load", {
      aliases: ["load"],
      category: "Moderation",
      userPermissions: "ADMINISTRATOR",
      description: {
        content: "Recupère les données de tous les tournois",
        usage: "load"
      },
      typing: true
    })
  }

  async exec(message, client) {
    if (!fs.existsSync("data/leagues.json")) {
      return message.channel.send(
        "Le fichier de ligues JSON n'a pas été trouvé."
      )
    }

    const leagues = JSON.parse(fs.readFileSync("data/leagues.json"))
    const leaguesArray = ["LEC", "LCK", "LCS", "LPL"]

    leaguesArray.forEach(async league => {
      const params = {
        leagueId: leagues[league]
      }

      const data = await this.client.functions.get(
        "getTournamentsForLeague",
        params
      )

      saveData(data, league, message)
    })
  }
}

async function saveData(data, league, message) {
  if (!data) {
    return message.channel.send(
      "Erreur lors de la récupération des tournois de la ligue " + league
    )
  }

  fs.writeFileSync(
    `data/${league}.json`,
    JSON.stringify(data.leagues[0].tournaments, null, "\t")
  )

  await message.channel.send(
    data.leagues[0].tournaments.length +
      " tournois trouvés de la ligue " +
      league
  )
}

module.exports = LoadCommand
