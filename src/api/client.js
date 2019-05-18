const axios = require("axios")

const bearerToken = axios.post(
  'https://api.lyft.com/oauth/token',
  {"grant_type": "client_credentials", "scope": "public"},
  {
    headers: {"Content-Type": "application/json"},
    auth: {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET
    }
  }).then((res) => res.data.access_token)
    .catch((err) => console.error(err))

module.exports = {
  thing: () => console.log(bearerToken)
} 