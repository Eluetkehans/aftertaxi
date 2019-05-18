const axios = require("axios")

let authHeader;

axios.post(
  'https://api.lyft.com/oauth/token',
  {"grant_type": "client_credentials", "scope": "public"},
  {
    headers: {"Content-Type": "application/json"},
    auth: {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET
    }
  }).then((res) => {authHeader = `Bearer ${res.data.access_token}`})
    .catch((err) => console.error(err))


// This would go in a seperate utils lib, but running out of time
function applyDiscount(originalPrice, discountPercentage) {
  // assuming originalPrice has been confirmed to be an int by request validation
  if (originalPrice) {
    if(discountPercentage) {
      // for production, I would spend more time looking up the rules for rounding currencies
      let discountPrice = originalPrice - (originalPrice * discountPercentage)
      return Math.round(discountPrice * 100) / 100
    }
    return originalPrice
  }

}

const getLyftPrices = new Promise((startAddress, endAddress) => {
  // use a geo indexing library to get the actuall lat long's from the addresses here
  let pickupLatitude = 37.76472;
  let pickupLongitude = -122.422999;
  let destinationLatitude = 37.7763592;
  let destinationLongitude = -122.4242038;

  // It looks like the docs page is down for the lyft rest api. This is just a redirect link to there own website. I'll send a screen shot via email of the docs page
  return axios.get(`https://lyft.com/ride?id=lyft&pickup[latitude]=${pickupLatitude}&pickup[longitude]=${pickupLongitude}&destination[latitude]=${destinationLatitude}&destination[longitude]=${destinationLongitude}&partner=${process.env.CLIENT_ID}`, {headers: {
    Authorization: authHeader
  }})
    .then((res) => {
      // validate body here

      // just guessing on the property names here. Docs are down
      const lyftPrice = applyDiscount(res.body.lyftPrice, .25)
      const lyftPlusPrice = applyDiscount(res.body.lyftPlusPrice, .25)
      return {lyftPrice, lyftPlusPrice}
    })
    .catch((err) => {throw err})
})



module.exports = {
  getLyftPrices
} 