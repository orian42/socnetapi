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
    async createUser(req,res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Find a single user by their ID
    async getSingleUser(req,res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if (!user) {
                return res.status(404).json({message: 'No user with that ID'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a user by their ID
    async updateUser(req,res) {
        try {
            const user = await User.updateOne({ _id: req.params.userId },
                {$set: {
                    "username": req.body.username,
                    "email": req.body.email,
                }}
            )
            .select('-__v');

            if (!user) {
                return res.status(404).json({message: 'No user with that ID'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
        // Delete a single user by their ID
        async deleteUser(req,res) {
            try {
                const user = await User.deleteOne({ _id: req.params.userId })
                .select('-__v');
    
                if (!user) {
                    return res.status(404).json({message: 'No user with that ID'});
                }
    
                res.json(user);
            } catch (err) {
                res.status(500).json(err);
            }
        },
}