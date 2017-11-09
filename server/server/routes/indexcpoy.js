var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods').goods;

mongoose.connect('mongodb://localhost/mydb');

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.json({ title: '这是express请求的数据' });
});

router.get('/goodsList', function(req, res) {
	Goods.find(function (err, doc) {
		console.log(doc)
		res.json(doc)
	})
});

router.post('/addgoods', function(req, res) {
	var goodsObj = {
		goodsname: req.body.goodsname,
		goodsid: req.body.goodsid,
		goodsprice: req.body.goodsprice
	};

	var _goods = new Goods({
      goodsname:goodsObj.goodsname,
      goodsid:goodsObj.goodsid,
      goodsprice:goodsObj.goodsprice
    });

    _goods.save(function(err){

	    if (err) {
	    	console.log(err);
	    }

	    res.sendStatus(200);
	});
});

router.post('/delgoods', function(req, res) {

	Goods.remove({
		goodsid: req.body.goodsid
	}, function(err,result){
		if(err){
			console.log(err);
		}else{
			res.send('success');
		}
	});

});

router.get('/searchGoods', function(req, res) {
	// 基于实例方法的查询
	// var goods = new Goods();

	// goods.findByName("iphone",function(error, result){
	//     if(error) {
	//         console.log(error);
	//     } else {
	//         console.log(result);
	//         res.send(200)
	//     }
	// });

	var goodsprice = req.query.goodsprice; // 注意这里使用的get请求接口，用的是query
	var ctrl = req.query.ctrl; // 注意这里使用的get请求接口，用的是query

	if (ctrl == 1) {
		Goods.find({
			goodsprice: {$gt: goodsprice}
		}, function (err, doc) {
			res.json(doc)
		})
	}

	if (ctrl == 0) {
		//基于静态方法的查询
		Goods.findByPrice(goodsprice, function(error, result){
		    if(error) {
		        console.log(error);
		    } else {
		        console.log(result);
		        // res.sendStatus(200)
		        if (result.length) {
		        	res.json(result);
		        } else {
		        	res.send('no data')
		        }
		    }
		});	
	}
});

module.exports = router;
