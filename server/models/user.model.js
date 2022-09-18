const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        minlength: [3, "username must be 3 characters or longer"],
        unique : "username is taken",
        maxlength: [30, "username must be 30 character or shorter"]
    },
    nickname: {
        type: String,
        required: [true, "nickname is required"],
        minlength: [3, "nickname must be 3 characters or longer"],
        maxlength: [30, "nickname must be 30 character or shorter"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        },
        unique : "email is taken",
        maxlength: [320, "email must be 320 character or shorter"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"],
        maxlength: [256, "Password must be between 8 to 256 characters"]
    },

    // ! created events
    savedEvents: { type: mongoose.Schema.Types.Mixed, default: {} },
    // ! optional information
    major :{
        type : String,
        default : "",
        maxlength: [50, "Major must be 50 characters or shorter. If you have a long major name, please use an acronym."]
    },
    year :{ type: mongoose.Schema.Types.Mixed, 
        default: ["-1", "" ]
    },
    bio : {
        type : String,
        default : "",
        maxlength: [200, "bio must be 200 characters or shorter"]
    },
    instagramUsername :{
        type : String,
        default : "",
        maxlength: [30, "instagram username must be 30 characters or shorter"]
    },
    contacts : {
        type: mongoose.Schema.Types.Mixed
        , default: [["", true], ["", true], ["", true]]
    },
    interests: { 
        type: mongoose.Schema.Types.Mixed, 
        default: {} 
    },
    spirits : {
        type: Number,
        default: 5
    },
    spiritsCount : {
        type: Number,
        default : 0
    },
    spiritsNotifications : {
        type: mongoose.Schema.Types.Mixed,
        default: []
    },
    recentRooms : {
        type: mongoose.Schema.Types.Mixed,
        default: [-1, -1, -1]
    }

}, { timestamps: true, minimize: false });


// add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);


// this is there, so no arrow functions should be used.
UserSchema.pre('validate', function (next) {
    // console.log(this.password);
    if (this.password !== this.confirmPassword) {
        // console.log(this.confirmPassword);
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


