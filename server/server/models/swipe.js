var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var swipeSchema = new Schema({
	swipeImg: String,
	createTime: {
		type: Number,
		default: Date.now()
	}
})

exports.swipeModels = mongoose.model('swipeModels', swipeSchema);