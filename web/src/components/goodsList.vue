<template>
  <div class="goodsList" style="overflow-y: scroll;">
  	<template v-for="(val,idx) in goodsList">
  		<div class="goodsList-container" @click="toGoodsDetails(val._id)">
  			<div class="goodsImg">
  				<img :src="val.goodsImg" alt="">
  			</div>
  			<div class="goods-content">
  				<p class="title">{{val.goodsName}}</p>
  				<span class="goodsPrice">¥ {{val.goodsPrice | twoDecima}}</span>
  			</div>
  		</div>
  		<div style="height: 10px;background-color: #f8f8f8;"></div>
  	</template>

  	<mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>

  	<div class="screening" @click="showScreening">
      <p>筛选</p>
      <img src="static/dist/images/shaixuan.png" alt="">
    </div>

    <screening :showScreeningCtrl="showScreeningCtrl" v-on:hiddenScreeningCtrl="hiddenScreeningCtrl" :screeningList="screeningList"></screening>

  </div>
</template>

<script>

import screening from './screening.vue';

import muInfiniteScroll from './muse-ui/mu-infinite-scroll.vue';

import { url_getGoodsList, HOST } from '../util/url.js';

// var goodsList = [{
// 	goodsId: 1,
// 	goodsName: '天使之泪 18K金60分心形钻石吊坠',
// 	goodsImg: 'http://img3.3lian.com/2013/c4/39/d/56.jpg',
// 	content: '<img src="http://img3.3lian.com/2013/c4/39/d/56.jpg" alt=""><p>这是富文本</p>',
// 	goodsPrice: 9,
// 	inventory: 0,
// 	freight: 0,
// 	sales: 0
// },{
// 	goodsId: 2,
// 	goodsName: '天使之泪 18K金60分心形钻石吊坠',
// 	goodsImg: 'http://img3.3lian.com/2013/c4/39/d/58.jpg',
// 	content: '<img src="http://img3.3lian.com/2013/c4/39/d/56.jpg" alt=""><p>这是富文本</p>',
// 	goodsPrice: 9,
// 	inventory: 0,
// 	freight: 0,
// 	sales: 0
// },{
// 	goodsId: 3,
// 	goodsName: '天使之泪 18K金60分心形钻石吊坠天使之泪 18K金60分心形钻石吊坠',
// 	goodsImg: 'http://img3.3lian.com/2013/c4/39/d/62.jpg',
// 	content: '<img src="http://img3.3lian.com/2013/c4/39/d/56.jpg" alt=""><p>这是富文本</p>',
// 	goodsPrice: 9,
// 	inventory: 0,
// 	freight: 0,
// 	sales: 0
// }]

var screeningList = [{
	screeningName:'适用对象',
	screeningCla:[{
		itemName:'女',
		itemSelected:false
	},{
		itemName:'情侣',
		itemSelected:false
	},{
		itemName:'男',
		itemSelected:false
	},{
		itemName:'儿童',
		itemSelected:false
	}],
	screeningShow:true
},{
	screeningName:'材料',
	screeningCla:[{
		itemName:'圆形',
		itemSelected:false
	},{
		itemName:'近圆',
		itemSelected:false
	},{
		itemName:'水滴形',
		itemSelected:false
	},{
		itemName:'异性',
		itemSelected:false
	},{
		itemName:'椭圆形',
		itemSelected:false
	}],
	screeningShow:true
},{
	screeningName:'年龄',
	screeningCla:[{
		itemName:'20岁',
		itemSelected:false
	},{
		itemName:'20岁-25岁',
		itemSelected:false
	},{
		itemName:'25岁-30岁',
		itemSelected:false
	},{
		itemName:'30岁-35岁',
		itemSelected:false
	},{
		itemName:'35岁-40岁',
		itemSelected:false
	}],
	screeningShow:true
}]

export default {
  name: 'goodsList',
  data () {
    return {
    	num: 0,
    	goodsList: [],
    	showScreeningCtrl: false,
    	screeningList: screeningList,
    	loading: false,
    	scroller: null
    }
  },
  created: function () {
  	this.changeTitle('分类商品');
  	var claId = this.$route.params.id;
  	this.getGoodsList(claId);
  },
  components: {
  	screening,
  	"mu-infinite-scroll": muInfiniteScroll
  },
  methods: {
  	getGoodsList (claId) {
  		this.$ajax.get(HOST + url_getGoodsList, {
  			params: {
  				claId: claId,
  				num: this.num
  			}
	    }).then( (res)=> {
      	// console.log(res.data)
      	res.data.map( (item) => {
      		item.goodsImg = HOST + item.goodsImg;
      	});
      	this.goodsList = [...this.goodsList,...res.data];
      	this.loading = false;
	    })
  	},
  	toGoodsDetails (goodsId) {
  		this.$router.push({name: 'goodsDetails', query: {goodsId}})
  	},
    showScreening: function () {
      this.showScreeningCtrl = true;
    },
    hiddenScreeningCtrl: function () {
      this.showScreeningCtrl = false;
    },
    loadMore () {
    	this.loading = true;
			setTimeout(() => {
				this.num++;
				var claId = this.$route.params.id;
	  		this.getGoodsList(claId);
			}, 2000)
    }
  },
  mounted: function () {
  	// 启动上拉加载的bug解决方法，目前暂时采用这种比较差的方法，App.vue里面有个div与此关联
  	this.$store.commit('_changeGoodsDetailsPageHidden');
  	this.scroller = this.$el;
  },
  beforeDestroy: function () {
  	// 启动上拉加载的bug解决方法，目前暂时采用这种比较差的方法，App.vue里面有个div与此关联
  	this.$store.commit('_changeGoodsDetailsPageShow');
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';
.goodsList {

}

.goodsList-container {
	width: 100%;
	display: flex;
	.goodsImg {
		flex: 3;
		img {
			width: 100%;
			height: 5rem;
		}
	}
	.goods-content {
		flex: 5;
		@include flexBox(flex, space-between, '');
		flex-direction: column;
		p,span {
			margin: .6rem;
			font-size: .7rem;
		}
		p {
			margin-bottom: .2rem;
			@include textClamp(2);
			color: $colorDefaultTitle;
			overflow: hidden;
		}
		span {
			color: red;
			text-align: right;
		}
	}
}

.screening {
  position: fixed;
  bottom: 4rem;
  right: 1rem;
  background-color: $activeColor;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  @include flexBox(flex, center, center);
  flex-direction: column;
  > p {
    text-align: center;
    font-size: .6rem;
    color: #FFF;
  }
  > img {
    width: .8rem;
    height: .8rem;
    margin-top: 5px;
  }
}
</style>
