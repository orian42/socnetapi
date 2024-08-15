const { Schema, model } = require('mongoose');
const Reaction = require('./Reactions');

// formats the date in the createdAt property
const formatDate = function(date) {
    return date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
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
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction',
            }
        ] 
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