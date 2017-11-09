<template>
  <div id="registered">
  	<input v-model="userName" type="text" placeholder="请输入用户名">
    <input v-model="passWord" type="passWord" placeholder="请输入密码">
    <input v-model="passWordAlign" type="passWord" placeholder="请再次输入密码">
    <div style="display: flex;align-items: center;">
      <input type="text" style="flex: 2;" placeholder="请输入验证码..." v-model="verifyCodeValue">
      <div id="v_container" style="height: 60px;flex: 2;"></div>
    </div>
  	<button class="btn-default" @click="registered">注册</button>
    <p @click="backLoginPage">立即登录</p>
  </div>
</template>

<script>
import GVerify from '../util/gVerify.js'

import { url_registered, HOST } from '../util/url.js';

import { str_isEmpty, str_toUpperCase, str_CheckEqual, str_regex_userName, str_regex_password } from '../util/helpers.js'

export default {
  name: 'registered',
  data () {
    return {
      userName: '',
      passWord: '',
      passWordAlign: '',
      verifyCode: null,
      verifyCodeValue: ''
    }
  },
  methods: {
    registered () {
      if (str_isEmpty(this.userName)) {
        this.$toast({text: '请先填写用户名',time: 2000});
        return
      }
      if (str_isEmpty(this.passWord)) {
        this.$toast({text: '请填写密码',time: 2000});
        return
      }
      if (!str_CheckEqual(this.passWord,this.passWordAlign)) {
        this.$toast({text: '两次密码不一致',time: 2000});
        return
      }
      if (!str_regex_userName(this.userName)) {
        this.$toast({text: '用户名必须为数字、26个英文字母或者下划线',time: 2000});
        return
      }
      if (!str_regex_password(this.passWordAlign)) {
        this.$toast({text: '密码必须为字母和数字，长度6-12',time: 2000});
        return
      }
      var res = this.verifyCode.validate(this.verifyCodeValue);
      if (!res) {
        this.$toast({text: '验证码错误',time: 2000});
        return
      }
      this.$ajax.post(HOST + url_registered, {
          userName: this.userName,
          userPassword: str_toUpperCase(this.passWordAlign)
        }).then( (res)=> {
          if (res.data == 'OK' || res.data == 200) {
            this.$toast({text: '注册成功',time: 2000});
            this.$router.back();
          }
        })
    },
    backLoginPage () {
      this.$router.back();
    }
  },
  created: function () {
    this.changeTitle('注册');
  },
  mounted: function () {
    this.verifyCode = new GVerify({
      id: 'v_container',
      canvasId: "verifyCanvas", //canvas的ID
    });
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';

input,textarea {
  outline: 0;
}

#registered {
	input {
		display: block;
		padding: 20px;
		margin: 20px;
		font-size: .8rem;
		border: none;
		border-bottom: 1px solid pink;
    width: 90%;
	}
  p {
    text-align: right;
    margin: 0 20px;
    font-size: .7rem;
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
</style>
