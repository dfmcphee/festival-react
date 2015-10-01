import React from 'react';
import geolib from 'geolib';

export default class ListItem extends React.Component {
  getTime(distance) {
    var time = distance / 80;

    if (time < 1) {
      time = "Less than a minute walk"
    } else {
      time = `${Math.round(time)} minute walk`
    }

    return time;
  }

  // Render the location section for list item
  renderLocation() {
    if (this.props.user.location && this.props.currentLocation) {
      var distance = geolib.getDistance(
        {
          latitude: this.props.currentLocation.latitude,
          longitude: this.props.currentLocation.longitude
        },
        {
          latitude: this.props.user.location.latitude,
          longitude: this.props.user.location.longitude
        }
      );
      var time = this.getTime(distance);
      return (
        <p>{distance}m - {time}</p>
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
