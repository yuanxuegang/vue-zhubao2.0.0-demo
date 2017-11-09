<template>
  <div class="goodsList">
    <Modal
        title="对话框标题"
        v-model="modal"
        :styles="{top: '20px'}">
        <h2>商品名称：{{goodsObj.goodsName}}</h2>
        <h3>商品价格：{{goodsObj.goodsPrice}}</h3>
        <h4>运费：{{goodsObj.inventory}}</h4>
        <h4>库存：{{goodsObj.freight}}</h4>
        <h4>日期：{{goodsObj.createTime}}</h4>
        <h4>是否为推荐商品：{{goodsObj.isRes ? '是' : '否'}}</h4>
        <h4>商品主图：</h4>
        <img :src="goodsObj.goodsImg" alt="" width="200" height="200">
        <h3>商品详情：</h3>
        <div v-html="goodsObj.goodsDetails" class="goodsDetails"></div>
    </Modal>

    <br><br>
    <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
        <Checkbox v-for="(val,idx) in goodsClaList" :label="val.claName"></Checkbox>
    </CheckboxGroup>
    <br><br>

    <Table :loading="tableLoading" border :columns="columns7" :data="goodsList" ref="table"></Table>

    <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出原始数据</Button>

    <Row>
      <Col>
        <div style="text-align: center;padding: 20px 0;">
          <Page :total="goodsListNum" show-total :page-size="7" @on-change="changePageNum"></Page>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import moment from 'moment'

import { url_goodsList, url_goodsCla, url_delGoods, HOST } from '../util/url.js';

export default {
  name: 'goodsList',
  data () {
    return {
      indeterminate: false, // 负责控制半选择状态的样式
      checkAll: true,  // 负责控制全选择状态的样式
      checkAllGroup: [],  // 负责存储选择状态的name
      checkInClaId: [], // 选中的分类存储的id，自己添加的，因为官方的只能存储name值
      columns7: [
          {
              title: '#',
              key: '_id',
              sortable: false
          },
          {
              title: '商品名称',
              key: 'goodsName',
              render: (h, params) => {
                  return h('div', [
                      // h('Icon', {
                      //     props: {
                      //         type: 'person'
                      //     }
                      // }),
                      h('strong', params.row.goodsName)
                  ]);
              }
          },
          {
              title: '价格',
              key: 'goodsPrice',
              sortable: true
          },
          {
              title: '日期',
              key: 'createTime',
              sortable: true
          },
          {
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
                                  console.log(params.index)
                                  this.goodsObj = this.goodsList[params.index]
                                  this.modal = true;
                              }
                          }
                      }, '查看'),
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
                      }, '删除')
                  ]);
              }
          }
      ],
      goodsList: [
          
      ],
      goodsClaList: [
          
      ],
      goodsListNum: null,
      modal: false,
      tableLoading: true,
      goodsObj: {}
    }
  },
  methods: {
    getGoodsCla () {
      this.$http.get(HOST + url_goodsCla).then( (res)=> {
        this.goodsClaList = res.data;
        for (var i = 0; i < this.goodsClaList.length; i++) {
          this.checkAllGroup.push(this.goodsClaList[i].claName);
        }
      })
    },
    getGoodsList (checkInClaId) {
      if (typeof checkInClaId == Array && checkInClaId.length == this.goodsClaList.length) {
        checkInClaId = {};
      }
      this.tableLoading = true;
      this.$http.get(HOST + url_goodsList, {
        params: {
          page: this.$route.params.page,
          checkInClaId: checkInClaId
        }
      }).then( (res) => {
        console.log(res.data)
        res.data.goodsList.map(function (item) {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
          item.goodsImg = HOST + item.goodsImg;
        })
        this.goodsList = res.data.goodsList;
        this.goodsListNum = res.data.goodsListNum;
        this.tableLoading = false;
      })
    },
    remove (index, _id) {
      this.goodsList.splice(index, 1);
      this.$http.delete(HOST + url_delGoods, {
        params: {
          _id: _id
        }
      }).then( (res)=> {
        this.reload();
      })
    },
    changePageNum (index) {
      this.$router.push({name:'GoodsList', params: {page: index-1}});
    },
    exportData (type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
            filename: '原始数据'
        });
      }
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = [];
        this.checkInClaId = [];
        for (var i = 0; i < this.goodsClaList.length; i++) {
          this.checkAllGroup.push(this.goodsClaList[i].claName);
        }
        for (var j = 0; j < this.goodsClaList.length; j++) {
          this.checkInClaId.push(this.goodsClaList[j]._id);
        }
      } else {
        this.checkAllGroup = [];
        this.checkInClaId = ['min'];
      }
    },
    checkAllGroupChange (data) {
      this.checkInClaId = [];
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < this.goodsClaList.length; j++) {
          if (data[i] == this.goodsClaList[j].claName) {
            this.checkInClaId.push(this.goodsClaList[j]._id);
          }
        }
      }
      console.log(this.checkInClaId);
      if (data.length === this.goodsClaList.length) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    }
  },
  watch: {
    "$route" (to, from) {
      console.log(this.$route.params.page);
      this.getGoodsList()
    },
    checkInClaId () {
      console.log(this.checkInClaId);
      this.getGoodsList(this.checkInClaId);
    }
  },
  mounted () {
    this.getGoodsList();
    this.getGoodsCla();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.goodsDetails img {
  width: 100%;
}
</style>
