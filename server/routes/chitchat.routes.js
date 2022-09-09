const { application } = require('express');
const ChitchatController = require('../controllers/chitchat.controller');

module.exports = function(app) {
    app.get('/api/chitchat/queue', ChitchatController.getQueue);
    app.post('/api/chitchat/join-queue', ChitchatController.joinQueue);
    app.post('/api/chitchat/check-queue', ChitchatController.checkQueue);
    app.post('/api/chitchat/leave-queue', ChitchatController.leaveQueue);

}