var http = require('http');
var port = process.env.PORT || 3000;
var url = require("url");
var fs = require("fs");
var io = require('socket.io');

var server = http.createServer(function(request, response){
  //find the pathname
  var path = url.parse(request.url).pathname

  switch(path){
    case '/':
      response.writeHead(200, {'Content-Type':'text/html'});
      response.write('Hello World');
      response.end();
      break;
    case '/socket.html':
      fs.readFile(__dirname + path, function(error, data){
        if (error){
          response.writeHead(404, {'Content-Type':'text/html'});
          response.write('404 - Page not found.');
          response.end();
        } else {
          response.writeHead(200, {'Content-Type':'text/html'});
          response.write(data, 'utf8');
          response.end();
        }

      });
      break;
    default:
      response.writeHead(404, {'Content-Type':'text/html'});
      response.write('404 - Page not found.');
      response.end();
      break;
  }



});


server.listen(port);
var listener = io.listen(server);

listener.sockets.on('connection', function(socket){
  socket.on('chat message', function(msg){
    socket.emit('chat message', msg);
  });

});
