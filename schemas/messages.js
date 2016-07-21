var mongoose = require('mongoose');

module.exports = mongoose.model('Messages',{
	text: String,
	roomId: String,
	userId: String,
	id: String
});