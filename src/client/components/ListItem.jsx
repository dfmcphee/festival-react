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
