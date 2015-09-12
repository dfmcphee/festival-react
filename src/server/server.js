import express from 'express';
import React from 'react';
import http from 'http';
import io from 'socket.io';
import nedb from 'nedb';

var app = express();
var server = http.Server(app);
var sockets = io(server);

app.use(express.static('views'));

var db = {};

db.users = new nedb();

// Send an updated userlist to all clients
function sendUpdatedUserList() {
  // Find all users from db
  db.users.find({}, function (err, users) {
    if (!err) {
      // Send updated users to clients
      sockets.emit('onlineUsersUpdated', {
        onlineUsers: users
      });
    }
  });
}

// Callback when a user is updated
function usersUpdated(err, user) {
  if (!err) {
    // If no errors in save, send updated user list
    sendUpdatedUserList();
  }
}

// Event every time a user connects
sockets.on('connection', function(socket){
  console.log('a user connected');

  // Create new user object
  var newUser = {
    socket_id: socket.id,
    name: 'Anonymous',
    location: false
  };

  // Inert into db
  db.users.insert(newUser, usersUpdated);

  // Event when a user identifies themselves
  socket.on('identify', function(name){
    if (name === '') {
      name = 'Anonymous';
    }

    var query = {
      socket_id: socket.id
    };

    var update = {
      $set: {
        name: name
      }
    };

    // Update user in db
    db.users.update(query, update, {}, usersUpdated);
  });

  // Event when a user identifies themselves
  socket.on('locate', function(geolocation){
    var query = {
      socket_id: socket.id
    };

    var update = {
      $set: {
        location: geolocation
      }
    };

    // Update user in db
    db.users.update(query, update, {}, usersUpdated);
  });

  // Event when a user disconnects
  socket.on('disconnect', function(){
    console.log('user disconnected');
    // Remove disconnected user from db
    db.users.remove({socket_id: socket.id}, {}, usersUpdated);
  });
});

// Start server listening on port 3000
server.listen(3000, function(){
  console.log('listening on port 3000');
});
