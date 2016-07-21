 var mongoose = require('mongoose');

module.exports = mongoose.model('Rooms',{
	name: String,
	id: String
});