var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

var aixiuSchema = new Schema({
	userId: {
		type: ObjectId,
		ref: 'userModels'
	},
	createTime: {
		type: Number,
		default: Date.now()
	},
	content: String,
	contentImg: String,
	like: {
		type: Number,
		default: 0
	}
})

aixiuSchema.pre('save', function (next) {
	this.createTime = Date.now();
    next()
})

exports.aixiuModels = mongoose.model('aixiuModels', aixiuSchema);