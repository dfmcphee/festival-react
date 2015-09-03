var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var onlineUsers = {};

function updateUserList() {
  io.emit('onlineUsersUpdated', {
    onlineUsers: onlineUsers
  });
}

io.on('connection', function(socket){
  console.log('a user connected');

  onlineUsers[socket.id] = {
    id: socket.id,
    name: 'Anonymous'
  };

  updateUserList();

  socket.on('identify', function(name){
    onlineUsers[socket.id].name = name;
    updateUserList();
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    delete onlineUsers[socket.id];
  });
});

http.listen(3000, function(){
  console.log('listening on port 3000');
});
