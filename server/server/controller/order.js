var orderModels = require('../models/Order').orderModels;

var methods_orderStatusChange = function (_id, orderStatus, orderStatueText, res) {
	
	orderModels.findByIdAndUpdate({
		_id
	}, {
		orderStatus,
    	orderStatueText
	}, function (err, doc) {
		if (err) {
			console.log(err)
		} else {
			res.sendStatus(200)
		}
	})
}

var saveOrder_web = function (req, res, next) {
	console.log(req.body)
	var orderEntity = new orderModels(req.body);

	orderEntity.save(function(err, doc){
	    if (err) {
	    	console.log(err);
	    } else {
	    	res.json({orderId: doc._id});
	    }
	});
}

var getOrderDetails_web = function (req, res, next) {
	console.log(req.query.orderId)
	orderModels.findById({
		_id: req.query.orderId
	}, function (err, doc) {
		res.send(doc)
	})
}

var getOrderList_web = function (req, res, next) {
	orderModels.findByUserId({
		userId: req.body.userId
	}, function (err, doc) {
		res.json(doc)
	})
}

var payOrder_web = function (req, res, next) {
	var id = req.body._id;

	methods_orderStatusChange(id, 2, '已付款', res)
}

var cancelOrder_web = function (req, res, next) {
	var id = req.query._id;

	methods_orderStatusChange(id, 4, '已取消', res);
}

var confirmOrder_web = function (req, res, next) {
	var id = req.body._id;

	methods_orderStatusChange(id, 5, '已完成', res);
}

var getOrderList = function (req, res, next) {
	var _query = {};

	var pageData = req.query.page * 7;

	if (req.query.orderStatus == 0) {
		_query = {}
	} else {
		_query = {
			orderStatus: req.query.orderStatus
		}
	}

	orderModels.find(_query, function (err, orderList) {
		if (err) {
			console.log(err)
		} else {
			orderModels.count(_query, function (err, orderListNum) {
				res.json({
					orderList,
					orderListNum
				})
			})
		}
	}).skip(pageData).limit(7)
}

var delOrder = function (req, res, next) {
	var id = req.query._id;
	orderModels.findByIdAndRemove(id, function (err) {
		if (err) {
			send(err)
		} else {
			res.sendStatus(200)
		}
	})
}

var shippedOrder = function (req, res, next) {
	var id = req.body._id;

	methods_orderStatusChange(id, 3, '已发货', res)
}


module.exports = {
	saveOrder_web,
	getOrderList_web,
	cancelOrder_web,
	getOrderDetails_web,
	payOrder_web,
	confirmOrder_web,
	getOrderList,
	delOrder,
	shippedOrder
}