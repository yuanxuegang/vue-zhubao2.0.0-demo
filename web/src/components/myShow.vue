<template>
  <div id="aixiu">
  	<aixiuList ref="aixiuComponents" :showList="showList" v-on:call_loadMoreList="getAixiuListByPullrefresh"></aixiuList>
  	<div class="releaseBtn" @click="toRelease">
  		<p>+</p>
  	</div>
  </div>
</template>

<script>

// var showList = [{
//     showId: 1502080148770,
//     userName: 'liyiwei',
//     userImg: 'http://img12.3lian.com/gaoqing02/06/22/04.jpg',
//     showContent: '这里默认有一条爱秀评论数据，评论发布在个人中心模块我的买家秀模块里面发布，因为没有后台数据，所以发布的时候用户头像和发布图片用固定的，内容则是发布时写的内容，原项目这里点击进去还可以看到爱秀详情页，可以发表评论和点赞的，这里没后台做起来比较麻烦，省略了，这里是整个商城的买家秀模块，而个人中心里面的是用户自己的，这里也不作区分了总体合在一起了，可以到微信小程序看原项目的效果(注意，这里没有使用本地缓存，页面刷新后发布的数据就没了哦)',
//     showImg: 'http://img12.3lian.com/gaoqing02/06/22/05.jpg',
//     createdTime: 1502080148770,
//     likeNum: 66,
//     commentsNum: 12
//     },{
//     showId: 1503640144771,
//     userName: 'liyiwei',
//     userImg: 'http://img12.3lian.com/gaoqing02/06/22/04.jpg',
//     showContent: '这里默里片点击进去还可以看到爱秀详情页，可以发表评论和点赞的，这里没后台做起来比较麻烦，省略了，这里是整个商城的买家秀模块，而个人中心里面的是用户自己的，这里也不作区分了总体合在一起了，可以到微信小程序看原项目的效果(注意，这里没有使用本地缓存，页面刷新后发布的数据就没了哦)',
//     showImg: 'http://img3.3lian.com/2006/002/07/037.jpg',
//     createdTime: 1503640144771,
//     likeNum: 138,
//     commentsNum: 72
//     },{
//     showId: 1503880148772,
//     userName: 'liyiwei',
//     userImg: 'http://img12.3lian.com/gaoqing02/06/22/04.jpg',
//     showContent: '这里默认里面发布项目这里点击进去还可以看到爱秀详情页，可以发表评论和点击进去还可以看到爱秀详情页，可以发表评论和点击进去还可以看到爱秀详情页，可以发表评论和',
//     showImg: 'http://img3.3lian.com/2006/002/07/036.jpg',
//     createdTime: 1503880148772,
//     likeNum: 3,
//     commentsNum: 2
//     }]

    
import aixiuList from './aixiuList.vue';

import { url_getAixiuList, HOST } from '../util/url.js';

export default {
  name: 'aixiu',
  data () {
    return {
      showList: [],
      num: 0
    }
  },
  created: function () {
  	if (this.$route.query.pageTitleName) {
  		this.changeTitle(this.$route.query.pageTitleName);
  	}
    this.getAixiuList();
  },
  components: {
  	aixiuList
  },
  methods: {
  	toRelease () {
  		this.$router.push({name:'release'})
  	},
    getAixiuList () {
      this.$ajax.get(HOST + url_getAixiuList, {
        params: {
          userId: this.$store.state.userData.status,
          num: this.num
        }
      }).then( (res)=> {
        res.data.map(function (item) {
          item.contentImg = HOST + item.contentImg;
          item.userId.userImg = HOST + item.userId.userImg;
        })
        setTimeout( () => {
          this.showList = [...res.data,...this.showList];
          this.$toast({
            text: res.data.length ? '更新成功' : '已是最新'
          })
          this.$refs.aixiuComponents.loadMoreListFinished()
        }, 1000)
      })
    },
    getAixiuListByPullrefresh (params) {
      console.log(params)
      this.num++;
      this.getAixiuList();
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';
.releaseBtn {
	position: fixed;
	bottom: 2rem;
	right: 1rem;
	background-color: $activeColor;
	border-radius: 50%;
	width: 2rem;
	height: 2rem;
	@include flexBox(flex, space-around, center);
	p {
		color: #FFF;
		font-size: 1.6rem;
	}
}
</style>
