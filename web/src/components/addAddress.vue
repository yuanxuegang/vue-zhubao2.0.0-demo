<template>
  <div id="addAddress">

    <div class="input-group">
      <span>收货人:</span>
      <input v-model="receiveName" type="text" placeholder="请输入收货人名字...">
    </div>

    <div class="input-group">
      <span>联系电话:</span>
      <input v-model="receivePhone" type="number" placeholder="请输入联系电话...">
    </div>

    <button class="btn-default" @click="openCitySelect">{{receiveDistr ? `${receiveProv} ${receiveCity}  ${receiveDistr}` : '选择地址'}}</button>

    <textarea class="details-address" placeholder="请输入您的详细地址" maxlength="100" v-model="receiveAddr"></textarea>

    <button class="btn-default save" @click="save">保存</button>

    <yd-cityselect v-model="showDistrict" :callback="result1" :items="district"></yd-cityselect>
    
  </div>
</template>

<script>
import cityselect from './citySelect.vue';

import District from '../util/gov_province_city_area_id.js';

import { url_saveAddress, HOST } from '../util/url.js';

export default {
  name: 'addAddress',
  components: {
    "yd-cityselect": cityselect
  },
  data () {
    return {
      showDistrict: false,
      district: District,
      receiveName: '',
      receivePhone: '',
      receiveProv: '',
      receiveCity: '',
      receiveDistr: '',
      receiveAddr: ''
    }
  },
  created: function () {
  	this.changeTitle('新增地址');
  },
  methods: {
  	openCitySelect () {
  		this.showDistrict = true;
  	},
  	result1(ret) {
        this.receiveProv = ret.itemName1;
        this.receiveCity = ret.itemName2;
        this.receiveDistr = ret.itemName3;
    },
    save () {

    	if (!this.receiveName) {
    		this.$toast({
    			text: '请输入您的姓名'
    		})
    		return
    	}
	    // var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
	    // var flag = reg.test(this.receivePhone);   //true
	    var flag = /^1[3|4|5|7|8][0-9]{9}$/.test(this.receivePhone);
    	if (!this.receivePhone || !flag) {
    		this.$toast({
    			text: '请正确输入手机号码'
    		})
    		return
    	}
    	if (!this.receiveProv || !this.receiveCity || !this.receiveDistr || !this.receiveAddr) {
    		this.$toast({
    			text: '请完善收货地址'
    		})
    		return
    	}

      this.$ajax.post(HOST + url_saveAddress, {
        userId: this.$store.state.userData.status,
        address: {
          receiveName: this.receiveName,
          receivePhone: this.receivePhone,
          receiveProv: this.receiveProv,
          receiveCity: this.receiveCity,
          receiveDistr: this.receiveDistr,
          receiveAddr: this.receiveAddr
        }
      }).then( (res)=> {
        if (res.data == "OK") {
          this.$toast({
            text: '保存成功'
          })
          this.$router.goBack();
        }
      })

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';

input,textarea {
  outline: 0;
}

.details-address {
  width: 100%;
  height: 100px;
  font-size: .8rem;
  padding: 20px;
  border: none;
  border-bottom: 1px solid #c7c7c7;
}

.input-group {
  display: flex;
  padding: 10px 20px;
  border-bottom: 1px solid #c7c7c7;
  span {
    flex: 2;
    font-size: .8rem;
    padding: 10px 0;
  }
  input {
    flex: 5;
    border: none;
    font-size: .8rem;
    padding: 10px 0;
  }
}

.btn-default {
	bottom: 1rem;
	width: 90%;
	padding: 10px 20px;
	margin: 20px;
	font-size: 1rem;
	background-color: $activeColor;
	color: #FFF;
	border: none;
	border-radius: .3rem;
}

.save {
  position: fixed;
}
</style>
