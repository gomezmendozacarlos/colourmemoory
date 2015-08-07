var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var memoryModel = new Schema({
	name : {
		type: String
	},
	email : {
		type: String
	},
	rounds : {
		type: String
	}
});

module.exports = mongoose.model('User', memoryModel);	