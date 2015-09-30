export default class UserList {

  constructor(sendUpdatedList, sendNewLocation) {
    this.sendUpdatedList = sendUpdatedList;
    this.sendNewLocation = sendNewLocation;
    this.onlineUsers = {};
  }

  updateUserList() {
    this.sendUpdatedList();
  }

  addUser(id) {
    this.onlineUsers[id] = {
      id: id,
      name: 'Anonymous',
      location: false
    };

    this.updateUserList();
  }

  updateName(id, name){
    if (name !== '') {
      this.onlineUsers[id].name = name;
    } else {
      this.onlineUsers[id].name = 'Anonymous';
    }

    this.updateUserList();
  }

  updateLocation(id, geolocation) {
    if (!this.onlineUsers[id].location) {
      this.sendNewLocation({location: geolocation});
    }
    this.onlineUsers[id].location = geolocation;
    this.updateUserList();
  }

  removeUser(id, user) {
    delete this.onlineUsers[id];
    this.updateUserList();
  }
}
