//aqui va la config general del servicio
const yenv = require("yenv")
const env = yenv()

const connectString = `mongodb+srv://${env.DB.USER}:${env.DB.PWD}@${env.DB.HOST}/${env.DB.NAME}?retryWrites=true&w=majority`

export { connectString }
//mongodb+srv://admin:<password>@cluster0-lv19o.mongodb.net/test?retryWrites=true&w=majority