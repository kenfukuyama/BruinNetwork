const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        minlength: [2, "username must be 2 characters or longer"],
        unique : "username is taken"
    },
    nickname: {
        type: String,
        required: [true, "nickname is required"],
        minlength: [2, "nickname must be 2 characters or longer"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        },
        unique : "email is taken"
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },

    // ! created events
    savedEvents: { type: mongoose.Schema.Types.Mixed, default: {} },
    // ! optional information
    major :{
        type : String,
        default : ""
    },
    year :{ type: mongoose.Schema.Types.Mixed, 
        default: ["-1", "" ]
    },
    bio : {
        type : String,
        default : ""
    },
    instagramUsername :{
        type : String,
        default : ""
    },
    contacts : {
        type: mongoose.Schema.Types.Mixed
        , default: [["", true], ["", true], ["", true]]
    },
    interests: { type: mongoose.Schema.Types.Mixed, default: {} },


}, { timestamps: true, minimize: false });


// add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);


// this is there, so no arrow functions should be used.
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next(); //normal validatio should run now.
});

UserSchema.pre('save', function (next) {
    // 10 is the route of salt
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

UserSchema.plugin(uniqueValidator);
module.exports.User = mongoose.model('User', UserSchema);


