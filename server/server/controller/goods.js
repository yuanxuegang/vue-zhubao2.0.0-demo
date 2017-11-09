var fs = require('fs');
var path = require('path');

var goodsModels = require('../models/goods').goodsModels;
// var goodsClaModels = require('../models/goodsCla').goodsClaModels;

var uploadImg = require('../util/uploadImg').uploadImg;

var getResGoods_web = function (req, res, next) {
	goodsModels.find({
		isRes: true
	}).exec(function (err, resGoodsList) {
		res.json(resGoodsList);
	})
}

var getGoodsList_web = function (req, res, next) {
	var claId = req.query.claId;
	var pageData = req.query.num * 7;
	
	goodsModels.find({
		claId: claId
	})
	.skip(pageData).limit(7)
	.exec(function (err, goodsList) {
		res.send(goodsList)
	})
}

var getGoodsDetails_web = function (req, res, next) {
	var id = req.query._id;

	goodsModels.findById(id).exec(function (err, goodsDetails) {
		res.json(goodsDetails);
	})

	// 下面这样子也可以查询，但是返回的结果是一个数组包住一层的

	// goodsModels.find({
	// 	_id: req.query._id
	// }).exec(function (err, goodsDetails) {
	// 	res.json(goodsDetails);
	// })
}

var getGoodsList = function (req, res, next) {
	// http://localhost:3000/goodsList?page=1      这样可以查看数据
	var pageData = req.query.page * 7;
	var claId = req.query.checkInClaId;

	var docData = [],
		docNum = null;

	console.log(claId)

	var _query = {
		claId: {$in: claId}
	}

	if (claId == {} || claId == undefined) {
		claId = {};
		_query = {};
	}

	if (claId[0] == 'min') {
		claId = {};
		_query = {no: 'min'};
	}

	goodsModels.find(_query, function (err, doc) {

	  	docData = doc;

	  	goodsModels.count(_query, function (err, doc) {
		  	docNum = doc;
		  	res.json({
		  		goodsList: docData, 
		  		goodsListNum: docNum
		  	})
		})


	}).skip(pageData).limit(7)

};

var addGoods = function (req, res, next) {
	var devPath = 'goods';
	var goodsImg = uploadImg(req.body.goodsImg,devPath);

	var goodsObj = {
		claId: req.body.claId,
		goodsName: req.body.goodsName,
		goodsPrice: req.body.goodsPrice,
		goodsImg: goodsImg,
		goodsDetails: req.body.goodsDetails,
		freight: req.body.freight,
        inventory: req.body.inventory,
        isRes: req.body.isRes
	};

	var GoodsEntity = new goodsModels(goodsObj);

    GoodsEntity.save(function(err){

	    if (err) {
	    	console.log(err);
	    }

	    res.sendStatus(200);
	});
}

var uploadGoodsDetalsImg = function (req, res, next) {
	var devPath = 'goods';
	var uploadGoodsDetalsImg = uploadImg(req.body.detailsImg,devPath);
	res.send(uploadGoodsDetalsImg);
}

var delGoods = function (req, res, next) {
	var id = req.query._id;
	goodsModels.findByIdAndRemove(id, function (err) {
		if (err) {
			send(err)
		} else {
			res.sendStatus(200)
		}
	})
};

module.exports = {
	getResGoods_web,
	getGoodsList_web,
	getGoodsDetails_web,
	getGoodsList,
	addGoods,
	uploadGoodsDetalsImg,
	delGoods
}