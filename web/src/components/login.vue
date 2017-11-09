<template>
  <div id="login">
	<input v-model="userName" type="text" placeholder="请输入用户名">
	<input v-model="passWord" type="passWord" placeholder="请输入密码">
	<button class="btn-default" @click="login">登录</button>
  <p @click="toRegisteredPage">立即注册</p>
  </div>
</template>

<script>
import { url_login, HOST } from '../util/url.js';

import { str_isEmpty, str_toUpperCase } from '../util/helpers.js'

export default {
  name: 'login',
  data () {
    return {
      userName: null,
      passWord: null
    }
  },
  methods: {
  	login () {
      this.$ajax.post(HOST + url_login, {
        userName: this.userName,
        userPassword: str_toUpperCase(this.passWord)
      }).then( (res)=> {
        if (res.data.code == 999) {
          this.$toast({text: '登录失败',time: 2000});
        } else {
          this.$toast({text: '登录成功',time: 2000});
          res.data.userImg = HOST + res.data.userImg;
          this.$store.commit('_login',res.data);
          this.$router.push({name:'member'});
        }
      })
  	},
    toRegisteredPage () {
      this.$router.push({name:'registered'});
    }
  },
  created: function () {
    this.changeTitle('登录');
    this.$toast({
      text: '请先登录',
      time: 2000
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';

input,textarea {
  outline: 0;
}

#login {
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
