var express = require('express')
var http = require('http')
var app = express()

var tareas = [
  {
    id: 1,
    title: 'Tarea1',
    description: 'loremp impsum',
    status: 'todo',
    fecha: 'Fri Jun 14 2019 17:06:03 GMT-0500 (hora estándar de Perú)'
  },
  {
    id: 2,
    title: 'Tarea2',
    description: 'loremp impsum',
    status: 'todo',
    fecha: 'Wed Jul 24 2019 17:06:03 GMT-0500 (hora estándar de Perú)'
  },
  {
    id: 3,
    title: 'Cronograma',
    description: 'loremp impsum',
    status: 'todo',
    fecha: 'Sat Aug 31 2019 17:06:03 GMT-0500 (hora estándar de Perú)'
  },
  {
    id: 4,
    title: 'demo 4',
    description: 'loremp impsum',
    status: 'doing',
    fecha: 'Mon Sep 2 2019 17:06:03 GMT-0500 (hora estándar de Perú)'
  },
  {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    title: 'Tarea5',
    description: 'loremp impsum',
    status: 'complete',
    fecha: 'Fri Sep 18 2019 17:06:03 GMT-0500 (hora estándar de Perú)'
  }
]
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.get('/tareas', (req, res) => {
  res.send(tareas)
})

app.get('/tareas/editar/:id', (req, res) => {
  var result
  tareas.forEach((element, index) => {
    if (element.id == req.params.id) {
      result = tareas[index]
    }
  })
  res.send(result)
})

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the jungle!')
})

app.post('/tareas', (req, res) => {
  tareas.push({
    id: tareas.length + 1,
    title: req.query.title,
    description: req.query.description,
    status: req.query.status,
    fecha: req.query.fecha
  })
  res.send(tareas)
})
app.patch('/tareas', (req, res) => {
  res.send('PATCH method')
})

app.put('/tareas/actualizar', (req, res) => {
  console.log('Params: ', req.query.id)
  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].id == Number(req.query.id)) {
      tareas[i] = {
        id: req.query.id,
        title: req.query.title,
        description: req.query.description,
        status: req.query.status,
        fecha: req.query.fecha
      }
    }
  }
  res.send(tareas)
})

app.delete('/tareas/:id', (req, res) => {
  for (var i = 0; i < tareas.length; i++) {
    if (Number(tareas[i].id) === Number(req.params.id)) {
      tareas.splice(i, 1)
    }
  }
  res.send(tareas)
})

http.createServer(app).listen(8001, () => {
  console.log('Server started at http://localhost:8001')
})
