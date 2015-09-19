import React from 'react';
import {GoogleMap, Marker} from 'react-google-maps';
import _ from 'underscore';

export default class UserMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GoogleMap containerProps={{
        style: {
          height: "100%",
        },
      }}
      ref="map"
      defaultZoom={18}
      center={this.props.mapCenter}>
      {
        this.props.markers.map((marker, index) => {
          return (
            <Marker {...marker} />
          );
        })
      }
      </GoogleMap>
    );
  }
}