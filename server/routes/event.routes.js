const EventController = require('../controllers/event.controller');

module.exports = function(app){
    // CRUD routes
    app.get('/api/events', EventController.getAllEvents);
    app.get('/api/events/current', EventController.getAllEventsCurrent);
    app.get('/api/events/:id', EventController.getEvent);
    app.get('/api/events/user/:id', EventController.getAllEventsCreatedByUser);
    app.post('/api/events', EventController.createEvent);
    app.put('/api/events/:id', EventController.updateEvent);
    app.delete('/api/events/:id', EventController.deleteEvent);
    

}