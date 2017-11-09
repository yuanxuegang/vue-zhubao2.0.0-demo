<template>
  <div class="orderList">
    <br><br>
    <Modal
        title="订单详情"
        v-model="modal"
        :styles="{top: '20px'}">
        <h2>订单详情：</h2>
        <h3>收货人：</h3>
        <p>{{orderObj.address.receiveName}}</p>
        <h3>联系电话：</h3>
        <p>{{orderObj.address.receivePhone}}</p>
        <h3>收货地址：</h3>
        <p>{{orderObj.address.receiveProv}}{{orderObj.address.receiveCity}}{{orderObj.address.receiveDistr}}{{orderObj.address.receiveAddr}}</p>
        <h3>创建时间：</h3>
        <p>{{orderObj.createTime}}</p>
        <h3>商品图片</h3>
        <img :src="orderObj.goodsDetails.goodsImg" alt="" width="400" height="400">
    </Modal>

    <Table :row-class-name="rowClassName" :loading="tableLoading" border :columns="columns6" :data="orderList" ref="table"></Table>

    <Row>
      <Col>
        <div style="text-align: center;padding: 20px 0;">
          <Page :total="orderListNum" show-total :page-size="7" @on-change="changePageNum"></Page>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>

import moment from 'moment'

import { url_getOrderList, url_delOrder, url_shippedOrder, HOST } from '../util/url.js';

export default {
  name: 'orderList',
  data () {
    return {
      orderObj: {
        address: {
          
        },
        goodsDetails: {
          
        }
      },
      orderList: [],
      columns6: [{
        title: '#',
        key: '_id',
        sortable: false
      }, {
        title: '创建时间',
        key: 'createTime',
        sortable: true
      }, {
        title: '订单状态',
        key: 'orderStatueText',
        sortable: false,
        render: (h, params) => {
          return h('div', [
            h('span', {
            props: {
              
            },
            style: {
              display: 'inlineBlock',
              paddingRight: '5px'
            }
          }, params.row.orderStatueText),
            h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            style: {
              display: params.row.orderStatus == 2 || params.row.orderStatus == 3 ? 'inlineBlock' : 'none',
              marginRight: '5px'
            },
            on: {
              click: () => {
                if (params.row.orderStatus == 2) {
                  this.shippedOrder(params.index, params.row._id)
                } else {
                  console.log('查看物流')
                  // 查看物流方法、、、
                }
              }
            }
          }, params.row.orderStatus == 2 ? '确认发货' : '查看物流')]);
        }
      }, {
        title: '订单地址',
        key: 'concatAddress_dev',
        sortable: false
      }, {
        title: '订单金额',
        key: 'orderMoney',
        sortable: false
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
                this.orderObj = this.orderList[params.index];
                this.modal = true;
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
                    this.remove(params.index, params.row._id)
                  }
              }
          }, '删除')]);
        }
      }],
      tableLoading: false,
      orderListNum: null,
      modal: false
    }
  },
  methods: {
    getOrderList () {
      this.tableLoading = true;
      this.$http.get(HOST + url_getOrderList, {
        params: {
          orderStatus: this.$route.query.orderStatus,
          page: this.$route.params.page
        }
      }).then( (res)=> {
        this.orderList = res.data.orderList;
        this.orderListNum = res.data.orderListNum;
        this.orderList.map(function (item) {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
          item.concatAddress_dev = item.address.receiveProv + item.address.receiveCity + item.address.receiveDistr + item.address.receiveAddr;
          item.orderMoney = '￥ ' + (item.goodsDetails.goodsNum * item.goodsDetails.goodsPrice + item.goodsDetails.freight);
        })
        this.tableLoading = false;
      })
    },
    changePageNum (index) {
      this.$router.push({name:'orderList', params: {page: index-1}, query: {orderStatus: this.$route.query.orderStatus}});
    },
    remove (index, _id) {
      this.orderList.splice(index, 1);
      this.$http.delete(HOST + url_delOrder, {
        params: {
          _id: _id
        }
      }).then( (res)=> {
        if (res.data == "OK") {
          this.reload();
        }
      })
    },
    shippedOrder (index, _id) {
      this.$http.post(HOST + url_shippedOrder, {
        _id: _id
      }).then( (res)=> {
        if (res.data == "OK") {
          this.reload();
        }
      })
    },
    rowClassName (row, index) {
      if (moment(row.createTime, "YYYYMMDD").fromNow().search(/days/i) == -1) {
        return '';
      } else if (row.orderStatus == 2) {
        // console.log('表格高亮提示')
        return 'demo-table-warn-row';
      }
    }
  },
  created: function () {
    this.getOrderList();
  },
  watch: {
    "$route" (to, from) {
      this.getOrderList();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.ivu-table .demo-table-warn-row td{
  background-color: #feff9c;
}
</style>
