const { Schema, Types } = require('mongoose');

// formats the date in the createdAt property
const formatDate = function(date) {
    return date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Schema to create Reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        }
    },
    {
        toJSON: {
            //allows the use of getters
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;