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
    }
}, { timestamps: true });

module.exports.Event = mongoose.model('Event', EventSchema);