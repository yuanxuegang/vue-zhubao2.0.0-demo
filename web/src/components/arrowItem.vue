<template>
  <div id="arrowItem">
  	<div class="arrowItem-container">
  		<span>{{leftText}}<span v-if="leftTextWithColor" :style="{ color: leftColor }">{{leftTextWithColor}}</span></span>
  		<span>{{rightText}}<span v-if="rightTextWithColor" :style="{ color: leftColor }">{{rightTextWithColor}}</span></span>
  		<img v-if="arrowCtrl" src="static/dist/images/jiaotou.png" alt="">
  	</div>
  </div>
</template>

<script>
import { isColor } from '../util/assist.js'
export default {
  name: 'arrowItem',
  data () {
    return {
      
    }
  },
  props: {
  	arrowCtrl:{
	  	type: Boolean,
	    required: true
  	},
  	leftText:{
	  	type: [String,Number],
	    required: true
  	},
  	rightText:{
	  	type: [String,Number]
  	},
  	leftTextWithColor:{
	  	type: [String,Number],
  	},
  	rightTextWithColor:{
	  	type: [String,Number]
  	},
  	leftColor:{
	  	type: String,
	  	default: '#f00',
	  	validator: function (value) {
	  		return isColor(value)
	  	}
  	},
  	rightColor:{
	  	type: String,
	  	default: '#f00',
	  	validator: function (value) {
	  		return isColor(value)
	  	}
  	}
  },
  created: function () {

  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';
.arrowItem-container {
	@include flexBox(flex, space-between, '');
	position: relative;
	padding: .5rem 1rem;
	@include borderBottom;
	img {
		position: absolute;
		top: 50%;
		right: 0;
		height: 8px;
		transform: translate3d(0,-50%,0);
		padding: 0 10px;
	}
	span {
		font-size: .6rem;
		font-family: '黑体';
		color: $colorDefaultText;
	}
}
</style>
