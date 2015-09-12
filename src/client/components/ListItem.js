import React from 'react';

export default class ListItem extends React.Component {
  // Render the location section for list item
  renderLocation() {
    if (this.props.user.location) {
      return (
        <p>{this.props.user.location.latitude} {this.props.user.location.longitude}</p>
      )
    }
  }

  // Render the list item component
  render() {
    return (
      <div key={this.props.user}>
        <h3>{this.props.user.name}</h3>
        {this.renderLocation()}
      </div>
    )
  }
}
