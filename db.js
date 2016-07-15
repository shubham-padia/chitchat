var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chitchat');

module.exports = mongoose.connection;