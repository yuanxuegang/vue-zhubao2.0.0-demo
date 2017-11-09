<template>
  <div class="claListNav">

  	<ul>
  		<li v-for="(val,idx) in listData" @click="toPage(val.listName)">
  			<img :src="val.imgUrl" :style="{ width: imgSize, height: imgSize }">
  			<p :style="{ color: textColor, fontSize: textSize }">{{val.listName}}</p>
  		</li>
  	</ul>
  	
  </div>
</template>

<script>
import { isColor } from '../util/assist.js'
export default {
  name: 'claListNav',
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
  		validator: function (value) {
				return value.length != 0
			}
  	},
  	imgSize: {
  		type: String,
  		default: '20px'
  	},
  	textSize: {
  		type: String,
  		default: '20px'
  	},
  	textColor: {
  		type: String,
  		default: '#000',
  		validator: function (value) {
  			return isColor(value)
			}
  	}
  },
  created: function () {
  	
  },
  methods: {
    toPage (pageName) {
      console.log(pageName);
      switch (pageName) {
        case '我的买家秀':
          this.$router.push({name: 'myShow', query: {pageTitleName:'我的买家秀'}})
          break;
        case '待付款':
          this.$router.push({name: 'myOrder', query: {idx:1}})
          break;
        case '待发货':
          this.$router.push({name: 'myOrder', query: {idx:2}})
          break;
        case '待收货':
          this.$router.push({name: 'myOrder', query: {idx:3}})
          break;
        case '售后/退款':
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';

.claListNav {
	ul {
		@include flexBox;
		list-style-type: none;
		padding: 20px 0;
		li {
			@include flexBox;
			flex-direction: column;
			p {
				margin-top: .4rem;
			}
		}
	}
}
</style>
