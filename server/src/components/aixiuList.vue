<template>
  <div class="addSwipe">
  <br><br>
    <Modal
        title="轮播图详情"
        v-model="modal"
        :styles="{top: '20px'}">
        <h2>爱秀详情：</h2>
        <h3>爱秀内容：</h3>
        <p>{{aixiuObj.content}}</p>
        <h3>发布用户：</h3>
        <p>{{aixiuObj.userId.userName}}</p>
        <h3>发布时间：</h3>
        <p>{{aixiuObj.createTime}}</p>
        <h3>点赞数</h3>
        <p>{{aixiuObj.like}}</p>
        <h3>爱秀图片</h3>
        <img :src="aixiuObj.contentImg" alt="" width="400" height="400">
        <br>
        <Table :loading="tableLoading" border :columns="columns7" :data="aixiuDetailsWithComments" ref="table"></Table>
    </Modal>

    <Table :loading="tableLoading" border :columns="columns6" :data="aixiuList" ref="table"></Table>

    <Row>
      <Col>
        <div style="text-align: center;padding: 20px 0;">
          <Page :total="aixiuListNum" show-total :page-size="7" @on-change="changePageNum"></Page>
        </div>
      </Col>
    </Row>

  </div>
</template>

<script>

import moment from 'moment'

import { url_getAixiuList, url_delAixiu, url_getAixiuListDetails, url_delComment, HOST } from '../util/url.js';

export default {
  name: 'addSwipe',
  data () {
    return {
      aixiuObj: {
        userId: {

        }
      },
      aixiuList: [],
      aixiuDetailsWithComments: [],
      columns6: [{
        title: '#',
        key: '_id',
        sortable: false
      }, {
        title: '发布时间',
        key: 'createTime',
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
                this.getAixiuListDetails(this.aixiuList[params.index]);
              }
            }
          }, '查看详情'),
            h('Button', {
              props: {
                  type: 'error',
                  size: 'small'
              },
              on: {
                  click: () => {
                    // console.log(params.row._id)
                    this.remove(params.index, params.row._id)
                  }
              }
          }, '删除')]);
        }
      }],
      columns7: [{
        title: '#',
        key: '_id',
        sortable: false,
        ellipsis: true
      }, {
        title: '评论时间',
        key: 'createTime',
        sortable: true
      }, {
        title: '评论内容',
        key: "comments",
      }, {
        title: '操作',
        key: 'action',
        width: 100,
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                  type: 'error',
                  size: 'small'
              },
              on: {
                  click: () => {
                    this.removeComments(params.index, params.row._id)
                  }
              }
          }, '删除')]);
        }
      }],
      tableLoading: false,
      aixiuListNum: null,
      modal: false
    }
  },
  computed: {
    
  },
  methods: {
    getAixiuList () {
      this.tableLoading = true;
      this.$http.get(HOST + url_getAixiuList, {
        params: {
          page: this.$route.params.page
        }
      }).then( (res)=> {
        console.log(res.data)
        this.aixiuList = res.data.aixiuList;
        this.aixiuListNum = res.data.aixiuListNum;
        this.aixiuList.forEach(function (item) {
          item.contentImg = HOST + item.contentImg;
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
        })
        this.tableLoading = false;
      })
    },
    getAixiuListDetails (obj) {
      console.log(obj._id);
      this.$http.get(HOST + url_getAixiuListDetails, {
        params: {
          id: obj._id
        }
      }).then( (res) => {
        console.log(res);
        res.data.aixiuDetails.contentImg = HOST + res.data.aixiuDetails.contentImg;
        this.aixiuObj = res.data.aixiuDetails;
        this.aixiuDetailsWithComments = res.data.aixiuDetailsWithComments;
        this.aixiuDetailsWithComments.map(function (item) {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
        })
      })
      this.modal = true;
    },
    changePageNum (index) {
      this.$router.push({name:'aixiuList', params: {page: index-1}});
    },
    remove (index, _id) {
      this.aixiuList.splice(index, 1);
      this.$http.delete(HOST + url_delAixiu, {
        params: {
          _id: _id
        }
      }).then( (res)=> {
        this.reload();
      })
    },
    removeComments (index, _id) {
      this.$http.delete(HOST + url_delComment, {
        params: {
          _id: _id
        }
      }).then( (res) => {
        this.reload();
      })
    }
  },
  created () {
    this.getAixiuList();
  },
  mounted () {

  },
  watch: {
    "$route" (to, from) {
      console.log(this.$route.params.page);
      this.getAixiuList()
    }
  }
}
</script>

<style scoped>
.addSwipe h3 {
  margin: 20px 0;
}
</style>
