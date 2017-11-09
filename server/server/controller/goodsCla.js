var fs = require('fs');
var path = require('path');

var goodsClaModels = require('../models/goodsCla').goodsClaModels;
var goodsModels = require('../models/goods').goodsModels;

// var uploadImg = require('../util/uploadImg').uploadImg;

var getGoodsCla = function (req, res, next) {
	goodsClaModels.find({

	}, function (err, doc) {
		if (err) {
			console.log(err)
		} else {
			res.json(doc)
		}
	})
};

var addGoodsCla = function (req, res, next) {
	var goodsClaEntity = new goodsClaModels({claName: req.body.claName});

	goodsClaEntity.save(function (err) {
		if (err) {
			console.log(err);
		} else {
			res.sendStatus(200);
		}
	})

}

var delGoodsCla = function (req, res, next) {
	var id = req.query._id;
	goodsClaModels.findByIdAndRemove(id, function (err) {
		if (err) {
			send(err)
		} else {
			goodsModels.remove({
				claId: id
			}, function (err) {
				if (err) {
					console.log(err);
				}
				res.send(200)
			})
		}
	})
};

module.exports = {
	getGoodsCla,
	addGoodsCla,
	delGoodsCla
}