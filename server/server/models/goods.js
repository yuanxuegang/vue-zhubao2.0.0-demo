var mongoose = require("mongoose"); //  顶会议用户组件

var Schema = mongoose.Schema;   //  创建模型

var ObjectId = Schema.Types.ObjectId;

var goodsScheMa = new Schema({
    claId: {
        type: ObjectId,
        ref: 'goodsClaModels'
    },
    goodsName: String,
    goodsPrice: Number,
    goodsImg: String,
    goodsDetails: String,
    freight: {
        type: Number,
        default: 0
    },
    inventory: {
        type: Number,
        default: 0
    },
    sales: {
        type: Number,
        default: 0
    },
    isRes: {
        type: Boolean,
        default: false
    },
    createTime: {
    	type: Number,
    	default: new Date ().getTime()
    }
});

// // 添加 mongoose 实例方法
// goodsScheMa.methods.findByName = function(name, callback) {
//     return this.model('GoodsModels').find({goodsName: name}, callback);
// }
// // 添加 mongoose 静态方法，静态方法在Model层就能使用
// goodsScheMa.statics.findByPrice = function(price, callback) {
//     return this.model('GoodsModels').find({goodsPrice: price}, callback);
// }
goodsScheMa.pre('save', function (next) {
    if (this.isNew) {
        this.createTime = Date.now();
        next();
    }
})

exports.goodsModels = mongoose.model('goodsModels', goodsScheMa);