const { connect, connection } = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/socNetAPI';

connect(mongoURI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = connection;