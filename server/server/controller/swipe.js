var swipeModels = require('../models/swipe').swipeModels;

var uploadImg = require('../util/uploadImg').uploadImg;

var saveSwipe = function (req, res, next) {
	console.log(req.body)
	var devPath = 'swipe';
	var swipeImg = uploadImg(req.body.swipeImg,devPath);

	var swipeObj = {
		swipeImg: swipeImg
	};

	var swipeEntity = new swipeModels(swipeObj);

	swipeEntity.save(function(err){
	    if (err) {
	    	console.log(err);
	    } else {
	    	res.sendStatus(200);
	    }
	});
}

var getSwipe = function (req, res, next) {
	swipeModels.find({

	}, function (err, doc) {
		res.json(doc)
	})
}

var delSwipe = function (req, res, next) {
	console.log(req.query)
	var id = req.query._id;
	swipeModels.findByIdAndRemove(id, function (err) {
		if (err) {
			send(err)
		} else {
			res.sendStatus(200)
		}
	})
}

module.exports = {
	saveSwipe,
	getSwipe,
	delSwipe
}