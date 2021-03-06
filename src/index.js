const express = require('express')
const bodyParser = require('body-parser')
const router = require("./api/router")
const app = express()
var cors = require('cors')


var corsOptions = {
  origin: '*', // open it up to everything just for the demo
  optionsSuccessStatus: 200
}

// cours and metrics can be added here
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/healthCheck", (req, res) => res.status(200).send({"status": "up"}))

app.use("/afterTaxi", router) // only expose these routes to the outside


const server = app.listen(3000, () => console.log("server is up")) // don't log port. It is a security vulnerability

const graceTimeout = 5000

let connections = []

// gracefully close connections when able
server.on("connection", connection => {
    connections.push(connection)
    connection.on("close", () => connections = connections.filter(curr => curr !== connection))
})

server.on("connection", connection => {
    connections.push(connection)
    connection.on("close", () => connections = connections.filter(curr => curr !== connection))
})

const gracefulShutDown = () => {
  server.close(() => {
    process.exit(0)
  })

  setTimeout(() => {
    process.exit(1)
  }, 10000)

  connections.forEach(curr => curr.end())
  setTimeout(() => connections.forEach(curr => curr.destroy()), graceTimeout)
}

process.on("SIGTERM", gracefulShutDown)
process.on("SIGINT", gracefulShutDown)
