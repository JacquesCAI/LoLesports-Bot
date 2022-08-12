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
      return message.channel.send(
        "Le fichier de LCK JSON n'a pas été trouvé."
      )
    }

    const lck = JSON.parse(fs.readFileSync("data/lck.json"))
    // const OLDtournaments = lck.sort(function(a, b) {
    //   var aa = a.startDate.split("/").reverse().join(),
    //     bb = b.startDate.split("/").reverse().join()
    //   return aa < bb ? -1 : aa > bb ? 1 : 0
    // })
    // const tournaments = Object.keys(lck).sort().reduce(
    //   (obj, key) => { 
    //     obj[key] = unordered[key]; 
    //     return obj;
    //   }, 
    //   {}
    // );

    console.log(typeof lck)

    const params = {
      tournamentId: tournaments[0].id
    }
    const data = await this.client.functions.get("getStandings", params)
    if (!data) {
      return message.channel.send("Erreur lors de la récupération des ligues.")
    }

    console.log(data)
  }
}

module.exports = StandingsCommand
