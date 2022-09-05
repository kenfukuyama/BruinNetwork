const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String,
        required: [true, "Event name is required"],
        minlength: [3, "Event name should be at least 3 characters"]
    },
    description: { type: String,
        required: [true, "Description is required"],
        minlength: [3, "Description should be at least 3 characters"]
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
        required: [true, "Place is required"]
    }
    // categories: [String]


}, { timestamps: true });

module.exports.Event = mongoose.model('Event', EventSchema);


