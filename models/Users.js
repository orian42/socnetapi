const { Schema, model } = require('mongoose');

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
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please utilize a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
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