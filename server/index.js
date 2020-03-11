const express = require('express');
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http, { pingTimeout: 60000 });
const socketRoutes = require('./sockets')

io.on('connection', (socket) => {
  console.log(`connection [id=${socket.id}]`)
  socketRoutes(socket, io)
});
http.listen(3000, () => {
  console.log('Listening on port 3000!');
});
app.use(express.static('dist'));
app.get('/', (req, res) => res.render('index'));