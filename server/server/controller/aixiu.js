var fs = require('fs');

var aixiuModels = require('../models/aixiu').aixiuModels;
var commentModels = require('../models/comment').commentModels;
var userModels = require('../models/user').userModels;

var uploadImg = require('../util/uploadImg').uploadImg;

var getAixiuList_web = function (req, res, next) {
	var userId = req.query.userId;
	var pageData = req.query.num * 7;

	var _query = null;

	if (userId == {} || userId == undefined) {
		userId = {};
		_query = {};
	} else {
		_query = {
			userId: userId
		}
	}

	aixiuModels.find(_query)
	.skip(pageData).limit(7)
	.populate('userId', {
		_id: 1,
		userName: 1,
		userImg: 1
	})
	.exec(function (err, aixiuList) {
		// console.log(aixiuList)
		res.send(aixiuList.reverse());
	})
}

var addAixiuList_web = function (req, res, next) {

	var devPath = 'aixiu';
	var contentImg = uploadImg(req.body.contentImg,devPath)

	var aixiuObj = {
		userId: req.body.userId,
		content: req.body.content,
		contentImg: contentImg
	}


	var aixiuEntity = new aixiuModels(aixiuObj)

	aixiuEntity.save(function (err) {
		if (err) {
			console.log(err);
		} else {
	    	res.sendStatus(200);
		}
	})
}

var getAixiuListDetails_web = function (req, res, next) {
	var id = req.query.id;

	aixiuModels
	.findById({
		_id: id
	})
	.populate('userId', {
		_id: 1,
		userName: 1,
		userImg: 1
	})
	.exec(function (err, aixiuDetails) {
		commentModels
		.find({
			aixiuDetails: id
		})
		.populate('fromUser', {
			_id: 1,
			userName: 1,
			userImg: 1
		})
		.exec(function (err, aixiuDetailsWithComments) {
			console.log(aixiuDetails)
			console.log(aixiuDetailsWithComments)
			res.json({
				aixiuDetails,
				aixiuDetailsWithComments
			})
		})
	})
}

var getAixiuList = function (req, res, next) {
	var pageData = req.query.page * 7;

	aixiuModels.find()
	.sort({createTime: 1})
	.skip(pageData).limit(7)
	.populate('userId', {
		_id: 1,
		userName: 1,
		userImg: 1
	})
	.exec(function (err, aixiuList) {
		aixiuModels.count({}, function (err, doc) {
		  	res.json({
		  		aixiuList,
		  		aixiuListNum: doc
		  	})
		})
	})
}

var delAixiu = function (req, res, next) {
	var id = req.query._id;
	aixiuModels.findByIdAndRemove(id, function (err) {
		if (err) {
			send(err)
		} else {
			res.sendStatus(200)
		}
	})
}

var getAixiuListDetails = function (req, res, next) {
	getAixiuListDetails_web.apply(this, [req, res, next])
}

module.exports = {
	getAixiuList_web,
	addAixiuList_web,
	getAixiuListDetails_web,
	getAixiuList,
	delAixiu,
	getAixiuListDetails
}