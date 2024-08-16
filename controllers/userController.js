const User = require('../models/Users');

module.exports = {
    // Find all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create new User
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Find a single user by their ID
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('thoughts')
                .populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a user by their ID
    async updateUser(req, res) {
        try {
            const user = await User.updateOne({ _id: req.params.userId },
                {
                    $set: {
                        "username": req.body.username,
                        "email": req.body.email,
                    }
                }
            )
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a single user by their ID
    async deleteUser(req, res) {
        try {
            const user = await User.deleteOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add friend to a specific user
    async addFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });

            if (!friend) {
                return res.status(404).json({ message: 'No friend-user with this id!' });
            }

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Attempted to add friend but no user with this id!' });
            }

            res.json({ message: 'Friend successfully added!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove a singgle friend by their ID from a specific user
    async removeFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });

            if (!friend) {
                return res.status(404).json({ message: 'No friend-user with this id!' });
            }

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Attempted to remove friend but no user with this id!' });
            }

            res.json({ message: 'Friend successfully removed!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
}