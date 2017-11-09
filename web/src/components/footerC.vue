<template>
  <div class="footerC">
  	<nav class="navBar" v-if="$store.state.showfooterC">
  		<template v-for="(val,idx) in navData">
  			<div class="bar-item" v-on:click="addClass(val.titleName,idx)">
  				<img v-if="!(idx == onCtrl)" :src="val.imgUrl" alt="">
  				<img v-else :src="val.imgUrlActive" alt="">
  				<a :class="idx == onCtrl ? 'on' : '' ">{{val.titleName}}</a>
  			</div>
  		</template>
  	</nav>
  </div>
</template>

<script>

var navData = [{
		idx: 0,
		titleName: '首页',
		imgUrl: 'static/dist/images/duohao.png',
		imgUrlActive: 'static/dist/images/duohao-active.png'
	},{
		idx: 1,
		titleName: '分类',
		imgUrl: 'static/dist/images/duohao.png',
		imgUrlActive: 'static/dist/images/duohao-active.png'
	},{
		idx: 2,
		titleName: '爱秀',
		imgUrl: 'static/dist/images/aishow.png',
		imgUrlActive: 'static/dist/images/aishow-active.png'
	},{
		idx: 3,
		titleName: '会员中心',
		imgUrl: 'static/dist/images/gerenzhongxin.png',
		imgUrlActive: 'static/dist/images/gerenzhongxin-active.png'
	}]


export default {
  name: 'footerC',
  data () {
    return {
      navData: navData,
      onCtrl: 0
    }
  },
  computed: {
  	titleName () {
  		return this.$store.state.titleName
  	}
  },
  methods: {
  	addClass (titleName, idx) {
  		this.onCtrl = idx;
  		this.changeTitle(titleName);
  		switch (idx) {
  			case 0:
  				this.$router.replace({name: 'home'});
  				break;
  			case 1:
  				this.$router.replace({name: 'mall'});
  				break;
  			case 2:
  				this.$router.replace({name: 'aixiu'});
  				break;
  			case 3:
  				this.$router.push({name: 'member'});
  				break;
  			default:
  				break;
  		}
  	}
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';
.footerC {
	.navBar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
		background-color: #FFF;
		height: 2.5rem;
		@include flexBox;
		@include borderTop(1px,#d1d1d1);
		.bar-item {
			@include flexBox(flex, '', center);
			flex-direction: column;
			img {
				width: 1.5rem;
				height: 1.5rem;
			}
			a {
				font-size: .7rem;
				color: $colorDefaultTitle;
				&.on {
					color: $activeColor;
				}
			}
		}
	}
}
</style>
