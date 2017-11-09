var mongoose = require("mongoose"); //  顶会议用户组件
var crypto_dev = require('../util/crypto_dev').crypto_dev;

var Schema = mongoose.Schema;   //  创建模型
var userScheMa = new Schema({
    userName: {
        type: String,
        unique: true
    },
    userPassword: String,
    userImg: {
        type: String,
        default: '/images/user/timg.jpg'
    },
    RegistrationTime: {
        type: Number,
        default: Date.now()
    },
    loginTime: {
        type: Number,
        default: Date.now()
    }
});

userScheMa.pre('save', function (next) {
    if (this.isNew) {
        this.RegistrationTime = this.loginTime = Date.now();
    } else {
        this.loginTime = Date.now();
    }

    this.userPassword = crypto_dev(this.userPassword)

    next()
})

// 添加 mongoose 静态方法，静态方法在Model层就能使用
// userScheMa.statics.login = function(userData, callback) {
//     return this.model('userModels').find(userData, callback);
// }

exports.userModels = mongoose.model('userModels', userScheMa);