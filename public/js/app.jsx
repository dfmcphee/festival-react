var socket = io();

// The top level festival component
var Festival = React.createClass({
  // Set default state for component
  getInitialState: function(){
    return {
      users: []
    }
  },

  // Event fired before component is loaded
  componentWillMount: function(){
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
    socket.on('onlineUsersUpdated', this.updateUsers);
  },

  // Send event to update user's name
  updateName: function(event) {
    socket.emit('identify', event.target.value);
  },

  // Update user list stored in state
  updateUsers: function(data){
    this.setState({users: _.values(data.onlineUsers)});
  },

  // Render the markup for component
  render: function(){
    return (
      <div className="user-list">
        <input type="text" placeholder="Enter your name" onChange={this.updateName}/>
        <UserList users={this.state.users}/>
      </div>
    );
  }
});

// UserList component
var UserList = React.createClass({
  // Render a single user list item
  renderItem: function(user) {
    return (
      <ListItem user={user} />
    )
  },

  // Render user list component
  render: function(){
    return (
      <div>
        {this.props.users.map(this.renderItem)}
      </div>
    )
  }
});

// ListItem component
var ListItem = React.createClass({
  // Render the location section for list item
  renderLocation: function() {
    if (this.props.user.location) {
      return (
        <p>{this.props.user.location.latitude} {this.props.user.location.longitude}</p>
      )
    }
  },

  // Render the list item component
  render: function(){
    return (
      <div key={this.props.user}>
        <h3>{this.props.user.name}</h3>
        {this.renderLocation()}
      </div>
    )
  }
});

React.render(<Festival/>, document.getElementById('mount'));