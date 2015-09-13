'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socketIo = require('socket.io');

var _socketIo2 = _interopRequireDefault(_socketIo);

var _modelsUserList = require('./models/UserList');

var _modelsUserList2 = _interopRequireDefault(_modelsUserList);

var app = (0, _express2['default'])();
var server = _http2['default'].Server(app);
var sockets = (0, _socketIo2['default'])(server);

app.set('view engine', 'ejs');
app.use(_express2['default']['static']('public'));

app.get('/', function (req, res) {
  var appScript = '/js/app.js';
  if (process.env.NODE_ENV !== 'production') {
    appScript = 'http://localhost:8080' + appScript;
  }

  res.render('index.html.ejs', {
    appScript: appScript
  });
});

var sendUpdatedUserList = function sendUpdatedUserList() {
  this.sockets.emit('onlineUsersUpdated', {
    onlineUsers: this.onlineUsers
  });
};

var Users = new _modelsUserList2['default'](sendUpdatedUserList);

// Event every time a user connects
sockets.on('connection', function (socket) {
  console.log('a user connected');
  Users.addUser(socket.id);

  // Event when a user identifies themselves
  socket.on('identify', function (name) {
    Users.updateName(socket.id, name);
  });

  // Event when a user identifies themselves
  socket.on('locate', function (geolocation) {
    Users.updateLocation(socket.id, geolocation);
  });

  // Event when a user disconnects
  socket.on('disconnect', function () {
    console.log('user disconnected');
    Users.removeUser(socket.id);
  });
});

// Start server
server.listen(process.env.PORT || 3000, function () {
  console.log('Server started.');
});
