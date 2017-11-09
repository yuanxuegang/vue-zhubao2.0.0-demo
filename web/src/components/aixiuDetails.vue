<template>
  <div id="aixiuDetails">
		<div class="aixiuDetails-container" v-for="(item,index) in [aixiuDetails]">

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
					<span>{{aixiuDetailsWithComments.length}}条评论</span>
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

		</div>

		<div style="height: 10px;background-color: #f2f2f2;"></div>

		<div class="commentsList-container">
			<div class="commentsList-item" v-for="(val,idx) in aixiuDetailsWithComments">
				<img :src="val.fromUser.userImg" alt="" width="40" height="40">
				<div class="commentsList-content">
					<div class="user-name">
						<p>{{val.fromUser.userName}}</p>
						<p>{{val.createTime | formatTime}}</p>
					</div>
					<p class="content">{{val.comments}}</p>
				</div>
			</div>
		</div>

		<div class="textarea-container">
			<textarea placeholder="评论" v-model="msg"></textarea>
			<button @click="sendMsg">发送</button>
		</div>

  </div>
</template>

<script>

// var aixiuDetails = {
// 	    showId: 1502080148770,
// 	    userName: 'liyiwei',
// 	    userImg: 'http://img12.3lian.com/gaoqing02/06/22/04.jpg',
// 	    showContent: '这里默认有一条爱秀评论数据，评论发布在个人中心模块我的买家秀模块里面发布，因为没有后台数据，所以发布的时候用户头像和发布图片用固定的，内容则是发布时写的内容，原项目这里点击进去还可以看到爱秀详情页，可以发表评论和点赞的，这里没后台做起来比较麻烦，省略了，这里是整个商城的买家秀模块，而个人中心里面的是用户自己的，这里也不作区分了总体合在一起了，可以到微信小程序看原项目的效果(注意，这里没有使用本地缓存，页面刷新后发布的数据就没了哦)',
// 	    showImg: 'http://img12.3lian.com/gaoqing02/06/22/05.jpg',
// 	    createdTime: 1502080148770,
// 	    likeNum: 66,
// 	    commentsNum: 12,
// 	    commentsList: [{
// 	    	userName: 'liyiwei1',
// 	    	userImg: 'http://img12.3lian.com/gaoqing02/06/22/04.jpg',
// 	    	content: '这里默认有一条用户的评论数据这里默认有一条用户的评论数据这里默认有一条用户的评论数据这里默认有一条用户的评论数据',
// 	    	createdTime: 1502080248770
// 	    },{
// 	    	userName: 'liyiwei2',
// 	    	userImg: 'http://img12.3lian.com/gaoqing02/06/22/06.jpg',
// 	    	content: '这里默认有一条用户的评论数据这里默认有一条用户的评论数据这里默认有一条用户的评论数据这里默认有一条用户的评论数据',
// 	    	createdTime: 1502080348770
// 	    },{
// 	    	userName: 'liyiwei1',
// 	    	userImg: 'http://img12.3lian.com/gaoqing02/06/22/04.jpg',
// 	    	content: '这里默认有一条用户的评论数据这里默认有一条用户的评论数据这里默认有一条用户的评论数据这里默认有一条用户的评论数据',
// 	    	createdTime: 1502080448770
// 	    },{
// 	    	userName: 'liyiwei4',
// 	    	userImg: 'http://img12.3lian.com/gaoqing02/06/22/05.jpg',
// 	    	content: '这里默认默认有一条用默认有一条用户的评论数据这里默认有一条用户的评论数据',
// 	    	createdTime: 1502080748770
// 	    }]
// 	  }

import { url_getAixiuListDetails, url_saveComment, HOST } from '../util/url.js'
import { str_isEmpty, str_toUpperCase, str_CheckEqual, str_regex_userName, str_regex_password } from '../util/helpers.js'

export default {
  name: 'aixiuDetails',
  data () {
    return {
    	aixiuDetails: {
    		userId: {

    		}
    	},
    	aixiuDetailsWithComments: [{
    		fromUser: {

    		}
    	}],
    	msg: ''
    }
  },
  props: {
  	
  },
  methods: {
  	getAixiuListDetails () {
  		this.$ajax.get(HOST + url_getAixiuListDetails, {
  			params: {
  				id: this.$route.query.id
  			}
  		}).then( (res) => {
  			console.log(res)
  			this.aixiuDetails = res.data.aixiuDetails;
  			this.aixiuDetailsWithComments = res.data.aixiuDetailsWithComments;

				this.aixiuDetails.userId.userImg = HOST + this.aixiuDetails.userId.userImg;
				this.aixiuDetails.contentImg = HOST + this.aixiuDetails.contentImg;

				this.aixiuDetailsWithComments.map(function (item) {
					item.fromUser.userImg = HOST + item.fromUser.userImg;
				})
  		})
  	},
  	sendMsg () {
  		console.log(this.msg);
  		console.log(this.$store.state.userData.status)
  		console.log(this.aixiuDetails._id)
  		if (str_isEmpty(this.msg)) {
  			this.$toast({
	    		text: '请输入内容',
	    		time: 2000
	    	})
  			return
  		}
  		if (str_isEmpty(this.$store.state.userData.status)) {
  			this.$toast({
	    		text: '请先登录',
	    		time: 2000
	    	})
  			return
  		}
  		this.$ajax.post(HOST + url_saveComment, {
        comments: this.msg,
        fromUser: this.$store.state.userData.status,
        aixiuDetails: this.aixiuDetails._id
      }).then( (res) => {
      	if (res.status == 200) {
      		this.$toast({
		    		text: '发布成功',
		    		time: 2000
		    	});
		    	this.getAixiuListDetails();
      	}
      })
  	}
	},
	created () {
		console.log(this.$route.query.id);
		this.getAixiuListDetails();
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';
.aixiuDetails-container {
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

.commentsList-container {
	width: 100%;
	.commentsList-item {
		@include flexBox(flex, flex-start, '');
		padding: 15px;
		width: 100%;
		img {
			border-radius: .3rem;
		}
		.commentsList-content {
			flex-direction: column;
			width: 100%;
			.user-name {
				width: 100%;
				@include flexBox(flex, space-between, center);
				height: 40px;
				p {
					font-size: .8rem;
					color: $colorDefaultText;
				}
				p:nth-child(1) {
					padding-left: .4rem;
				}
				p:nth-child(2) {
					font-size: .4rem;
				}
			}
			.content {
				font-size: .7rem;
				padding-left: .4rem;
				letter-spacing: 2px;
				line-height: .9rem;
				color: $colorDefaultText;
			}
		}
	}
}

.textarea-container {
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	height: 2rem;
	border-top: 1px solid #c8c8c8;
	@include flexBox(flex, '', center);
	textarea {
		height: 100%;
		border: none;
		outline: 0;
		font-size: 1rem;
		flex: 8;
		padding: .4rem;
	}
	button {
		height: 100%;
		font-size: .8rem;
		flex: 2;
		background-color: $activeColor;
		color: #FFF;
		border: none;
		font-weight: bold;
	}
}
</style>
