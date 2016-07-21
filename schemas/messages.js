var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	text: String,
	roomId: String,
	userId: String,
	id: String
});