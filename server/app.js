const express = require("express");
const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

var mensajes = [{
  id: 1,
  texto: 'Hola soy perrro',
  author: 'mfcortes'
}]

app.use(express.static('public'));
app.get("/", (req, resp) => {
  resp.status(200).send("Servidor de Chat");
});

io.on('connection', (socket) => {
  console.log('Se han logeado con socket ' + socket.id);
  socket.emit('mensaje', mensajes);

  socket.on('respuesta-cliente', (data) => {
    console.log(data.texto);
    mensajes.push(data);

    io.emit('mensaje', mensajes);

  });
})

server.listen(port, () => {
  console.log("Server Running in http://localhost/" + port);
});