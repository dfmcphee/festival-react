import express from 'express';
import React from 'react';
import http from 'http';
import io from 'socket.io';
import UserList from '../models/UserList.js';

var app = express();
var server = http.Server(app);
var sockets = io(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res) {
  var appScript = '/js/app.js';
  if (process.env.NODE_ENV !== 'production') {
    appScript = 'http://localhost:8080' + appScript;
  }

  res.render('index.html.ejs', {
    appScript: appScript
  });
});

var sendUpdatedUserList = function(){
  this.sockets.emit('onlineUsersUpdated', {
    onlineUsers: this.onlineUsers
  });
}

var Users = new UserList(sendUpdatedUserList);

// Event every time a user connects
sockets.on('connection', function(socket){
  console.log('a user connected');
  Users.addUser(socket.id);

  // Event when a user identifies themselves
  socket.on('identify', function(name){
    Users.updateName(socket.id, name);
  });

  // Event when a user identifies themselves
  socket.on('locate', function(geolocation){
    Users.updateLocation(socket.id, geolocation);
  });

  // Event when a user disconnects
  socket.on('disconnect', function(){
    console.log('user disconnected');
    Users.removeUser(socket.id);
  });
});

// Start server
server.listen((process.env.PORT || 3000), function(){
  console.log('Server started.');
});
