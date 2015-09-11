// ListItem component
"use strict";

var ListItem = React.createClass({
  displayName: "ListItem",

  // Render the location section for list item
  renderLocation: function renderLocation() {
    if (this.props.user.location) {
      return React.createElement(
        "p",
        null,
        this.props.user.location.latitude,
        " ",
        this.props.user.location.longitude
      );
    }
  },

  // Render the list item component
  render: function render() {
    return React.createElement(
      "div",
      { key: this.props.user },
      React.createElement(
        "h3",
        null,
        this.props.user.name
      ),
      this.renderLocation()
    );
  }
});
// UserList component
"use strict";

var UserList = React.createClass({
  displayName: "UserList",

  // Render a single user list item
  renderItem: function renderItem(user) {
    return React.createElement(ListItem, { user: user });
  },

  // Render user list component
  render: function render() {
    return React.createElement(
      "div",
      null,
      this.props.users.map(this.renderItem)
    );
  }
});
'use strict';

var socket = io();

// The top level festival component
var Festival = React.createClass({
  displayName: 'Festival',

  // Set default state for component
  getInitialState: function getInitialState() {
    return {
      users: []
    };
  },

  // Event fired before component is loaded
  componentWillMount: function componentWillMount() {
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
    socket.on('onlineUsersUpdated', this.updateUsers);
  },

  // Send event to update user's name
  updateName: function updateName(event) {
    socket.emit('identify', event.target.value);
  },

  // Update user list stored in state
  updateUsers: function updateUsers(data) {
    this.setState({ users: _.values(data.onlineUsers) });
  },

  // Render the markup for component
  render: function render() {
    return React.createElement(
      'div',
      { className: 'user-list' },
      React.createElement('input', { type: 'text', placeholder: 'Enter your name', onChange: this.updateName }),
      React.createElement(UserList, { users: this.state.users })
    );
  }
});

React.render(React.createElement(Festival, null), document.getElementById('mount'));