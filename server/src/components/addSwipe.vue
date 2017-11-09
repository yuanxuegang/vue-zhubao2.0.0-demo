<template>
  <div class="addSwipe">
    <br><br>
    <label>轮播图</label>
    <input @change="uploadImg($event)" id="swipeImg" type="file" accept="image/*">
    <br><br>
    <img :src="swipeImg" alt="" width="200" height="200">
    <br><br>
    <Button type="success" @click.native="addSwipe">添加</Button>

    <Modal
        title="轮播图详情"
        v-model="modal"
        :styles="{top: '20px'}">
        <h4>轮播图：</h4>
        <br>
        <img :src="swipeObj.swipeImg" alt="" width="400" height="400">
    </Modal>

    <Table :loading="tableLoading" border :columns="columns6" :data="swipeList" ref="table"></Table>
  </div>
</template>

<script>

import moment from 'moment'
import {compress} from '../util/img_util.js'

import { url_swipe, HOST } from '../util/url.js';

export default {
  name: 'addSwipe',
  data () {
    return {
      swipeImg: '',
      swipeList: [],
      columns6: [{
        title: '#',
        key: '_id',
        sortable: false
      }, {
        title: '创建日期',
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
                console.log(params.index);
                this.swipeObj = this.swipeList[params.index];
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
                this.remove(params.index, params.row._id);
              }
            }
          }, '删除')]);
        }
      }],
      tableLoading: false,
      swipeObj: {},
      modal: false
    }
  },
  computed: {
    
  },
  methods: {
    uploadImg (event) {
      this.swipeImg = window.URL.createObjectURL(event.target.files["0"]);
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function(evt) {
        if (event.target.files[0].size > 512 * 512 * 4) {
          var img = new Image();
          img.src = evt.srcElement.result;
          img.onload = function() {
            var imgBase64 = compress(img);
            that.swipeImg = imgBase64;
            // console.log(that.swipeImg)
          }
        } else {
          that.swipeImg = evt.srcElement.result;
          // console.log(that.swipeImg)
        }
      }
    },
    getSwipe () {
      this.$http.get(HOST + url_swipe).then( (res)=> {
        res.data.map(function (item) {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
          item.swipeImg = HOST + item.swipeImg;
        })
        this.swipeList = res.data;
      })
    },
    addSwipe () {
      if (this.swipeImg == '') {
        this.$Notice.warning({
            title: '失败',
            desc: '请正确添加图片'
        });
        return
      }
      this.$http({
        method: 'post',
        url: HOST + url_swipe,
        data: {
          swipeImg: this.swipeImg
        }
      }).then( (res) => {
        this.reload()
      })
    },
    remove (idx, _id) {
      this.swipeList.splice(idx, 1);
      this.delSwipe(_id);
    },
    delSwipe (_id) {
      this.$http.delete(HOST + url_swipe,{
        params: {
          _id: _id
        }
      }).then( (res) => {
        this.reload()
      })
    }
  },
  created () {
    this.getSwipe();
  },
  mounted () {
    
  }
}
</script>

<style scoped>
.addSwipe h3 {
  margin: 20px 0;
}
</style>
