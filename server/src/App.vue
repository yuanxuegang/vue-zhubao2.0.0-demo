<template>
  <div id="app">

    <Row>
      <Col span="24">
        <h3 style="text-align: center;font-size: 2rem;border-bottom: 1px solid #666;">商城后台管理系统</h3>
      </Col>
    </Row>

    <Row style="height: 80vh;">
    <Col span="5" style="max-height: 100%;overflow-y: auto;overflow-x: hidden;">
    <Menu :theme="'light'" active-name="1-1" :open-names="[1]">

      <template v-for="(v,k) in navData">

        <Submenu :name="k+1">

          <template slot="title">
            <Icon type="ios-paper"></Icon>
              {{v.title}}
          </template>

          <template v-for="(vv,kk) in v.item">
            <MenuItem :name="`${k+1}-${kk+1}`" @click.native="routerPush(vv)">{{vv}}</MenuItem>
          </template>

        </Submenu>

      </template>
      
    </Menu>
    </Col>

    <Col span="19" style="overflow: hidden;">
      <router-view></router-view>
    </Col>

    </Row>

<!--     <Row>
      <Col>
        <div class="layout-copy">
            2011-2017 &copy; TalkingData
        </div>
      </Col>
    </Row> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      navData: [{
        title: '商品管理',
        item: ['轮播图','商品分类','添加/修改','查看商品']
      },{
        title: '用户管理',
        item: ['用户列表']
      },{
        title: '买家秀',
        item: ['买家秀列表']
      },{
        title: '订单管理',
        item: ['全部订单','待付款','待发货','待收货']
      }]
    }
  },
  methods: {
    routerPush (vv) {
      switch(vv)
        {
        case '轮播图':
          this.$router.push({name:'addSwipe'})
          break;
        case '商品分类':
          this.$router.push({name:'goodsCla'})
          break;
        case '添加/修改':
          this.$router.push({name:'addGoods'})
          break;
        case '查看商品':
          this.$router.push({name:'GoodsList', params: {page: 0}})
          break;
        case '用户列表':
          this.$router.push({name:'user', params: {page: 0}})
          break;
        case '买家秀列表':
          this.$router.push({name:'aixiuList', params: {page: 0}})
          break;
        case '全部订单':
          this.$router.push({name:'orderList', params: {page: 0}, query: {orderStatus: 0}})
          break;
        case '待付款':
          this.$router.push({name:'orderList', params: {page: 0}, query: {orderStatus: 1}})
          break;
        case '待发货':
          this.$router.push({name:'orderList', params: {page: 0}, query: {orderStatus: 2}})
          break;
        case '待收货':
          this.$router.push({name:'orderList', params: {page: 0}, query: {orderStatus: 3}})
          break;
        default:
          console.log('default')
        }
    }
  },
  created: function () {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/*.layout-copy{
    text-align: center;
    padding: 20px 0 20px;
    margin: 20px 0;
    color: #9ea7b4;
}*/
</style>
