export default class UserList {

  constructor(sendUpdatedList) {
    this.sendUpdatedList = sendUpdatedList;
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
    this.onlineUsers[id].location = geolocation;
    this.updateUserList();
  }

  removeUser(id, user) {
    delete this.onlineUsers[id];
    this.updateUserList();
  }
}
