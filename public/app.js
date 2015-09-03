var socket = io();

// Event when a new user list is sent from server
socket.on('onlineUsersUpdated', function(data){
  // Empty old list
  $onlineUsers = $('#online-users').empty();

  // Loop through new users and add each to the list
  for (userId in data.onlineUsers) {
    var user = data.onlineUsers[userId];
    var name = user.name + ' - ' + userId;
    $('<p />').append(name).appendTo($onlineUsers);
  }
});

// Event when the join button is pressed
$('#join').click(function(){
  // Send the user's name to the server
  socket.emit('identify', $('#name').val());

  // Clear the name input
  $('#name').val('');
});
