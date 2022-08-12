const { embed, get } = require("../utils/functions")
require("dotenv").config({
  path: ".env"
})
const { TOKEN } = require("../utils/config")
const {
  AkairoClient,
  CommandHandler,
  ListenerHandler
} = require("discord-akairo")

module.exports = class Client extends AkairoClient {
  constructor(config = {}) {
    super(
      { ownerID: "560144304119742464" },
      {
        allowedMentions: {
          parse: ["roles", "users", "everyone"]
        },
        partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
        presence: {
          status: "online",
          activities: [
            {
              name: "https://lolesports.com/",
              type: "WATCHING"
            }
          ]
        },
        intents: 32767
      }
    )

    this.commandHandler = new CommandHandler(this, {
      allowMention: true,
      prefix: config.PREFIX,
      defaultCooldown: 5000,
      directory: "./commands/"
    })

    this.listenerHandler = new ListenerHandler(this, {
      directory: "./listeners/"
    })

    this.functions = {
      embed: embed,
      get: get
    }
  }

  init() {
    this.commandHandler.loadAll()
    this.commandHandler.useListenerHandler(this.listenerHandler)
    this.listenerHandler.loadAll()
  }

  async start() {
    await this.init()
    return this.login(TOKEN)
  }
}
