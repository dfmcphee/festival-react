import React from 'react';
import _ from 'underscore';
import UserList from './UserList';
import io from 'socket.io-client';

var socket = io();

// The top level festival component
export default class Festival extends React.Component {
  // Set default state for component
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  // Event fired before component is loaded
  componentWillMount(){
    // If the browser geolocation API is available
    if ("geolocation" in navigator) {
      // Watch for changes in location
      navigator.geolocation.watchPosition(function(position) {
        // Send geolocation to server
        socket.emit('locate', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    }
    // Update user list on change from server
    socket.on('onlineUsersUpdated', ::this.updateUsers);
  }

  // Send event to update user's name
  updateName(event) {
    socket.emit('identify', event.target.value);
  }

  // Update user list stored in state
  updateUsers(data) {
    this.setState({users: _.values(data.onlineUsers)});
  }

  // Render the markup for component
  render() {
    return (
      <div className="user-list">
        <input type="text" placeholder="Enter your name" onChange={this.updateName}/>
        <UserList users={this.state.users}/>
      </div>
    );
  }
}
