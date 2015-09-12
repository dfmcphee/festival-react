'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _UserList = require('./UserList');

var _UserList2 = _interopRequireDefault(_UserList);

var _socketIoClient = require('socket.io-client');

var _socketIoClient2 = _interopRequireDefault(_socketIoClient);

var socket = (0, _socketIoClient2['default'])('http://localhost:3000');

// The top level festival component

var Festival = (function (_React$Component) {
  _inherits(Festival, _React$Component);

  // Set default state for component

  function Festival(props) {
    _classCallCheck(this, Festival);

    _get(Object.getPrototypeOf(Festival.prototype), 'constructor', this).call(this, props);
    this.state = {
      users: []
    };
  }

  // Event fired before component is loaded

  _createClass(Festival, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // If the browser geolocation API is available
      if ("geolocation" in navigator) {
        // Watch for changes in location
        navigator.geolocation.watchPosition(function (position) {
          // Send geolocation to server
          socket.emit('locate', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        });
      }
      // Update user list on change from server
      socket.on('onlineUsersUpdated', this.updateUsers.bind(this));
    }

    // Send event to update user's name
  }, {
    key: 'updateName',
    value: function updateName(event) {
      socket.emit('identify', event.target.value);
    }

    // Update user list stored in state
  }, {
    key: 'updateUsers',
    value: function updateUsers(data) {
      this.setState({ users: _underscore2['default'].values(data.onlineUsers) });
    }

    // Render the markup for component
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'user-list' },
        _react2['default'].createElement('input', { type: 'text', placeholder: 'Enter your name', onChange: this.updateName }),
        _react2['default'].createElement(_UserList2['default'], { users: this.state.users })
      );
    }
  }]);

  return Festival;
})(_react2['default'].Component);

exports['default'] = Festival;
module.exports = exports['default'];