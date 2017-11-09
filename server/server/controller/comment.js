var commentModels = require('../models/comment').commentModels;

var saveComment_web = function (req, res, next) {
	var _comment = req.body
	console.log(_comment);

	var commentEntity = new commentModels(_comment);

	commentEntity.save(function (err) {
		if (err) {
			res.sendStatus(404)
		} else {
			res.sendStatus(200)
		}
	})
}

var delComment = function (req, res, next) {
	var id = req.query._id;
	console.log(id);
	commentModels
	.findByIdAndRemove(id)
	.exec(function (err, doc) {
		if (err) {
			console.log(err)
		} else {
			res.sendStatus(200)
		}
	})
}

module.exports = {
	saveComment_web,
	delComment
}