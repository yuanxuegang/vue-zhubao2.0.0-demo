<template>
  <div class="addSwipe">
  <br><br>
    <Modal
        title="轮播图详情"
        v-model="modal"
        :styles="{top: '20px'}">
        <h4>用户详情：</h4>
        <h2>用户名：{{userObj.userName}}</h2>
        <h3>注册时间：{{userObj.RegistrationTime}}</h3>
        <h4>最后一次登录时间：{{userObj.loginTime}}</h4>
        <br>
        <span>用户头像</span>
        <img :src="userObj.userImg" alt="" width="100" height="100" style="vertical-align: middle;">
    </Modal>

    <Table :loading="tableLoading" border :columns="columns6" :data="userList" ref="table"></Table>

    <Row>
      <Col>
        <div style="text-align: center;padding: 20px 0;">
          <Page :total="userListNum" show-total :page-size="7" @on-change="changePageNum"></Page>
        </div>
      </Col>
    </Row>

  </div>
</template>

<script>

import moment from 'moment'

import { url_getUserList, HOST } from '../util/url.js';

export default {
  name: 'addSwipe',
  data () {
    return {
      userObj: {},
      userList: [],
      columns6: [{
        title: '#',
        key: '_id',
        sortable: false
      }, {
        title: '用户名',
        key: 'userName',
        sortable: true
      }, {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                console.log(params.index);
                this.userObj = this.userList[params.index];
                this.modal = true;
              }
            }
          }, '查看详情')]);
        }
      }],
      tableLoading: false,
      userListNum: null,
      modal: false
    }
  },
  computed: {
    
  },
  methods: {
    getUserList () {
      this.tableLoading = true;
      this.$http.get(HOST + url_getUserList, {
        params: {
          page: this.$route.params.page
        }
      }).then( (res)=> {
        console.log(res.data)
        res.data.userList.map(function (item) {
          item.userImg = HOST + item.userImg;
          item.RegistrationTime = moment(item.RegistrationTime).format('YYYY-MM-DD HH:mm:ss');
          item.loginTime = moment(item.loginTime).format('YYYY-MM-DD HH:mm:ss');
        })
        this.userList = res.data.userList;
        this.userListNum = res.data.userListNum;
        this.tableLoading = false;
      })
    },
    changePageNum (index) {
      console.log(index)
      this.$router.push({name:'user', params: {page: index-1}});
    }
  },
  created () {
    
  },
  mounted () {
    this.getUserList();
  },
  watch: {
    "$route" (to, from) {
      console.log(this.$route.params.page);
      this.getUserList()
    }
  }
}
</script>

<style scoped>
.addSwipe h3 {
  margin: 20px 0;
}
</style>
