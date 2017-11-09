var addressModels = require('../models/address').addressModels;

var saveAddress_web = function (req, res, next) {
	var addressEntity = new addressModels(req.body);

	addressEntity.save(function(err){
	    if (err) {
	    	console.log(err);
	    } else {
	    	res.sendStatus(200);
	    }
	});
}

var getAddress_web = function (req, res, next) {
	addressModels.findByUserId({
		userId: req.body.userId
	}, function (err, doc) {
		res.json(doc)
	})
}

var delAddress_web = function (req, res, next) {
	var id = req.query._id;
	addressModels.findByIdAndRemove(id, function (err) {
		if (err) {
			send(err)
		} else {
			res.sendStatus(200)
		}
	})
}

module.exports = {
	saveAddress_web,
	getAddress_web,
	delAddress_web
}