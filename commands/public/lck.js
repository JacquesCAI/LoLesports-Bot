const { Command } = require("discord-akairo")
const fs = require("fs")

class LckCommand extends Command {
  constructor() {
    super("lck", {
      aliases: ["lck"],
      category: "Public",
      description: {
        content: "Recupère les données de la lck",
        usage: "lck"
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
    const lck = JSON.parse(fs.readFileSync("data/lck.json"))
    const params = {
      leagueId: leagues["LCK"]
    }
    const data = await this.client.functions.get(
      "getTournamentsForLeague",
      params
    )
    if (!data) {
      return message.channel.send(
        "Erreur lors de la récupération des tournois de la LCK."
      )
    }
    
    fs.writeFileSync(
      "data/lck.json",
      JSON.stringify(data.leagues[0].tournaments, null, "\t")
    )

    return message.channel.send(
      data.leagues[0].tournaments.length + " tournois trouvés."
    )
  }
}

module.exports = LckCommand
