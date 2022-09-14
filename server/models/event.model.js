const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');


// unique : "validation message";
// EventSchema.plugin(uniqueValidator);

const EventSchema = new mongoose.Schema({
    name: { type: String,
        required: [true, "Event name is required"],
        minlength: [3, "Event name must be at least 3 characters"]
    },
    description: { type: String,
        required: [true, "Description is required"],
        minlength: [10, "Description must be at least 10 characters"]
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
    },
    creator : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    // categories: [String]
}, { timestamps: true });


module.exports.Event = mongoose.model('Event', EventSchema);


