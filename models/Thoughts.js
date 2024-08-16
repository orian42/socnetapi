const { Schema, model } = require('mongoose');
const Reaction = require('./Reactions');
const { format }  = require('date-fns');

// formats the date in the createdAt property
const formatDate = function(date) {
    return format(date, 'MM/dd/yyyy @ HH:mm:ss');
};

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ Reaction ],
    },
    {
        toJSON: {
            //allows the use of virtuals and getters
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// retrieves the length of the user's "reactions" array
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length
    });

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;