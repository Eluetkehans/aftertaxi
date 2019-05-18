const Router = require("express").Router
const { thing } = require("./client")

const router = Router()

router.post("/getPrices", (req, res) => console.log(req.body))

module.exports = router