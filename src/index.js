const express = require('express')
const bodyParser = require('body-parser')
const app = express()

import { router } from "./api/router"

// cours and metrics can be added here

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/healthCheck", (req, res) => res.status(200).send({"status": "up"}))

app.use("/afterTaxi", router) // only expose these routes to the outside


const server = app.listen(port, () => console.log("server is up")) // don't log port. It is a security vulnerability

const connections = []

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
