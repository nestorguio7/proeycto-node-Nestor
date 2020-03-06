import express = require("express")
import { ControllerUsuario } from "../controllers"
//import { validador, esquemasAlumnos } from "../schemasValidators"

const Router = express.Router()
const controller = new ControllerUsuario()

Router.get("/", controller.listar)

/* Router.get("/detalle/:id/:nivel", validador(esquemasAlumnos.getAlumnosDetalle), controller.obtenerUno) */
Router.get("/detalle/:_id", controller.obtenerUno)
Router.post("/", controller.insertar)
Router.put("/:_id", controller.actualizar)
Router.delete("/:_id", controller.eliminar)

export default Router
