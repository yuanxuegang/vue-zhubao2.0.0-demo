var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var commentSchema = new Schema({
	aixiuDetails: {
		type: ObjectId,
		ref: 'aixiuModels'
	},
	fromUser: {
		type: ObjectId,
		ref: 'userModels'
	},
	// to: {
	// 	type: ObjectId,
	// 	ref: 'userModels'
	// },
	comments: {
		type : String
	},
	createTime: {
		type: Number,
		default: Date.now()
	}
})

commentSchema.pre('save', function (next) {
	this.createTime = Date.now();
    next()
})

exports.commentModels = mongoose.model('commentModels', commentSchema);