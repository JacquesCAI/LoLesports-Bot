const { MessageEmbed } = require("discord.js")
const axios = require("axios")

const serialize = (obj, separator = '&') => {
  return Object.entries(obj)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join(separator)
}

module.exports = {
  embed: function() {
    return new MessageEmbed().setColor("#1E90FF").setTimestamp()
  },
  get: async function(url, params) {
    const headers = {
      "x-api-key": process.env.API_KEY
    }
    return axios
      .get(
        "https://esports-api.lolesports.com/persisted/gw/" +
          url +
          "?hl=fr-FR&" +
          serialize(params),
        { headers }
      )
      .then(response => {
        return response.data.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
