import mongoose = require('mongoose')
import configDatabase = require('../config/database.config')

const inicializarBaseDatos = async () => {
  mongoose.Promise = global.Promise

  const promiseConnect = new Promise((resolve, reject) => {
    mongoose.connect(configDatabase.connectString, {
      keepAlive: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () => {
      console.log('Conectado a Mongo.')

      require('../models').Tarea

      resolve()
    })

    mongoose.connection.on('error', error => {
      console.log('Ocurrió un error')
      reject(error)
    })
  })
  await promiseConnect
}

export { inicializarBaseDatos }
