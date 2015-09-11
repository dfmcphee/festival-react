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
