<template>
  <div class="goodsDetails">
  	<img :src="goodsDetails.goodsImg" alt="">

		<div class="details-params">
			<p>{{goodsDetails.goodsName}}</p>
			<p>¥{{goodsDetails.goodsPrice | twoDecima}}</p>
			<div>
				<p>库存: {{goodsDetails.inventory}}件</p>
				<p>运费: {{goodsDetails.freight}}</p>
				<p>销量: {{goodsDetails.sales}}</p>
			</div>
		</div>

		<div style="height: 2rem;position: relative;display: flex;align-items: center;background-color: #FFF;">
			<p style="position: absolute;top: 50%;left: 50%;transform: translate3d(-50%,-50%,0);background-color: #FFF;font-size: .8rem;padding: 0 .3rem;color: #666">商品详情</p>
			<div style="height: 1px;width: 100%;background-color: #666;margin: 0 4rem;"></div>
		</div>

		<div class="details-content" v-html="goodsDetails.goodsDetails"></div>

		<div class="btn-group-pd">
			<button @click="saveCart" class="btn-c">加入购物车</button>
			<button @click="buy" class="btn-d">立即购买</button>
		</div>

  </div>
</template>

<script>
import { url_getGoodsDetails, HOST } from '../util/url.js';

// var goodsDetails = {
// 	goodsId: 1,
// 	goodsName: '商品1号',
// 	goodsImg: 'http://img3.3lian.com/2013/c4/39/d/56.jpg',
// 	content: '<img src="http://img3.3lian.com/2013/c4/39/d/56.jpg" alt=""><p>这是富文本</p>',
// 	goodsPrice: 9,
// 	inventory: 0,
// 	freight: 0,
// 	sales: 0
// }

export default {
  name: 'goodsDetails',
  data () {
    return {
      goodsDetails: {}
    }
  },
  created: function () {
  	this.changeTitle('商品详情');
  	var goodsId = this.$route.query.goodsId;
  	this.getGoodsDetails(goodsId);
  },
  methods: {
  	getGoodsDetails (goodsId) {
  		this.$ajax.get(HOST + url_getGoodsDetails, {
  			params: {
  				_id: goodsId
  			}
  		}).then( (res)=> {
  			this.goodsDetails = res.data;
  			this.goodsDetails.goodsImg = HOST + this.goodsDetails.goodsImg;
  		})
  	},
  	saveCart () {
  		this.$toast({text: '功能尚未开通',time: 2000});
  	},
  	buy () {
  		if (this.$store.state.userData.status == null) {
  			this.$toast({text: '请先登录',time: 2000});
  			this.$router.push({name: 'login'})
  			return
  		}
  		window.sessionStorage.goodsDetails = JSON.stringify(this.goodsDetails);
  		this.$router.push({name: 'confirmOrder'})
  	}
  }
}
</script>

<style lang="scss">
@import '../scss/default.scss';
.goodsDetails {
	img {
		width: 100%;
		height: 12rem;
	}
	.details-params {
		margin: .4rem;
		padding: .8rem;
		background-color: #fff;
		box-shadow: 2px 3px 5px #a8a8a8;
		border-radius: .5rem;
		@include flexBox(flex, space-around, '');
		flex-direction: column;
		> p:nth-child(1) {
			@include textClamp(2);
			font-size: .8rem;
			letter-spacing: 3px;
			line-height: 1.2rem;
		}
		> p:nth-child(2) {
			color: red;
			font-size: .8rem;
		}
		> div {
			display: flex;
			justify-content: space-between;
			p {
				font-size: .6rem;
			}
		}
		> * {
			margin-bottom: 1rem;
		}
		> *:last-child {
			margin-bottom: 0;
		}
	}
}

.details-content {
	display: block;
	width: 100%;
	text-align: center;
	margin-bottom: 70px;
	> * {
		padding: 0;
		margin: 0;
		background-color: #FFF;
	}
}

.btn-group-pd {
	padding: 10px 20px;
	display: flex;
	position: fixed;
	bottom: 0;
	width: 100%;
	/*background-color: #FFF;*/
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
	letter-spacing: 1px;
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
