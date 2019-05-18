const Router = require("express").Router
const { thing } = require("./client")

const router = Router()

router.get("/initial", () => console.log("hit"))
thing()
module.exports = router