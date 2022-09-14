let queueObject = require('../data/chitchatQueue');

// extra files
const colors =  require('colors');
colors.enable();



module.exports.joinQueue = (request, response) => {
    // console.log(request.body);
    if (!request.body.userId) {
        response.status(400).json({msg: "no userId specified"});
        return;
    }
    let obj = {};
    obj[request.body.userId] = {otherUserId :null, roomId: null, timestamp : new Date()};
    queueObject = {...queueObject, ...obj};
    response.status(200).json({msg: "joined the queue", ...queueObject});
}


module.exports.getQueue = (request, response) => {
    response.status(200).json(queueObject);
}

module.exports.leaveQueue = (request, response) => {
    // console.log(request.body);
    if (!request.body.userId) {
        response.status(400).json({msg: "no userId specified"});
        return;
    }
    if (!(request.body.userId in queueObject)) {
        response.status(204).json({msg: "user not in queue"});
        return;
    }

    delete queueObject[request.body.userId];
    response.status(200).json({msg: "left the queue", ...queueObject});
}


module.exports.getQueue = (request, response) => {
    response.status(200).json(queueObject);
}


module.exports.checkQueue = (request, response) => {
    // console.log("checking queue");
    // console.log(request.body);
    let userId = request.body.userId;
    // console.log(userId);
    

    if (!(userId in queueObject)) {
        // response.status(400).json({msg: "user not in queue"});
        // return;
        let obj = {};
        obj[request.body.userId] = {otherUserId :null, roomId: null, timestamp : new Date()};
        queueObject = {...queueObject, ...obj};
        response.status(201).json({msg: "joined the queue", ...queueObject});
        return;
    }

    // console.log(queueObject[userId].otherUserId);



    // response.status(200).json({msg: "checking"});

    if (queueObject[userId].otherUserId !== null) {
        // remove it from the queu
        // console.log("they already have a match");
        let resObj = {};
        resObj[userId] = {otherUserId:queueObject[userId].otherUserId, roomId: queueObject[userId].roomId};

        delete queueObject[userId];
        response.status(200).json(resObj);
        return;
        // console.log("")
    }

    if (queueObject[userId].otherUserId === null) {
        // console.log("they don't have a match yet");
        for (let iterateUserId in queueObject) {
            if (iterateUserId !== userId && queueObject[iterateUserId].otherUserId === null) {
                // crated a connection
                // console.log("found the match");
                let combinedRoomId = userId + iterateUserId;
                // setting for other users
                queueObject[iterateUserId].otherUserId = userId;
                queueObject[iterateUserId].roomId = combinedRoomId;

                // setting for myself
                queueObject[userId].otherUserId = iterateUserId;
                queueObject[userId].roomId = combinedRoomId;

                let resObj = {};
                // resObj[userId].otherUserId = iterateUserId;
                // resObj[userId].roomId = combinedRoomId;
                resObj[userId] = {otherUserId:iterateUserId, roomId: combinedRoomId};

                delete queueObject[userId];
                response.status(200).json(resObj);
                return;
            }
        }
        // if you get here you could not find otherusers
        response.status(204).json({msg: "no avaiable user in the queue right now"});

        
    }

}

// * functions to clear and check the queue
setInterval(() => {
    // remove users after 3 minutes
    // console.log(colors.cyan(queueObject));


    // ! clear the queue frequecy
    let removeIntervalInMS= 120 * 1000;
    let now = new Date();

    for (let iterateUserId in queueObject) {
        // console.log((now - (queueObject[iterateUserId].timestamp.getTime())) / 1000);

        // you have queus that's over the limit
        if ((now - (queueObject[iterateUserId].timestamp.getTime())) > removeIntervalInMS ) {
            delete queueObject[iterateUserId];
        }
    }

}, 15 * 1000);  // ! frequecy for checking the old people in queue
