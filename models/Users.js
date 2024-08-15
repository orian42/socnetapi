const { Schema, model } = require('mongoose');
const Thought = require('./Thoughts');

// validates the format of an email address
const validateEmail = function(email) {
    const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regex.test(email);
}

// Schema to create a User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Please utilize a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        toJSON: {
            //allows the use of virtuals
            virtuals: true,
        },
        id: false,
    }
);

// retrieves the length of the user's "friends" array
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length
    });

// Initialize User model
const User = model('user', userSchema);

module.exports = User;