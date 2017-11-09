var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var swipeController = require('../controller/swipe');
var goodsClaController = require('../controller/goodsCla');
var addressController = require('../controller/address');
var orderController = require('../controller/order');
var goodsController = require('../controller/goods');
var userController = require('../controller/user');
var aixiuController = require('../controller/aixiu');
var commentController = require('../controller/comment');

mongoose.connect('mongodb://localhost/mydb');

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// web ---------------------------------------------------------------

router.get('/web/getSwipe', swipeController.getSwipe);

router.get('/web/getGoodsCla', goodsClaController.getGoodsCla);

router.get('/web/getResGoods', goodsController.getResGoods_web);
router.get('/web/getGoodsList', goodsController.getGoodsList_web);
router.get('/web/getGoodsDetails', goodsController.getGoodsDetails_web);

router.post('/web/saveAddress', addressController.saveAddress_web);
router.post('/web/getAddress', addressController.getAddress_web);
router.delete('/web/delAddress', addressController.delAddress_web);

router.post('/web/saveOrder', orderController.saveOrder_web);
router.post('/web/getOrderList', orderController.getOrderList_web);
router.delete('/web/cancelOrder', orderController.cancelOrder_web);
router.get('/web/getOrderDetails', orderController.getOrderDetails_web);
router.post('/web/payOrder', orderController.payOrder_web);
router.post('/web/confirmOrder', orderController.confirmOrder_web);

router.get('/web/getAixiuList', aixiuController.getAixiuList_web);
router.get('/web/getAixiuListDetails', aixiuController.getAixiuListDetails_web);
router.post('/web/addAixiuList', aixiuController.addAixiuList_web);

router.post('/web/saveComment', commentController.saveComment_web);

router.post('/web/registered', userController.registered);
router.post('/web/login', userController.login);
router.post('/web/changeUserImg', userController.changeUserImg);


// server ---------------------------------------------------------------

router.post('/swipe', swipeController.saveSwipe);
router.get('/swipe', swipeController.getSwipe);
router.delete('/swipe', swipeController.delSwipe);

router.get('/goodsCla', goodsClaController.getGoodsCla);
router.post('/goodsCla', goodsClaController.addGoodsCla);
router.delete('/goodsCla', goodsClaController.delGoodsCla);

router.get('/goodsList', goodsController.getGoodsList);
router.post('/uploadGoodsDetalsImg', goodsController.uploadGoodsDetalsImg);
router.post('/addGoods', goodsController.addGoods);
router.delete('/delGoods', goodsController.delGoods);

router.get('/getUserList', userController.getUserList);

router.get('/getAixiuList', aixiuController.getAixiuList);
router.delete('/delAixiu', aixiuController.delAixiu);
router.get('/getAixiuListDetails', aixiuController.getAixiuListDetails);
router.delete('/delComment', commentController.delComment);

router.get('/getOrderList', orderController.getOrderList);
router.delete('/delOrder', orderController.delOrder);
router.post('/shippedOrder', orderController.shippedOrder);

module.exports = router;
