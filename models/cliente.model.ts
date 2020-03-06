const mongoose = require("mongoose")

const esquema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  fecha: String,
  edad: Number
})

function autoPoblar(next) {
  this.populate("roles")
  next()
}

esquema.pre("find", autoPoblar)
esquema.pre("findOne", autoPoblar)

const modelo = mongoose.model("Cliente", esquema)

export default modelo
