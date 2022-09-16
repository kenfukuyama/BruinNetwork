
const BotController = require('../controllers/bot.controller');
// const ChitchatController = require('../controllers/chitchat.controller');

// console.log("runing this");
module.exports = function(app) {
    app.post('/api/bot/search', BotController.getSearchResult);
    app.post('/api/bot/chat', BotController.getAssistantResponse);
    // app.get('/api/bot/queue', ChitchatController.getQueue);
}