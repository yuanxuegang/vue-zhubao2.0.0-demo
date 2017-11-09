<template>
  <div id="confirmOrder">

    <div v-if="!address.receiveProv" class="chooseAdd" @click="toMyAddress">
      <p>请选择收货地址</p>
      <img src="static/dist/images/jiaotou.png" alt="" width="15" height="15">
    </div>

  	<addressC v-else :address="address" v-on:toMyAddress="toMyAddress"></addressC>

  	<goodsItem :goodsNum="goodsNum" :goods="goods"></goodsItem>

  	<div style="display: flex;justify-content: space-between;padding: .4rem 1rem;align-items: center;">
  		<p style="font-size: .6rem;color: #666;">数量:</p>
  		<div class="btn-group">
  			<div @click="reduction">-</div>
  			<input @input="inputNum" v-model="goodsNum" type="number">
  			<div @click="add">+</div>
  		</div>
  	</div>

  	<arrowItem :arrowCtrl="false" leftText="配送方式" rightText="顺丰快递"></arrowItem>

  	<arrowItem :arrowCtrl="false" leftText="运费" :rightText="'¥ ' + goods.freight"></arrowItem>

  	<div class="pay">
  		<p>合计: ¥ {{allMoney}}</p>
  		<button @click="saveOrder">提交订单</button>
  	</div>

  </div>
</template>

<script>
import addressC from './addressC.vue'
import goodsItem from './goodsItem.vue'
import arrowItem from './arrowItem.vue'

import { url_saveOrder, HOST } from '../util/url.js';

export default {
  name: 'confirmOrder',
  data () {
    return {
      goodsNum:1,
      goods: {},
      address:{

      }
    }
  },
  methods: {
  	reduction () {
  		if (this.goodsNum == 1 ) {
  			return
  		}
  		this.goodsNum--;
  	},
  	add () {
  		if (this.goodsNum == 99 ) {
  			return
  		}
  		this.goodsNum++;
  	},
  	inputNum () {
  		if (this.goodsNum > 99) {
  			this.goodsNum = 99;
  		}
  		if (this.goodsNum < 1) {
  			this.goodsNum = 1;
  		}
  	},
  	saveOrder () {
      if (!this.address.receiveProv) {
        this.$toast({
          text: '请选择收货地址'
        })
        return
      }
      this.$ajax.post(HOST + url_saveOrder, {
        userId: this.$store.state.userData.status,
        orderStatus: 1,
        orderStatueText: '待付款',
        address: this.address,
        goodsDetails: {
          goodsId: this.goods._id,
          claId: this.goods.claId,
          goodsName: this.goods.goodsName,
          goodsImg: this.goods.goodsImg,
          content: this.goods.goodsDetails,
          goodsPrice: this.goods.goodsPrice,
          goodsNum: this.goodsNum,
          inventory: this.goods.inventory,
          isRes: this.goods.isRes,
          freight: this.goods.freight,
          sales: this.goods.sales
        }
      }).then( (res)=> {        
        this.$router.push({name: 'orderDetails', query: {orderId:res.data.orderId}})      
      })
  	},
    toMyAddress () {
      this.$router.push({name: 'myAddress'})
    }
  },
  computed: {
  	allMoney () {
  		return ((this.goods.goodsPrice * this.goodsNum) + Math.floor(this.goods.freight)).toFixed(2);
  	}
  },
  created: function () {
  	this.changeTitle('确认订单');
    this.goods = JSON.parse(window.sessionStorage.goodsDetails)
    this.address = JSON.parse(window.sessionStorage.userAddress) || {}
  },
  components: {
  	addressC,
  	goodsItem,
  	arrowItem
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';
.pay {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	@include flexBox(flex, flex-end, center);
	P {
		color: red;
		padding: .6rem;
		font-size: .8rem;
	}
	button {
		padding: .6rem;
		background-color: $activeColor;
		border: none;
		color: #FFF;
		font-size: .8rem;
		font-family: '黑体';
	}
}

.chooseAdd {
  @include flexBox(flex, space-between, center);
  padding: .6rem .8rem;
  border-bottom: 1px solid #e1e1e1;
  font-size: .8rem;
}

.btn-group {
  display: flex;
  div,input {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
  }
  div {
    background-color: pink;
    color: #FFF;
    line-height: 30px;
  }
  input {
    border:1px solid pink;
    margin: 0 10px;
  }
}
</style>
