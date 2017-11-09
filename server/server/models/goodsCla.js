var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var goodsClaSchema = new Schema({
	claName: {
		type: String,
		unique: true
	},
	createTime: {
		type: Number,
		default: Date.now()
	}
})

goodsClaSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createTime = Date.now();
        next();
    }
})

exports.goodsClaModels = mongoose.model('goodsClaModels', goodsClaSchema);