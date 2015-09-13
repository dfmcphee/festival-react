jest.dontMock('../../src/client/components/ListItem.js');

describe('ListItem', function() {
  it('renders name', function() {
    var React = require('react/addons');
    var ListItem = require('../../src/client/components/ListItem.js');
    var TestUtils = React.addons.TestUtils;

    var user = {
      name: 'Joe',
      location: {
        latitude: 1,
        longitude: 2
      }
    };

    // Render a ListItem component in the DOM
    var listitem = TestUtils.renderIntoDocument(
      <ListItem user={user} />
    );

    // Find the heading and check that it contains the name Joe
    var name = TestUtils.findRenderedDOMComponentWithTag(listitem, 'h3');
    expect(React.findDOMNode(name).textContent).toEqual('Joe');
  });

  it('renders without location', function() {
    var React = require('react/addons');
    var ListItem = require('../../src/client/components/ListItem.js');
    var TestUtils = React.addons.TestUtils;

    var user = {
      name: 'Joe',
      location: false
    };

    // Render a ListItem component in the DOM
    var listitem = TestUtils.renderIntoDocument(
      <ListItem user={user} />
    );

    // Make sure no element is output for missing location
    var location = TestUtils.scryRenderedDOMComponentsWithTag(listitem, 'p');
    expect(location.length).toEqual(0);
  });

  it('renders with location', function() {
    var React = require('react/addons');
    var ListItem = require('../../src/client/components/ListItem.js');
    var TestUtils = React.addons.TestUtils;

    var user = {
      name: 'Joe',
      location: {
        latitude: 1,
        longitude: 2
      }
    };

    // Render a ListItem component in the DOM
    var listitem = TestUtils.renderIntoDocument(
      <ListItem user={user} />
    );

    // Make an element is output containing location
    var location = TestUtils.findRenderedDOMComponentWithTag(listitem, 'p');
    expect(React.findDOMNode(location).textContent).toEqual('1 2');
  });
});
