<template>
  <div id="myAddress">
    <swipeout>
      <swipeout-item v-for="(v,k) in myAddress" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
        <div slot="right-menu">
          <swipeout-button @click.native="del(v,k)" type="warn" style="background-color: #FC83AB;font-size: 1rem;">{{'删除'}}</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t" style="border-bottom: 10px solid #f1f1f1;">
        	<div class="address-list" @click="chooseAddress(v)">
				<div class="slide">
					<div>
						<span>收货人:{{v.address.receiveName}}</span>
						<span>{{v.address.receivePhone}}</span>
					</div>
					<div>
						<img src="static/dist/images/shouhuodizhi.png" alt="">
						<p>{{v.address.receiveProv}}{{v.address.receiveCity}}{{v.address.receiveDistr}}{{v.address.receiveAddr}}</p>
					</div>
				</div>
			</div>
        </div>
      </swipeout-item>
    </swipeout>

	<button class="add" @click="toAddpage">新增地址</button>
	
  </div>
</template>

<script>
import swipeout from './vux/swipeout.vue'
import swipeoutItem from './vux/swipeout-item.vue'
import swipeoutButton from './vux/swipeout-button.vue'

import { url_getAddress, url_delAddress, HOST } from '../util/url.js';

export default {
  name: 'myAddress',
  data () {
    return {
      myAddress: [],
      disabled: false
    }
  },
  created: function () {
  	this.changeTitle('收货地址');
  	this.getAddress();
  	console.log(this.$route.query.ctrl)
  },
  methods: {
  	getAddress () {
  		this.$ajax.post(HOST + url_getAddress, {
  			userId: this.$store.state.userData.status
  		}).then( (res)=> {
  			this.myAddress = res.data;
  		}).catch( (rej)=> {
  			console.log(rej)
  		})
  	},
  	chooseAddress (v) {
  		if (this.$route.query.ctrl) {// 这里如果是从个人中心进来的，则路由里面带这个参数，不让选择地址了，因为这个组件和确认订单那里的收货地址用的是同一个组件，所以要区分两个场景，使用两个方法
  			return
  		}
  		console.log(v)
  		window.sessionStorage.userAddress = JSON.stringify(v.address);
  		this.$router.goBack();
  	},
  	toAddpage () {
  		this.$router.push({name: 'addAddress'})
  	},
  	del (v, k) {
  		this.$ajax.delete(HOST + url_delAddress, {
  			params: {
  				_id: v._id
  			}
  		}).then( (res)=> {
  			this.$toast({
	  			text: '删除成功'
	  		})
	  		this.myAddress.splice(k, 1);
  		})
  	},
    handleEvents (type) {
      console.log('event: ', type)
    }
  },
  components: {
    swipeout,
    swipeoutItem,
    swipeoutButton
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';

.address-list {
	display: flex;
	flex-direction: column;
	font-family: '黑体';
	position: relative;
	z-index: 2;
	.slide {
		transform: translate3d(0,0,0);
		transition: .8s;
		div:nth-child(1) {
			@include flexBox(flex, space-between, center);
			padding: 0.4rem .6rem;
			span {
				font-size: .8rem;
				color: $colorDefaultText;
			}
		}
		div:nth-child(2) {
			@include flexBox(flex, flex-start, center);
			padding: 0.4rem .6rem;
			img {
				width: 20px;
				height: 20px;
				margin-right: .4rem;
			}
			p {
				font-size: .8rem;
				color: $colorDefaultText;
			}
		}
	}
	
}

.add {
	width: 90%;
	padding: 10px 20px;
	margin: 20px auto;
  display: block;
	font-size: 1rem;
	background-color: $activeColor;
	color: #FFF;
	border: none;
	border-radius: .3rem;
}

</style>
