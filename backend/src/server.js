'use strict'
// imports
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')
// variables
const app = express()
const server = http.Server(app)
const io = socketio(server)
const connectedUsers = {}

// mongodb connection
mongoose.connect('mongodb+srv://omnistack9:2ud7RYBnWy078FNh@dreamdb0-w9xb1.mongodb.net/omnistack9?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// socket io
io.on('connection', socket => {
  const { user_id } = socket.handshake.query

  connectedUsers[user_id] = socket.id
})

// middleware
app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers
  return next()
})

// req.query = Acessar query params 'localhost:3000/users?idade=20'
// req.params = Acessar route params 'localhost:3000/users/1'
// req.body = Acessar body param 'json no body'

// routes - get, post, put, delete
app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.disable('x-powered-by')
app.use(routes)

// server start
server.listen(3000, () => {
  console.log('Server up. Port: ' + 3000)
})
