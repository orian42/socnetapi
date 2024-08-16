const { Schema, Types } = require('mongoose');
const { format }  = require('date-fns');

// formats the date in the createdAt property
const formatDate = function(date) {
    return format(date, 'MM/dd/yyyy @ HH:mm:ss');
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