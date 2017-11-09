<template>
  <div class="home">

    <swipe class="swipe">
      <swipe-item v-for="item in swipeItems" :show-indicators="true">
        <img class="swipe-img" :src="item.swipeImg" alt="">
      </swipe-item>
    </swipe>

    <claListNav :listData="claData" :imgSize="'2rem'" :textSize="'0.4rem'" :textColor="'#000'"></claListNav>

    <resGoods :listData="resGoodsData"></resGoods>
  </div>
</template>

<script>

import { Swipe, SwipeItem } from 'vue-swipe';
import claListNav from './claListNav.vue';
import resGoods from './resGoods.vue';

import { url_getSwipe, url_getResGoods, HOST } from '../util/url.js';

// var swipeItems = [
//     "http://img3.3lian.com/2013/c4/39/d/56.jpg",
//     "http://img3.3lian.com/2013/c4/39/d/58.jpg",
//     "http://img3.3lian.com/2013/c4/39/d/62.jpg",
//     "http://img3.3lian.com/2013/c4/39/d/70.jpg"]

// var resGoodsData = [{
//   goodsId: 0,
//   goodsImg: 'http://img3.3lian.com/2006/002/07/042.jpg'
// },{
//   goodsId: 1,
//   goodsImg: 'http://img3.3lian.com/2006/002/07/043.jpg'
// },{
//   goodsId: 2,
//   goodsImg: 'http://img3.3lian.com/2006/002/07/044.jpg'
// }]

var claData = [{
      imgUrl: 'static/dist/images/dingzhi.png',
      listName: '私人订制'
    },{
      imgUrl: 'static/dist/images/paimai.png',
      listName: '夺宝会场'
    },{
      imgUrl: 'static/dist/images/daixuanhuo.png',
      listName: '代选货'
    },{
      imgUrl: 'static/dist/images/youhui.png',
      listName: '优惠活动'
    }]

export default {
  name: 'home',
  data () {
    return {
      swipeItems: [],
      claData: claData,
      resGoodsData: []
    }
  },
  components: {
    Swipe,
    SwipeItem,
    claListNav,
    resGoods
  },
  methods: {
    getSwipe () {
      this.$ajax.get(HOST + url_getSwipe).then( (res)=> {
        res.data.map(function (item) {
          item.swipeImg = HOST + item.swipeImg;
        })
        this.swipeItems = res.data;
      })
    },
    getResGoods () {
      this.$ajax.get(HOST + url_getResGoods).then( (res)=> {
        res.data.map(function (item) {
          item.goodsImg = HOST + item.goodsImg;
        })
        this.resGoodsData = res.data;
      })
    }
  },
  created: function () {
    this.getSwipe();
    this.getResGoods();
  },
  mounted: function () {
    this.$store.commit('_changeFooterStatus', true)
  },
  destroyed: function () {
    this.$store.commit('_changeFooterStatus', false)
  }
}
</script>

<style lang="scss" scoped>

@import '../scss/vue-swipe.css';

.swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}

.swipe-img {
  width: 100%;
  height: 100%;
}
</style>
