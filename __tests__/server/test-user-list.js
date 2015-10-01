jest.dontMock('../../src/server/models/UserList.js');

var callback = function(){};

describe('UserList', function() {
  it('can add an Anonymous user', function() {
    var UserList = require('../../src/server/models/UserList.js');
    var Users = new UserList(callback);
    Users.addUser(1);
    expect(Users.onlineUsers[1].name).toEqual('Anonymous');
  });

  it('can update user name', function() {
    var UserList = require('../../src/server/models/UserList.js');
    var Users = new UserList(callback);
    Users.addUser(1);
    Users.updateName(1, 'Bob');
    expect(Users.onlineUsers[1].name).toEqual('Bob');
  });

  it('can update user location', function() {
    var UserList = require('../../src/server/models/UserList.js');
    var Users = new UserList(callback, callback);

    var location = {
      latitude: 13.56,
      longitude: 15.22
    };

    Users.addUser(1);
    Users.updateLocation(1, location);
    expect(Users.onlineUsers[1].location).toEqual(location);
  });

  it('can delete a user', function() {
    var UserList = require('../../src/server/models/UserList.js');
    var Users = new UserList(callback);

    Users.addUser(1);
    Users.removeUser(1);

    var userExists = 1 in Users.onlineUsers;
    expect(userExists).toEqual(false);
  });
});
