var fs = require('fs');
// var path = require('path');
var crypto_dev = require('../util/crypto_dev').crypto_dev;

var userModels = require('../models/user').userModels;

var uploadImg = require('../util/uploadImg').uploadImg;

var getUserList = function (req, res, next) {

	var pageData = req.query.page * 7;

	var docData = [],
			docNum = null;

	userModels.find({

		}, {
			userPassword: 0
		}, function (err, doc) {
			docData = doc;
			userModels.count({}, function (err, doc) {
			  	docNum = doc;
			  	res.json({
			  		userList: docData, 
			  		userListNum: docNum
			  	})
			})
	}).skip(pageData).limit(7)
}

var registered = function (req, res, next) {
	var userObj = {
		userName: req.body.userName,
		userPassword: req.body.userPassword
	}
	
	var userEntity = new userModels(userObj);

	userEntity.save(function(err){

	    if (err && err.code == 11000) {
	    	res.send({
	    		msg: 'user has in'
	    	});
	    } else {
	    	res.sendStatus(200);
	    }
	});
}

var login = function (req, res, next) {

	req.body.userPassword = crypto_dev(req.body.userPassword);

	userModels.findOneAndUpdate({
		userName: req.body.userName,
		userPassword: req.body.userPassword
	}, {
		loginTime: Date.now()
	}, function (err, doc) {
		if (err) {
			send(err)
		}

		if (doc) {
			res.json(doc);
		} else {
			res.json({
				msg: '404 not find user',
				code: 999
			})
		}
	})
}

var changeUserImg = function (req, res, next) {
	var devPath = 'user';
	var upUserImg = uploadImg(req.body.newImg,devPath);

  	userModels.findByIdAndUpdate({
		_id: req.body.id
	}, {
		userImg: upUserImg
	}, function (err, doc) {
		if (err) {
			console.log(err)
		}else {
			res.send(upUserImg);
		}
	})
}

module.exports = {
	getUserList,
	registered,
	login,
	changeUserImg
}