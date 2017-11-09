<template>
  <div class="addGoods">
    <h3>添加商品</h3>
    <label>商品名称：</label>
    <i-input v-model="goodsName" placeholder="请输入..." style="width: 300px"></i-input>
    <br><br>
    <label>商品价格：</label>
    <i-input v-model="goodsPrice" placeholder="请输入..." style="width: 300px"></i-input>
    <br><br>
    <label>运费：</label>
    <i-input v-model="freight" placeholder="请输入..." style="width: 300px"></i-input>
    <br><br>
    <label>库存：</label>
    <i-input v-model="inventory" placeholder="请输入..." style="width: 300px"></i-input>
    <br><br>
    <Select v-model="claObjId" clearable style="width:200px" @on-change="selectClaId">
        <Option v-for="val in claList" :value="val._id" :key="val._id">{{ val.claName }}</Option>
    </Select>
    <br><br>
    <label>商品主图</label>
    <input @change="uploadImg($event)" id="goodsImg" type="file" accept="image/*">
    <br><br>
    <img :src="goodsImg" alt="" width="200" height="200">
    <br><br>
    <label>是否设为推荐商品</label>
    <i-switch @on-change="resStatus"></i-switch>
    <br><br>
    <quill-editor 
      ref="myTextEditor"
      v-model="goodsDetails"
      :config="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
      @ready="onEditorReady($event)">
    </quill-editor>
    <br><br>
    <Button type="success" @click.native="addGoods">添加</Button>
  </div>
</template>

<script>

import {compress} from '../util/img_util.js'

import { url_addGoods, url_goodsCla, url_uploadGoodsDetalsImg, HOST } from '../util/url.js';

export default {
  name: 'addGoods',
  data () {
    return {
      goodsName: '',
      goodsPrice: null,
      goodsImg: '',
      goodsDetails: '',
      freight: null,
      inventory: null,
      editorOption: {
       // something config
      },
      isRes: false,
      claList: [],
      claObjId: ''
    }
  },
  computed: {
    
  },
  methods: {
    uploadImg (event) {
      this.goodsImg = window.URL.createObjectURL(event.target.files["0"]);
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function(evt) {
        console.log(evt);
        if (event.target.files[0].size > 512 * 512 * 4) {
          var img = new Image();
          img.src = evt.srcElement.result;
          img.onload = function() {
            var imgBase64 = compress(img);
            that.goodsImg = imgBase64;
            // console.log(that.goodsImg)
          }
        } else {
          that.goodsImg = evt.srcElement.result;
          // console.log(that.goodsImg)
        }
      }
    },
    onEditorBlur(editor) {
      //console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      //console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      //console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log(this.$refs.myTextEditor)
      this.goodsDetails = html
      // console.log(editor);
      // console.log(editor.root.getElementsByTagName('img').length);
      var editorDev = editor.editor.delta.ops;
      var uploadDetailsImg = '';
      for (var i = editorDev.length - 1; i >= 0; i--) {
        if (editorDev[i].insert.image) {
          uploadDetailsImg = editorDev[i].insert.image;
          break;
        }
      }

      if (uploadDetailsImg.search(/base64/) == -1) {
        return
      }

      this.$http.post(HOST + url_uploadGoodsDetalsImg, {
        detailsImg: uploadDetailsImg,
      }).then( (res) => {
        console.log(res.data);
        var detailsImg = editor.root.getElementsByTagName('img');
        detailsImg = detailsImg[detailsImg.length-1].src = HOST + res.data;
      })
    },
    resStatus () {
      this.isRes = !this.isRes;
    },
    addGoods () {
      if (this.claObjId == '' || this.goodsName == '' || this.goodsPrice == '' || this.goodsImg == '' || this.goodsDetails == '' || this.freight == '' || this.inventory == '') {
        return
      }
      this.$http.post(HOST + url_addGoods, {
        claId: this.claObjId,
        goodsName: this.goodsName,
        goodsPrice: this.goodsPrice,
        goodsImg: this.goodsImg,
        goodsDetails: this.goodsDetails,
        freight: this.freight,
        inventory: this.inventory,
        isRes: this.isRes
      }).then( (res) => {
        this.reload()
      })
    },
    getGoodsCla () {
      this.$http.get(HOST + url_goodsCla).then( (res)=> {
        this.claList = res.data;
      })
    },
    selectClaId (v) {
      console.log(this.claObjId);
    }
  },
  mounted () {
    this.getGoodsCla();
    // console.log('this is my editor', this.editor);
    // console.log(this.$refs)
  }
}
</script>

<style scoped>
.addGoods h3 {
  margin: 20px 0;
}
</style>
