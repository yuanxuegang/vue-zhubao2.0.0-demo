<template>
  <div id="orderDetails">
	<addressC :address="orderDetails.address"></addressC>
	<goodsItem :goodsNum="orderDetails.goodsDetails.goodsNum" :goods="orderDetails.goodsDetails"></goodsItem>
	<arrowItem :arrowCtrl="false" leftText="运费" :rightTextWithColor="'¥ ' + orderDetails.goodsDetails.freight"></arrowItem>
	<arrowItem :arrowCtrl="false" leftText="实付款(含运费)" :rightTextWithColor="'¥ ' + orderMoney"></arrowItem>
	<arrowItem :arrowCtrl="false" :leftText="'订单号:' + orderDetails._id" rightText=""></arrowItem>
	<arrowItem :arrowCtrl="false" leftText="订单状态" :rightText="orderDetails.orderStatueText"></arrowItem>
	<div class="btn-group-pd">
		<button @click="cancelBtn" class="btn-c">取消</button>
		<button @click="payBtn" class="btn-d">付款</button>
	</div>
  </div>
</template>

<script>
import addressC from './addressC.vue'
import goodsItem from './goodsItem.vue'
import arrowItem from './arrowItem.vue'

import { url_getOrderDetails, url_payOrder, HOST } from '../util/url.js';

// var orderDetails = {
//   orderId:1504080148770,
//   orderSn:1504080148770,
//   orderStatus:1,
//   orderStatueText:'待付款',
//   orderFreight: 1.00,
//   orderMoney: 133.00,
//   goodsNum:1,
//   goodsDetails:{
//     goodsId: 5,
//     goodsName:'六福珠宝招财猫黄金吊坠女玉石玉髓龙猫金镶玉吊坠定价HSA170022',
//     goodsImg:'http://img3.3lian.com/2006/002/07/037.jpg',
//     content:"<p>这是一段富文本内容和图片详情</p><img src='http://img3.3lian.com/2006/002/07/037.jpg' alt=''>",
//     goodsPrice: 132.00,
//     inventory: 0,
//     freight: 0,
//     sales: 0
//   },
//   address:{
//     receiveName: 'liyiwei',
//     receivePhone: 13088888888,
//     receiveProv: '广东省',
//     receiveCity: '阳江市',
//     receiveDistr: '江城区',
//     receiveAddr: '西平路6号'
//   }
// }

export default {
  name: 'orderDetails',
  data () {
    return {
      orderDetails: {}
    }
  },
  computed: {
    orderMoney () {
      return this.orderDetails.goodsDetails.goodsNum * this.orderDetails.goodsDetails.goodsPrice + this.orderDetails.goodsDetails.freight
    }
  },
  methods: {
  	
  },
  created: function () {
  	this.changeTitle('订单详情');
    this.getOrderDetails();
  },
  methods: {
  	getOrderDetails () {
      this.$ajax.get(HOST + url_getOrderDetails, {
        params: {
          orderId: this.$route.query.orderId
        }
      }).then( (res)=> {
        this.orderDetails = res.data;
      })
    },
    cancelBtn () {
      this.$router.go(-1);
    },
  	payBtn () {
  		this.$ajax.post(HOST + url_payOrder, {
        _id: this.orderDetails._id
      }).then( (res)=> {
        console.log(res)
        if (res.data == "OK") {
          this.$toast({
            text: '付款成功'
          })
          this.$router.replace({name: 'member'});
        }
      })
  	}
  },
  components: {
  	addressC,
  	goodsItem,
  	arrowItem
  }
}
</script>

<style lang="scss" scoped>

.btn-group-pd {
	padding: 10px 20px;
	display: flex;
	position: fixed;
	bottom: 0;
  width: 100%;
	background-color: #FFF;
}

.btn-group-pd button{
	border: none;
}

%btnPay {
	flex: 1;
	padding: 10px 0;
	height: 2rem;
	font-size: .8rem;
	color: #FFF;
	font-family: '黑体';
	letter-spacing: 5px;
}
.btn-c{
	@extend %btnPay;
	border-radius: 60px 0 0 60px;
	background-color: #FD91B4;
}

.btn-d{
	@extend %btnPay;
	border-radius: 0 60px 60px 0;
	background-color: #FC80A9;
}
</style>
