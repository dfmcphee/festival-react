import React from 'react';
import _ from 'underscore';
import UserList from './UserList';
import io from 'socket.io-client';
import UserMap from './UserMap';
import geolib from 'geolib';

var socket = io();

// The top level festival component
export default class Festival extends React.Component {
  // Set default state for component
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      markers: [],
      mapCenter: {
        lat: 45.4215296,
        lng: -75.6971931
      }
    };
  }

  // Event fired before component is loaded
  componentWillMount(){
    // If the browser geolocation API is available
    if ("geolocation" in navigator) {
      // Watch for changes in location
      navigator.geolocation.watchPosition(::this.updateLocation, function() {
        console.log('Position could not be determined.')
      },
      {
        enableHighAccuracy: true
      });
    }
    // Update user list on change from server
    socket.on('onlineUsersUpdated', ::this.updateUsers);
  }

  updateLocation(position) {
    // Send geolocation to server
    socket.emit('locate', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

    this.setState({currentLocation: position.coords});
  }

  // Send event to update user's name
  updateName(event) {
    socket.emit('identify', event.target.value);
  }

  // Update user list stored in state
  updateUsers(data) {
    var users = _.values(data.onlineUsers);
    var markers = [];
    var locations = [];

    users.map((user, index) => {
      if (user.location) {
        markers.push({
          position: {
            lat: user.location.latitude,
            lng: user.location.longitude,
          },
          defaultAnimation: 0,
          key: user.name
        });

        locations.push({
          latitude: user.location.latitude,
          longitude: user.location.longitude
        })
      }
    });

    this.setState({
      users: users,
      markers: markers
    });
  }

  // Render the markup for component
  render() {
    return (
      <div className="festival">
        <input type="text" placeholder="Enter your name" onChange={this.updateName}/>
        <UserList users={this.state.users} currentLocation={this.state.currentLocation} />
        <div className="usermap">
          <UserMap markers={this.state.markers} mapCenter={this.state.mapCenter} />
        </div>
      </div>
    );
  }
}
