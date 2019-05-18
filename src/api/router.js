const Router = require("express").Router
const { getLyftPrices } = require("./client")

const router = Router()

router.post("/getPrices", (req, res) => {
  // do validation on body here
  const {startAddress, endAddress} = req.body
  getLyftPrices(startAddress, endAddress)
    .then((prices) => res.status(200).send(prices))
    .catch((err) => {
      console.error(err)
      res.status(500).send("internal server error")
    })
})

module.exports = router