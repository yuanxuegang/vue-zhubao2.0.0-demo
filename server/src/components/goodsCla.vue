<template>
  <div class="goodsCla">
    <br><br>
    <i-input v-model="claName" placeholder="请输入..." style="width: 300px"></i-input>
    <i-button type="success" @click="addGoodsCla">添加分类</i-button>

    <br><br>
    <template v-for="(val,idx) in cla">
      <Alert closable @on-close="delCla(val._id,$event)">{{val.claName}}</Alert>
    </template>
  </div>
</template>

<script>

import { url_goodsCla, HOST } from '../util/url.js';

// var cla = [{
//   claId: 1,
//   claName: '戒指',
//   num: 22
// },{
//   claId: 2,
//   claName: '手链',
//   num: 33
// }]

export default {
  name: 'goodsCla',
  data () {
    return {
      cla: [],
      claName: ''
    }
  },
  computed: {
    
  },
  methods: {
    addGoodsCla () {
      this.$http.post(HOST + url_goodsCla, {
        claName: this.claName
      }).then( (res)=> {
        this.reload();
      })
    },
    getGoodsCla () {
      this.$http.get(HOST + url_goodsCla).then( (res)=> {
        this.cla = res.data;
      })
    },
    delCla (_id, event) {
      console.log(event)
      this.$Modal.confirm({
        title: '提示',
        content: '删除分类将会删除分类下的所有商品',
        loading: true,
        onOk: ()=> {
          this.$http.delete(HOST + url_goodsCla, {
            params: {
              _id: _id
            }
          }).then( (res)=> {
            this.reload();
          })
        },
        onCancel: ()=> {
          this.reload();
        }
      });
    }
  },
  mounted () {
    this.getGoodsCla();
  }
}
</script>

<style>
.goodsCla {

}
.demo-badge-alone{
    background: #5cb85c !important;
}
</style>
