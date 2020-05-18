require('dotenv').config()

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as express from 'express'
import * as path from 'path'

class Server {
  private app: express.Application

  constructor() {
    this.app = require('express')()
  }

  loadMiddleware(): void {
    this.app.use(express.static(path.join(__dirname, '../../client/public')))
  }

  listen(): void {
    this.app.listen(process.env.SERVER_PORT, (): void => {
      console.log(`Listening on ${process.env.SERVER_PORT}`)
    })
  }
}

const ServerInstance = new Server()
ServerInstance.loadMiddleware()
ServerInstance.listen()
