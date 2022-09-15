
const BotController = require('../controllers/Bot.controller');
// const ChitchatController = require('../controllers/chitchat.controller');

// console.log("runing this");
module.exports = function(app) {
    app.post('/api/bot/search', BotController.getSearchResult);
    // app.get('/api/bot/queue', ChitchatController.getQueue);
}