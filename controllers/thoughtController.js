const Thought = require('../models/Thoughts');
const User = require('../models/Users');

module.exports = {
    // Find all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // Create new thought
    async createThought(req, res) {
        try {
            const user = await User.findOne({ _id: req.body.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            const thoughtData = await Thought.create(req.body);

            const updatedUser = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );


            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Find a single thought by its ID
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a thought by its ID
    async updateThought(req, res) {
        try {
            const thought = await Thought.updateOne({ _id: req.params.thoughtId },
                {
                    $set: {
                        "thoughtText": req.body.thoughtText,
                    }
                }
            )
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a single thought by its ID
    async deleteThought(req, res) {
        try {
            const thought = await Thought.deleteOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // // Add friend to a specific user
    // async addFriend(req, res) {
    //     try {
    //         const friend = await User.findOne({ _id: req.params.friendId });

    //         if (!friend) {
    //             return res.status(404).json({ message: 'No friend-user with this id!' });
    //         }

    //         const user = await User.findOneAndUpdate(
    //             { _id: req.params.userId },
    //             { $push: { friends: req.params.friendId } },
    //             { new: true }
    //         );

    //         if (!user) {
    //             return res
    //                 .status(404)
    //                 .json({ message: 'Attempted to add friend but no user with this id!' });
    //         }

    //         res.json({ message: 'Friend successfully added!' });
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // },
    //     // Remove a singgle friend by their ID from a specific user
    //     async removeFriend(req, res) {
    //         try {
    //             const friend = await User.findOne({ _id: req.params.friendId });

    //             if (!friend) {
    //                 return res.status(404).json({ message: 'No friend-user with this id!' });
    //             }

    //             const user = await User.findOneAndUpdate(
    //                 { _id: req.params.userId },
    //                 { $pull: { friends: req.params.friendId } },
    //                 { new: true }
    //             );

    //             if (!user) {
    //                 return res
    //                     .status(404)
    //                     .json({ message: 'Attempted to remove friend but no user with this id!' });
    //             }

    //             res.json({ message: 'Friend successfully removed!' });
    //         } catch (err) {
    //             res.status(500).json(err);
    //         }
    //     },
}