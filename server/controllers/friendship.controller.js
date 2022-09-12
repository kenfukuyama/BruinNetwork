const mongoose = require('mongoose');
const { Friendship } = require('../models/friendship.model');
const { User } = require('../models/user.model');

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
                // console.log("some one send me the request i am trying to approve");
                return Friendship.findOneAndUpdate({_id: friendship[0]._id}, {isApproved: true}, {new:true})
            } else {
                // * do nohthing you sending it twice
                // console.log(tempUserId1);
                // console.log(friendship[0].recipient);
                return Promise.reject({msg : "sending friendship multiple times"});
            }
        }
        else {
            // console.log("need to create friendship");
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

module.exports.findFriendship = (request, response) => {
    const {requesterId, recipientId} = request.body;
    let tempUserId1 = mongoose.Types.ObjectId(requesterId);
    let tempUserId2 = mongoose.Types.ObjectId(recipientId);

    // first see if the friendship exists
    Friendship.find({requester : {$in: [tempUserId1, tempUserId2]}, recipient : {$in: [tempUserId1, tempUserId2]} })
    .then(friendship => {
        if (friendship.length > 0) {
            response.status(200).json(friendship[0]);
        }
        else {
            response.status(204).json({});
        }
    })
    .catch(err => response.status(400).json(err));
}

module.exports.findApprovedFriends = (request, response) => {
    const {userId} = request.body;
    let tempUserId = mongoose.Types.ObjectId(userId);

    // first see if the friendship exists
    Friendship.find({$or: [{requester : tempUserId}, {recipient : tempUserId}], isApproved: true})
    .then(approvedFriendship => {
        // console.log(friends);
        let friendIds = [];

        for (const friendship of approvedFriendship) {
            if (friendship.requester.equals(tempUserId)) {
                friendIds.push(friendship.recipient);
            }
            else {
                friendIds.push(friendship.requester);
            }
        }

        // let friendIds = [ '631c410758bcce879ec14d16' ]
        // console.log(friendIds);
        return (User.find({_id : {$in: friendIds}}))
    })
    .then(friends => response.status(200).json(friends))
    .catch(err => response.status(400).json(err));
}


module.exports.findPendingFriends = (request, response) => {
    const {userId} = request.body;
    let tempUserId = mongoose.Types.ObjectId(userId);

    // first see if the friendship exists
    Friendship.find({requester : tempUserId, isApproved: false})
    .then(approvedFriendship => {
        // console.log(friends);
        let friendIds = [];

        for (const friendship of approvedFriendship) {
            friendIds.push(friendship.recipient);
        }

        // let friendIds = [ '631c410758bcce879ec14d16' ]
        // console.log(friendIds);
        return (User.find({_id : {$in: friendIds}}))
    })
    .then(friends => response.status(200).json(friends))
    .catch(err => response.status(400).json(err));
}

module.exports.findWaitingFriends = (request, response) => {
    const {userId} = request.body;
    let tempUserId = mongoose.Types.ObjectId(userId);

    // first see if the friendship exists
    Friendship.find({recipient : tempUserId, isApproved: false})
    .then(approvedFriendship => {
        // console.log(friends);
        let friendIds = [];

        for (const friendship of approvedFriendship) {
            friendIds.push(friendship.requester);
        }

        // let friendIds = [ '631c410758bcce879ec14d16' ]
        // console.log(friendIds);
        return (User.find({_id : {$in: friendIds}}))
    })
    .then(friends => response.status(200).json(friends))
    .catch(err => response.status(400).json(err));
}