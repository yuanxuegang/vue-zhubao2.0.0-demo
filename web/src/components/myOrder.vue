<template>
  <div id="myOrder">

	<nav class="navList">
		<ul>
			<li v-for="(item,index) in navData" :class="onCtrl == index ? 'on' : ''" @click="navChange(index)">{{item}}</li>
		</ul>
	</nav>

	<div class="orderGoods">
		<template v-for="item in userOrderList" v-if="item.orderStatus == (onCtrl == 0 ? item.orderStatus : onCtrl)">
		<p>订单号:{{item._id}}</p>
		<goodsItem :goodsNum="item.goodsDetails.goodsNum" :goods="item.goodsDetails"></goodsItem>
		<arrowItem :arrowCtrl="false" leftText="状态:" :leftTextWithColor="item.orderStatueText" rightText="合计:¥ " :rightTextWithColor="item.orderMoney | twoDecima"></arrowItem>
		<div class="btnGroup" @click="btnCtrl(item._id,item.orderStatus,$event)">
			<button v-if="item.orderStatus == 1">取消</button>
			<button v-if="item.orderStatus == 1">立即付款</button>
			<button v-if="item.orderStatus == 2">联系卖家</button>
			<button v-if="item.orderStatus == 3">查看物流</button>
			<button v-if="item.orderStatus == 3">确认收货</button>
		</div>
		<div style="height: 10px;background-color: #e6e6e6;"></div>
		</template>
	</div>

	<confirm-c :content="content" :confirmShow="confirmShow">
		<div v-if="confirmShowIdx == 1" class="btn-group">
			<button @click="cancel">取消</button>
			<button @click="determine">确定</button>
		</div>
		<div v-else class="btn-group">
			<button style="display: none;" @click="cancel">确定</button>
			<button @click="cancel">确定</button>
		</div>
	</confirm-c>

  </div>
</template>

<script>
import goodsItem from './goodsItem.vue';
import arrowItem from './arrowItem.vue';
import confirmC from './confirmC.vue';
import { url_getOrderList, url_cancelOrder, url_confirmOrder, HOST } from '../util/url.js';


// var userOrderList = [{
// 	orderId:1504080148770,
// 	orderSn:1504080148770,
// 	orderStatus:1,
// 	orderStatueText:'待付款',
// 	orderFreight: 1.00,
// 	orderMoney: 133.00,
// 	goodsNum:1,
// 	goods:{
// 		goodsId: 5,
// 		goodsName:'六福珠宝招财猫黄金吊坠女玉石玉髓龙猫金镶玉吊坠定价HSA170022',
// 		goodsImg:'http://img3.3lian.com/2006/002/07/037.jpg',
// 		content:"<p>这是一段富文本内容和图片详情</p><img src='http://img3.3lian.com/2006/002/07/037.jpg' alt=''>",
// 		goodsPrice: 132.00
// 	},
// 	address:{
// 		receiveName: 'liyiwei',
// 		receivePhone: 13088888888,
// 		receiveProv: '广东省',
// 		receiveCity: '阳江市',
// 		receiveDistr: '江城区',
// 		receiveAddr: '西平路6号'
// 	}
// },{
// 	orderId:1504080148771,
// 	orderSn:1504080148771,
// 	orderStatus:2,
// 	orderStatueText:'待发货',
// 	orderFreight: 1.00,
// 	orderMoney: 133.00,
// 	goodsNum:1,
// 	goods:{
// 		goodsId: 5,
// 		goodsName:'六福珠宝招财猫黄金吊坠女玉石玉髓龙猫金镶玉吊坠定价HSA170022',
// 		goodsImg:'http://img3.3lian.com/2006/002/07/037.jpg',
// 		content:"<p>这是一段富文本内容和图片详情</p><img src='http://img3.3lian.com/2006/002/07/037.jpg' alt=''>",
// 		goodsPrice: 132.00
// 	},
// 	address:{
// 		receiveName: 'liyiwei',
// 		receivePhone: 13088888888,
// 		receiveProv: '广东省',
// 		receiveCity: '阳江市',
// 		receiveDistr: '江城区',
// 		receiveAddr: '西平路6号'
// 	}
// },{
// 	orderId:1504080148772,
// 	orderSn:1504080148772,
// 	orderStatus:3,
// 	orderStatueText:'待收货',
// 	orderFreight: 1.00,
// 	orderMoney: 133.00,
// 	goodsNum:1,
// 	goods:{
// 		goodsId: 5,
// 		goodsName:'六福珠宝招财猫黄金吊坠女玉石玉髓龙猫金镶玉吊坠定价HSA170022',
// 		goodsImg:'http://img3.3lian.com/2006/002/07/037.jpg',
// 		content:"<p>这是一段富文本内容和图片详情</p><img src='http://img3.3lian.com/2006/002/07/037.jpg' alt=''>",
// 		goodsPrice: 132.00
// 	},
// 	address:{
// 		receiveName: 'liyiwei',
// 		receivePhone: 13088888888,
// 		receiveProv: '广东省',
// 		receiveCity: '阳江市',
// 		receiveDistr: '江城区',
// 		receiveAddr: '西平路6号'
// 	}
// }]

export default {
  name: 'myOrder',
  data () {
    return {
      navData: ['全部','待付款','待发货','待收货'],
      onCtrl: 0,
      userOrderList: [],
      content: '',
      confirmShow: false,
      confirmShowIdx: 1,
      dev_orderId: '',
      dev_orderStatus: null
    }
  },
  created: function () {
  	this.changeTitle('我的订单');
  	this.getOrderList();
  	if (this.$route.query.idx) {
  		this.onCtrl = this.$route.query.idx;
  	}
  },
  methods: {
  	getOrderList () {
  		this.$ajax.post(HOST + url_getOrderList, {
        userId: this.$store.state.userData.status
      }).then( (res)=> {
      	this.userOrderList = res.data;
      	this.userOrderList.map(function (item) {
      		item.orderMoney = item.goodsDetails.goodsNum * item.goodsDetails.goodsPrice + item.goodsDetails.freight
      	})
      })
  	},
  	navChange (idx) {
  		this.onCtrl = idx;
  	},
  	btnCtrl (_id, orderStatus, event) {
  		switch (event.toElement.innerText) {
  			case '取消': 
  				this.confirmShow = true;
  				this.content = '确定要取消订单吗?';
  				this.confirmShowIdx = 1;
  				this.dev_orderId = _id;
  				this.dev_orderStatus = orderStatus;
  				break;
  			case '立即付款': 
  				this.$router.push({name: 'orderDetails', query: {orderId: _id}})
  				break;
  			case '联系卖家': 
  				this.confirmShow = true;
  				this.content = '功能暂未开通';
  				this.confirmShowIdx = 2;
  				break;
  			case '查看物流': 
  				this.confirmShow = true;
  				this.content = '功能暂未开通';
  				this.confirmShowIdx = 2;
  				break;
  			case '确认收货': 
  				this.confirmShow = true;
  				this.content = '确认收货吗?';
  				this.confirmShowIdx = 1;
  				this.dev_orderId = _id;
  				this.dev_orderStatus = orderStatus;
  				break;
  		}
  	},
  	cancel () {
  		this.confirmShow = false;
  	},
  	determine () {
  		this.confirmShow = false;
  		switch (this.dev_orderStatus) {
  			case 1: 
  				this.cancelOrder();
  				break;
  			case 3: 
  				this.confirmOrder();
  				break;
  		}
  	},
  	cancelOrder () {
  		this.$ajax.delete(HOST + url_cancelOrder, {
        params: {
        	_id: this.dev_orderId
        }
      }).then( (res)=> {
      	this.getOrderList()
      })
  	},
  	confirmOrder () {
  		this.confirmShow = false;
  		this.$ajax.post(HOST + url_confirmOrder, {
        _id: this.dev_orderId
      }).then( (res)=> {
      	this.getOrderList()
      })
  	}
  },
  components: {
  	goodsItem,
  	arrowItem,
  	confirmC
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';
.navList ul{
	@include flexBox(flex, space-around, center);
	list-style-type: none;
	box-shadow: 2px 2px 10px #c3c3c3;
	li {
		font-size: .8rem;
		font-family: '黑体';
		color: $colorDefaultText;
		padding: 10px 0;
		box-sizing: border-box;
		width: 100%;
		text-align: center;
	}
	li.on {
		border-bottom: 2px solid $activeColor;
		color: $activeColor;
	}
}

.orderGoods {
	p {
		font-size: .6rem;
		padding: .8rem;
		color: $colorDefaultText;
		@include borderBottom;
	}
}

.btnGroup {
	@include flexBox(flex, flex-end, center);
	button {
		margin: .4rem .8rem .4rem 0;
		padding: .4rem .6rem;
		border-radius: .4rem;
		background-color: #FFF;
		border: 1px solid #888;
	}
}

</style>
