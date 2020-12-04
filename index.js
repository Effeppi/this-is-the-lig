var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const boot = require('./lega-bot')

var port = process.env.PORT || 3000;
app.use(express.static("public"));


io.on('connection', function (socket) {

  let conv = boot.init();
  let bestemCount = 0;
  serverSend(socket, `ciao, ${conv.domanda}`)

  socket.on('chat message', function (msg) {
    clientSend(socket, msg)

    
    setTimeout(() => {
      if (conv.regex.test(msg)) {

        serverSend(socket, conv.bot)

        conv = boot.init();

        bestemCount = 0;
        serverSend(socket, `vabbuò, ${conv.domanda}`)
      } else if (bestemCount < 5) {
        serverSend(socket, `${boot.randomizeBestemmione()} ${conv.domanda}`)

        // serverSend(socket, conv.domanda)

        bestemCount = bestemCount + 1

      } else {

        serverSend(socket, boot.randomizeBestemmione())

        conv = boot.init();

        bestemCount = 0;
        serverSend(socket, `vabbuò, ${conv.domanda}`)
      }
    }, 1000)

  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});

function clientSend(socket, msg) {
  send(socket, `Tu dici: ${msg}`)
}

function serverSend(socket, msg) {
  send(socket, `De Lig dice: ${msg}`)
}

function send(socket, msg) {
  socket.emit('chat message', msg);
}