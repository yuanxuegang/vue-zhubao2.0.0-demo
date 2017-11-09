<template>
<transition name="slide-fade">
  <div id="toastPlus" v-if="show">
  	<div class="toast-wrap">{{text}}</div>
  </div>
</transition>
</template>

<script>

export default {
  name: 'toastPlus',
  data () {
    return {
      
    }
  },
  props: {
  	show: {
  		type: Boolean,
  		default: false
  	},
  	// time: {
  	// 	type: Number,
  	// 	default: 1500
  	// },
  	text: {
  		type: String
  		// required: true
  	}
  }
}
</script>

<style lang="scss">
#toastPlus {
	position: fixed;
	bottom: 10%;
	left: 50%;
	transform: translate3d(-50%,0,0);
	.toast-wrap {
		background-color: rgba(0,0,0,.7);
		color: #FFF;
		padding: .6rem;
		border-radius: .3rem;
		font-size: .7rem;
		font-family: '黑体';
	}
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
	transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
	opacity: 0;
}
</style>
