import React from 'react';
import ListItem from './ListItem';

export default class UserList extends React.Component {
  // Render a single user list item
  renderItem(user) {
    return (
      <ListItem user={user} />
    )
  }

  // Render user list component
  render() {
    return (
      <div>
        {this.props.users.map(this.renderItem)}
      </div>
    )
  }
}
