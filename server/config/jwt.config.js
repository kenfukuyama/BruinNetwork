const jwt = require("jsonwebtoken");

require('dotenv').config();


module.exports.authenticate = (req, res, next) => {
    // console.log(process.env.key);
    // console.log(req.cookies);
    jwt.verify(req.cookies.usertoken, process.env.key, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}