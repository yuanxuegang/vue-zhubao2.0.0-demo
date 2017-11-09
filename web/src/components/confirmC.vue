<template>
	<div>
		<div v-if="confirmShow" class="layer"></div>
	  <div id="confirmC" class="confirmC" :class="confirmShow ? 'on' : ''">
			<h4>{{title}}</h4>
			<p>{{content}}</p>
			<slot></slot>
	  </div>
	</div>
</template>

<script>
export default {
  name: 'confirmC',
  data () {
    return {
      title: '提示'
    }
  },
  props: {
  	content: {
  		type: String
  	},
  	confirmShow: {
  		type: Boolean
  	}
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';
.confirmC {
	position: fixed;
	left: 50%;
	top: 50%;
	width: 80%;
	transform: translate3d(-50%,-20%,0);
	opacity: 0;
	transition: all .5s;
	background-color: #FFF;
	border-radius: .3rem;
	@include flexBox(flex, space-around, center);
	flex-direction: column;
	padding: .8rem;
	color: $colorDefaultText;
	z-index: 99;
	visibility: hidden;
	> * {
		padding: 10px 0;
	}
	.btn-group {
		button {
			padding: 10px 20px;
			border: none;
			background-color: #c2c2c2;
			color: #FFF;
			font-size: .8rem;
			border-radius: .2rem;
			margin: 0 .2rem;
		}
		button:nth-child(2n) {
			background-color: $activeColor;
		}
	}
}

.on {
	transform: translate3d(-50%,-50%,0);
	opacity: 1;
	visibility: visible;
}


.layer {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0,0,0,.4);
/*	-webkit-pointer-events: none;
	-moz-pointer-events: none;
	-ms-pointer-events: none;
	-o-pointer-events: none;
	pointer-events: none;*/
}
</style>
