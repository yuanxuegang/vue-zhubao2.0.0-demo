var mongoose = require("mongoose"); //  顶会议用户组件

var Schema = mongoose.Schema;   //  创建模型

var ObjectId = Schema.Types.ObjectId;

var addressScheMa = new Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    createTime: {
        type: Number,
        default: Date.now()
    },
    address: {
        receiveName: String,
        receivePhone: Number,
        receiveProv: String,
        receiveCity: String,
        receiveDistr: String,
        receiveAddr: String
    }
});

addressScheMa.pre('save', function (next) {
    this.createTime = Date.now();

    next()
})

addressScheMa.statics.findByUserId = function(userId, callback) {
    return this.model('addressModels').find(userId, callback);
}

exports.addressModels = mongoose.model('addressModels', addressScheMa);