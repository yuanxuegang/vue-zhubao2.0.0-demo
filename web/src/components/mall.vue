<template>
  <div class="mall">
    <div v-for="(val,idx) in cla" class="cla-container" @click="toGoodsList(val._id)">
      <p>{{val.claName}}</p>
      <p>————</p>
    </div>
  </div>
</template>

<script>
import { url_getGoodsCla, HOST } from '../util/url.js';

// var cla = [{
//   claName: '戒指1',
//   _id: 1
// },{
//   claName: '戒指2',
//   _id: 2
// },{
//   claName: '戒指3',
//   _id: 3
// }]

export default {
  name: 'mall',
  data () {
    return {
      cla: []
    }
  },
  methods: {
    toGoodsList (id) {
      this.$router.push({name: 'goodsList', params: {id: id}})
    },
    getGoodsCla (id) {
      this.$ajax.get(HOST + url_getGoodsCla, {

      }).then( (res)=> {
        console.log(res.data)
        this.cla = res.data;
      })
    }
  },
  components: {
    
  },
  created: function () {
    this.getGoodsCla();
  },
  mounted: function () {
    this.$store.commit('_changeFooterStatus', true)
  },
  destroyed: function () {
    this.$store.commit('_changeFooterStatus', false)
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/default.scss';
.mall {
  .cla-container {
    text-align: center;
    padding: 1rem 0;
    background-color: #a9a9a9;
    margin: .3rem;
    border-radius: .3rem;
    @include flexBox;
    flex-direction: column;
    p {
      color: #FFF;
    }
    p:nth-child(2) {
      font-weight: bold;
    }
  }
}
</style>
