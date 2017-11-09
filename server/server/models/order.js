var mongoose = require("mongoose"); //  顶会议用户组件

var Schema = mongoose.Schema;   //  创建模型

var ObjectId = Schema.Types.ObjectId;

var orderScheMa = new Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    createTime: {
        type: Number,
        default: Date.now()
    },
    orderStatus: Number,
    orderStatueText: String,
    address: {
        receiveName: String,
        receivePhone: Number,
        receiveProv: String,
        receiveCity: String,
        receiveDistr: String,
        receiveAddr: String
    },
    goodsDetails: {
        goodsId: ObjectId,
        claId: ObjectId,
        goodsName: String,
        goodsImg: String,
        content: String,
        goodsPrice: Number,
        goodsNum: Number,
        inventory: Number,
        isRes: Boolean,
        freight: Number,
        sales: Number
    }
});

orderScheMa.pre('save', function (next) {
    this.createTime = Date.now();

    next()
})

orderScheMa.statics.findByUserId = function (userId, callback) {
    return this.model('orderModels').find(userId, callback);
}

exports.orderModels = mongoose.model('orderModels', orderScheMa);