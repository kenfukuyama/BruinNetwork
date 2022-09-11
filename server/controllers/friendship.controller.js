const mongoose = require('mongoose');
const { Friendship } = require('../models/friendship.model');

module.exports.connect = (request, response) => {
    const {requesterId, recipientId} = request.body;
    // console.log(userId.length);
    let tempUserId1 = mongoose.Types.ObjectId(requesterId);
    let tempUserId2 = mongoose.Types.ObjectId(recipientId);

    // first see if the friendship exists
    Friendship.find({requester : {$in: [tempUserId1, tempUserId2]}, recipient : {$in: [tempUserId1, tempUserId2]} })
    .then(friendship => {

        if (friendship.length > 0) {
            // * found freindship
            // friendship[0].isApproved = true;
            if (tempUserId1.equals(friendship[0].recipient)) {
                // * you make the api call but you are recipent
                console.log("some one send me the request i am trying to approve");
                return Friendship.findOneAndUpdate({_id: friendship[0]._id}, {isApproved: true}, {new:true})
            } else {
                // * do nohthing you sending it twice
                console.log(tempUserId1);
                console.log(friendship[0].recipient);
                return Promise.reject({msg : "sending friendship multiple times"});
            }
        }
        else {
            console.log("need to create friendship");
            return Friendship.create({requester : tempUserId1, recipient : tempUserId2})
        }
        // response.status(200).json(users)
    })
    .then (friendship => {
        response.status(200).json(friendship)
    })
    .catch(err => response.status(400).json(err));
}


module.exports.disconnect = (request, response) => {
    const {requesterId, recipientId} = request.body;
    let tempUserId1 = mongoose.Types.ObjectId(requesterId);
    let tempUserId2 = mongoose.Types.ObjectId(recipientId);

    // first see if the friendship exists
    Friendship.find({requester : {$in: [tempUserId1, tempUserId2]}, recipient : {$in: [tempUserId1, tempUserId2]} })
    .then(friendship => {
        if (friendship.length > 0) {
            // * found freindship
            return Friendship.deleteMany({ _id: friendship[0]._id })
        }
    })
    .then (friendship => {
        response.status(200).json(friendship)
    })
    .catch(err => response.status(400).json(err));
}