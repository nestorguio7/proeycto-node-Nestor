import GenericoController from "./generico.controller"
import { Cliente } from "../models"

class Controller extends GenericoController {
  constructor() {
    super(Cliente) //Aquí estaba mi error! --> super('tareas')
  }
}

export default Controller
