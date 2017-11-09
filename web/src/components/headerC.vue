<template>
  <div class="headerC">
  	<span v-if="!$store.state.showfooterC" @click="back"><</span>
  	<span v-else></span>
  	<h1 class="headerText">{{titleName}}</h1>
  	<span></span>
  </div>
</template>

<script>
export default {
  name: 'headerC',
  data () {
    return {
      
    }
  },
  computed: {
  	titleName () {
  		return this.$store.state.titleName
  	}
  },
  methods: {
    back: function () {
      this.$router.goBack();
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';
.headerC {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 998;
	@include flexBox(flex, space-between, center);
	background-color: $bgColor;
	height: 1.8rem;
	padding: 0 20px;
	color: #FFF;
	.headerText {
		font-size: .8rem;
	}
}
</style>
