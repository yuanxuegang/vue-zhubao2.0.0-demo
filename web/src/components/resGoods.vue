<template>
  <div class="resGoods">
  	<template v-for="(val,idx) in listData">
  		<img :src="val.goodsImg" alt="" @click="toGoodsDetails(val._id)">
  	</template>
  </div>
</template>

<script>
export default {
  name: 'resGoods',
  data () {
    return {
      
    }
  },
  props: {
  	listData: {
  		type: Array,
  		required: true,
  		default: function () {
  			return []
  		},
  	// 	validator: function (value) {
			// 	return value.length != 0
			// }
  	}
  },
  created: function () {
  	
  },
  methods: {
  	toGoodsDetails (goodsId) {
  		this.$router.push({name: 'goodsDetails', query: {goodsId}})
  	}
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';
.resGoods {
	padding: 10px;
	&:after {
		clear:both;
		content:'.';
		display:block;
		width: 0;
		height: 0;
		visibility:hidden;
	}
	img {
		width: 50%;
		height: 6rem;
		float: left;
		padding: 10px;
		box-sizing: border-box;
		border-radius: 1rem;
		&:nth-of-type(3n) {
			width: 100%;
			height: 12rem;
		}
	}
}
</style>
