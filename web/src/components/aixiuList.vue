<template>
  <div id="aixiu">
  <pullrefresh :callback="loadMoreList" ref="prdemo">
		<div class="aixiu-container" v-for="(item,index) in showList" @click="toDetailsPage(item._id)">

			<div class="userData">
				<img :src="item.userId.userImg" alt="">
				<p>{{item.userId.userName}}</p>
				<span>{{item.createTime | formatTime}}</span>
			</div>

			<p class="content">{{item.content}}</p>

			<img :src="item.contentImg" alt="" style="width: 100%;">

			<div class="details-container">
				<div class="like">
					<img src="static/dist/images/zan.png" alt="">
					<span>{{item.like}}</span>
				</div>
				<div class="comments">
					<span>??? 条评论</span>
				</div>
			</div>

			<div class="ctrl-container">

				<div class="like">
					<img src="static/dist/images/dianzan.png" alt="">
					<span>赞</span>
				</div>

				<div class="like">
					<img src="static/dist/images/pinglun.png" alt="">
					<span>评论</span>
				</div>

			</div>

			<div style="height: 10px;background-color: #f2f2f2;"></div>

		</div>
	</pullrefresh>
  </div>
</template>

<script>
import pullrefresh from './ydui/pullrefresh.vue'

export default {
  name: 'aixiu',
  components: {
  	pullrefresh
  },
  data () {
    return {

    }
  },
  props: {
  	showList: {
  		type: Array
  	}
  },
  methods: {
  	toDetailsPage (id) {
  		this.$router.push({name: 'aixiuDetails', query: {id}})
  	},
  	loadMoreList () {
  		this.$emit('call_loadMoreList','childParam');
  	},
  	loadMoreListFinished () {
  		console.log('ydui.pullrefresh.finishLoad')
  		this.$refs.prdemo.$emit('ydui.pullrefresh.finishLoad');
  	}
	},
	created () {
		
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';
.aixiu-container {
	padding: 0 15px;
	.userData {
		@include flexBox(flex, space-between, center);
		padding: 10px 0;
		img {
			height: 1.8rem;
			width: 1.8rem;
			border-radius: .3rem;
		}
		p {
			flex: 4;
			padding: 0 10px;
			color: $colorDefaultTitle;
			font-size: .8rem;
		}
		span {
			flex: 2;
			font-size: .4rem;
			color: $colorDefaultText;
			text-align: right;
		}
	}
	.content {
		font-size: .7rem;
		color: $colorDefaultText;
		font-family: '黑体';
		line-height: 1rem;
		text-indent: 2em;
		letter-spacing: 2px;
	}
	.details-container {
		@include flexBox(flex, space-between, center);
		padding: .4rem 0;
		@include borderBottom;
		.like {
			@include flexBox(flex, space-between, center);
			img {
				width: .8rem;
				height: .8rem;
			}
			span {
				font-size: .6rem;
				margin: 0 .3rem;
			}
		}
		.comments {
			@include flexBox(flex, space-between, center);
			span {
				font-size: .6rem;
				color: $colorDefaultText;
			}
		}
	}
	.ctrl-container {
		@include flexBox(flex, space-between, center);
		padding: .4rem 2rem;
		.like {
			@include flexBox(flex, space-between, center);
			img {
				width: .8rem;
				height: .8rem;
			}
			span {
				font-size: .6rem;
				margin: 0 .3rem;
			}
		}
	}
}
</style>
