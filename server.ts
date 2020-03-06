import express = require("express")
import { Request } from "express"
import * as http from "http"
import * as bodyParser from "body-parser"

import { RouterTareas } from "./routes"
import { inicializarBaseDatos } from "./services/database.service"

const cluster = require("cluster")

if (cluster.isMaster) {
  for (let i = 0; i < require("os").cpus().length / 2; i++) {
    cluster.fork()
  }
} else {
  const yenv = require("yenv")
  const env = yenv()

  let httpServer: http.Server
  let app = express()

  interface RequestApp extends Request {
    estaAutenticado: boolean
  }

  const inicializar = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      httpServer = http.createServer(app)

      app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header(
          "Access-Control-Allow-Headers",
          "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
        )
        res.header(
          "Access-Control-Allow-Methods",
          "GET, POST, OPTIONS, PUT, DELETE"
        )
        res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE")
        next()
      })

      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({ extended: true }))

      app.use(express.static("./public"))

      /* app.use('/tareas', (req: RequestApp, res, next) => {
        req.estaAutenticado = true;
        //logica de autenticacion
        next();
      }); */
      /* app.use('/tareas', (req, res) => {
        res.json({ status: 409, message: 'El usuario no tiene permiso' })
      }) */

      app.use("/cliente", RouterTareas)

      httpServer
        .listen(env.PORT)
        .on("listening", () => resolve())
        .on("error", err => reject(err))
    })
  }

  const iniciar = async () => {
    try {
      console.log("Iniciando servidor ...")
      await inicializar()
      console.log("Servidor ejecutándose!")
    } catch (error) {
      console.log(error)
    }
    try {
      console.log("Iniciando conexión con MongoDB")
      await inicializarBaseDatos()
      console.log("Conexión exitosa a MongoDB")
    } catch (error) {
      console.log("Error de conexión")
      console.log(error)
    }
  }

  iniciar()
}
