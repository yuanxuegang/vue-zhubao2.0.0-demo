<template>
  <div class="member">
    <!-- <div class="user-container" :style="note"> -->
    <div class="user-container">
      <div style="position: relative;">
        <img :src="$store.state.userData.userImg" alt="">
        <input @change="changeUserImg($event)" type="file" accept="image/*" class="changeUserImg">
      </div>
      <p>{{$store.state.userData.userName}}</p>
    </div>

    <claListNav :listData="claData" imgSize="30px" textSize="15px"></claListNav>
    <div style="height: 10px;background-color: #f2f2f2;"></div>

    <arrowItem @click.native="toMyOrder" :arrowCtrl="true" leftText="我的订单" rightText="查看更多"></arrowItem>
    <claListNav :listData="myOrderData" textSize="15px"></claListNav>
    <div style="height: 10px;background-color: #f2f2f2;"></div>

    <arrowItem @click.native="toMyAddress" :arrowCtrl="true" leftText="我的收货地址" rightText=""></arrowItem>
    <arrowItem :arrowCtrl="true" leftText="绑定手机号码" rightText=""></arrowItem>
    <arrowItem :arrowCtrl="true" leftText="我的客服" rightText=""></arrowItem>

  </div>
</template>

<script>
import claListNav from './claListNav.vue';
import arrowItem from './arrowItem.vue';

import { url_changeUserImg, HOST } from '../util/url.js';

export default {
  name: 'member',
  data () {
    return {
      // note: {
      //   background: `url(${this.$store.state.userData.userImg})`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "100% 100%",
      //   mozBackgroundSize: "100% 100%",
      //   backgroundOrigin: "center center"
      // },
      claData: [{
        imgUrl: 'static/dist/images/dingzhi.png',
        listName: '我的定制'
      },{
        imgUrl: 'static/dist/images/paimai.png',
        listName: '我的夺宝'
      },{
        imgUrl: 'static/dist/images/daixuanhuo.png',
        listName: '代选货'
      },{
        imgUrl: 'static/dist/images/myshow.png',
        listName: '我的买家秀'
      }],
      myOrderData: [{
        imgUrl: 'static/dist/images/daifukuan.png',
        listName: '待付款'
      },{
        imgUrl: 'static/dist/images/daifahuo.png',
        listName: '待发货'
      },{
        imgUrl: 'static/dist/images/daishouhuo.png',
        listName: '待收货'
      },{
        imgUrl: 'static/dist/images/shouhou.png',
        listName: '售后/退款'
      }],
      changeUserImg_dev: ''
    }
  },
  components: {
    claListNav,
    arrowItem
  },
  methods: {
    toMyOrder () {
      this.$router.push({name: 'myOrder'})
    },
    toMyAddress () {
      this.$router.push({name: 'myAddress', query: {ctrl:true}})
    },
    changeUserImg (event) {
      this.$dialog.loading.open('正在上传图片');
      var img = window.URL.createObjectURL(event.target.files["0"]);
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function(evt) {
        if (event.target.files[0].size > 512 * 512 * 4) {
          var img = new Image();
          img.src = evt.srcElement.result;
          img.onload = function() {
            var imgBase64 = compress(img);
            that.changeUserImg_dev = imgBase64;
            that.uploadImg();
            // console.log(that.changeUserImg_dev)
          }
        } else {
          that.changeUserImg_dev = evt.srcElement.result;
          that.uploadImg();
          // console.log(that.changeUserImg_dev)
        }
      }
    },
    uploadImg () {
      this.$ajax.post(HOST + url_changeUserImg, {
        id: this.$store.state.userData.status,
        newImg: this.changeUserImg_dev
      }).then( (res)=> {
        this.$store.state.userData.userImg = HOST +  res.data;
        this.$dialog.loading.close();
      })
    }
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
@import '../scss/default.scss';
.user-container {
  @include flexBox(flex, flex-start, center);
  background-color: $activeColor;
  height: 7rem;
  img {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    border: 2px solid #FFF;
    margin: 0 .7rem;
  }
  p {
    color: #FFF;
    font-size: 1.2rem;
    letter-spacing: 2px;
    font-family: '黑体';
  }
}

.changeUserImg {
  position: absolute;
  opacity: 1;
  width: 100%;
  height: 100%;
  opacity: 0;
  top: 0;
  left: 0;
}
</style>
