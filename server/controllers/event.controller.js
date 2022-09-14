const { Event } = require('../models/event.model');
// const { User } = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.createEvent = (request, response) => {
    // ! you need to edit this for each Schema
    const {name, description, eventDate, startTime, endTime, place, userId} = request.body;
    // console.log(userId.length);
    let tempUserId = mongoose.Types.ObjectId(userId);
    Event.create({
        name,
        description,
        eventDate,
        startTime,
        endTime,
        place,
        creator:tempUserId,
    })
        .then(event =>{ 
            response.json(event);
            // console.log(event.id);
            // User.findById(userId.trim())
            // .then(user => {
            //     // console.log(user);
            //     user.posts.push(event.id);
            //     console.log(user.posts);
            //     // User.findOneAndUpdate({_id: userId.trim()}, {posts : [...posts]}, {new:true})
            //     // .then(res => response.json(res))
            //     // .catch(err => response.json(err))
            //     user.confirmPassword = user.password;
            //     user.save().then(res => response.json(user)).catch(err => response.status(400).json(err));
            //     // response.json(user);
            // })
            // // .catch(err => response.status(400).json(err));
            

        })
        .catch(err => response.status(400).json(err));
}

module.exports.getAllEvents = (request, response) => {
    Event.find({})
        .then(events => response.json(events))
        .catch(err => response.json(err))
}

module.exports.getAllEventsCurrent = (request, response) => {
    // TODO update this for better date time performance
    let date = new Date();
    date.setDate(date.getDate() - 1);
    date.setUTCHours(0, 0, 0, 0);
    // console.log(date);
    // console.log(date);
    Event.find({eventDate : {$gte : date}})
        .then(events => response.json(events))
        .catch(err => response.json(err))
}


module.exports.getAllEventsCreatedByUser = (request, response) => {
    Event.find({creator: request.params.id})
        .then(events => response.json(events))
    .catch(err => response.json(err))
}


module.exports.getEvent = (request, response) => {
    Event.findOne({_id:request.params.id})
        .then(event => response.json(event))
        .catch(err => response.json(err))
}


module.exports.updateEvent = (request, response) => {
    // console.log(request.body);
    Event.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedEvent => response.json(updatedEvent))
        .catch(err => response.status(400).json(err))
}

module.exports.deleteEvent = (request, response) => {
    Event.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}