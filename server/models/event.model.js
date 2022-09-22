const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');


// unique : "validation message";
// EventSchema.plugin(uniqueValidator);

const EventSchema = new mongoose.Schema({
    name: { type: String,
        required: [true, "Event name is required"],
        minlength: [3, "Event name must be at least 3 characters"],
        maxlength: [30, "Event name must be between 3 and 30 characters"]
    },
    description: { type: String,
        required: [true, "Description is required"],
        minlength: [10, "Description must be at least 10 characters"],
        maxlength: [500, "Description must be between 10 and 500 characters"]
    },
    eventDate: { type: Date,
        required: [true, "Event date is required"]
    },
    startTime: { type: Date,
        required: [true, "Start time is required"]
    },
    endTime: { type: Date,
        required: [true, "End time is required"]
    },
    place: { type: String,
        required: [true, "Place is required"],
        maxlength: [249, "Place must be shorter than 250 characters. If you want to put a link, please put it in the description."]
    },
    creator : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    link : {
        type: String,
        maxlength: [500, "Description must be 500 characters or shorter"]
    },
    contactInfo : {
        type: String,
        maxlength: [100, "Description must be 100 characters or shorter"]
    },
    tags: {
        type: mongoose.Schema.Types.ObjectId,
        default : {}
    }


}, { timestamps: true });


module.exports.Event = mongoose.model('Event', EventSchema);


