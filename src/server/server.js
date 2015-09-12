import express from 'express';
import React from 'react';
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('views'));

// Initialize empty user list
var onlineUsers = {};

// Send an updated userlist to all clients
function updateUserList() {
  io.emit('onlineUsersUpdated', {
    onlineUsers: onlineUsers
  });
}

// Event every time a user connects
io.on('connection', function(socket){
  console.log('a user connected');

  // Add connected user to list
  onlineUsers[socket.id] = {
    id: socket.id,
    name: 'Anonymous',
    location: false
  };

  updateUserList();

  // Event when a user identifies themselves
  socket.on('identify', function(name){
    if (name !== '') {
      onlineUsers[socket.id].name = name;
    } else {
      onlineUsers[socket.id].name = 'Anonymous';
    }
    updateUserList();
  });

  // Event when a user identifies themselves
  socket.on('locate', function(geolocation){
    console.log(geolocation);
    onlineUsers[socket.id].location = geolocation;
    updateUserList();
  });

  // Event when a user disconnects
  socket.on('disconnect', function(){
    console.log('user disconnected');
    // Remove them from user list
    delete onlineUsers[socket.id];
  });
});

// Start server listening on port 3000
http.listen(3000, function(){
  console.log('listening on port 3000');
});
