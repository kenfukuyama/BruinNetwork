const { User } = require('../models/user.model');
const { Event } = require('../models/event.model');
const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken');

const envKey =process.env.key;

// module.exports.createUser = (request, response) => {
//     // ! you need to edit this for each Schema
//     User.create(request.body)
//         .then(user => response.json(user))
//         .catch(err => response.status(400).json(err));
// }

module.exports.getAll = (request, response) => {
    User.find({})
        .then(users => response.json(users))
        .catch(err => response.json(err))
}

module.exports.getUser = (request, response) => {
    User.findOne({_id:request.params.id})
        .then(user => response.json(user))
        .catch(err => response.json(err))
}


module.exports.getSavedEvents = (request, response) => {
    // console.log(request.params.id);
    User.find({_id:request.params.id})
    .then(users => {
        // let user = users[0].savedEvents;
        // console.log(Object.keys(user));
        let savedEvents = Object.keys(users[0].savedEvents);
        return (Event.find({_id : {$in: savedEvents}}))
        // response.status(200).json(users)
    })
    .then(events => response.status(200).json(events))
    .catch(err => response.status(400).json(err))
    // response.status(500).json({msg: "found saved events"})

}


module.exports.updateUser = (request, response) => {
    // console.log(request.body);
    if (request.params.id !== request.body._id) {
        response.status(404).json({msg : "unauthorized"});
        return;
    }
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedUser => response.json({msg: "updated" ,...updatedUser}))
        .catch(err => response.json(err))
    // response.status(200).json({msg: "updated"});
}



// module.exports.deleteUser = (request, response) => {
//     User.deleteOne({ _id: request.params.id })
//         .then(deleteConfirmation => response.json(deleteConfirmation))
//         .catch(err => response.json(err))
// }




// login
module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
        // email not found in users collection
        console.log("no user found");
        return res.sendStatus(400);
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        // password wasn't a match!
        console.log("wrong password");
        return res.sendStatus(400);
    }

    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, envKey);

    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, envKey, {
            httpOnly: true
        })
        .json({ msg: "success!", user: user, userToken: userToken});
}

// register
module.exports.register = (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, envKey);

            res
                .cookie("usertoken", userToken, envKey, {
                    httpOnly: true
                })
                .json({ msg: "success!", user: user, userToken: userToken});
        })
        .catch(err => res.json(err));
}


module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

// console.log(envKey);