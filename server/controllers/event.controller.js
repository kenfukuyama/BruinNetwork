const { Event } = require('../models/event.model');

module.exports.createEvent = (request, response) => {
    // ! you need to edit this for each Schema
    const {name, description, eventDate, startTime, endTime, place} = request.body;
    Event.create({
        name,
        description,
        eventDate,
        startTime,
        endTime,
        place
    })
        .then(event => response.json(event))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllEvents = (request, response) => {
    Event.find({})
        .then(events => response.json(events))
        .catch(err => response.json(err))
}

module.exports.getEvent = (request, response) => {
    Event.findOne({_id:request.params.id})
        .then(event => response.json(event))
        .catch(err => response.json(err))
}


module.exports.updateEvent = (request, response) => {
    Event.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedEvent => response.json(updatedEvent))
        .catch(err => response.json(err))
}

module.exports.deleteEvent = (request, response) => {
    Event.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}