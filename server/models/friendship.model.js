const mongoose = require('mongoose');

const FriendshipSchema = new mongoose.Schema({
    requester : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isApproved : {
        type: Boolean,
        default : false // it is initially not approved
    }
}, { timestamps: true });

module.exports.Friendship = mongoose.model('Friendship', FriendshipSchema);
