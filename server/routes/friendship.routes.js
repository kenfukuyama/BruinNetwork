const FriendshipController = require('../controllers/friendship.controller');

module.exports = function(app){
    // CRUD routes
    app.post('/api/friendships/connect', FriendshipController.connect);
    app.post('/api/friendships/disconnect', FriendshipController.disconnect);
    app.post('/api/friendships/', FriendshipController.findFriendship);
    app.post('/api/friendships/approved', FriendshipController.findApprovedFriends);
    app.post('/api/friendships/pending', FriendshipController.findPendingFriends);
    app.post('/api/friendships/waiting', FriendshipController.findWaitingFriends);

    // app.get('/api/friendships/:id', FriendshipController.getFriendship);
    // app.get('/api/friendships/user/:id', FriendshipController.getAllFriendshipsCreatedByUser);
    // app.post('/api/friendships', FriendshipController.createFriendship);
    // app.put('/api/friendships/:id', FriendshipController.updateFriendship);
    // app.delete('/api/friendships/:id', FriendshipController.deleteFriendship);
    

}