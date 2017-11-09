<template>
    <div>
        <div class="yd-cityselect-mask" v-show="show" @click.stop="close" ref="mask"></div>
        <div class="yd-cityselect" :class="show ? 'yd-cityselect-active' : ''">
            <div class="yd-cityselect-header">
                <p class="yd-cityselect-title" @touchstart.stop.prevent="">{{title}}</p>
                <div v-show="ready" class="yd-cityselect-nav">
                    <a href="javascript:;"
                       :key="key"
                       v-for="index, key in columnNum"
                       v-show="!!nav['txt' + index]"
                       @click.stop="navEvent(index)"
                       :class="index == navIndex ? 'yd-cityselect-nav-active' : ''"
                    >{{nav['txt' + index]}}</a>
                </div>
            </div>
            <div v-if="!ready" class="yd-cityselect-loading">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <path stroke="none" d="M3 50A47 47 0 0 0 97 50A47 49 0 0 1 3 50" fill="#bababa" transform="rotate(317.143 50 51)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="0.6s" begin="0s" repeatCount="indefinite"></animateTransform>
                    </path>
                </svg>
            </div>
            <ul v-show="ready" class="yd-cityselect-content" :class="activeClasses">
                <li class="yd-cityselect-item" v-for="index, key in columnNum" :ref="'itemBox' + index" :key="key">
                    <template v-if="columns['columnItems' + index].length > 0">
                        <div class="yd-cityselect-item-box">
                            <a href="javascript:;"
                               :key="key"
                               v-for="item, key in columns['columnItems' + index]"
                               :class="currentClass(item.v, item.n, index)"
                               @click.stop="itemEvent(index, item.n, item.v, item.c)"
                            ><span>{{item.n}}</span></a>
                        </div>
                    </template>
                    <template v-else>
                        <div class="yd-cityselect-item-box" @touchstart.stop.prevent=""></div>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {addClass, removeClass, getScrollview, isIOS, pageScroll} from '../util/assist';
    export default {
        name: 'yd-cityselect',
        data() {
            return {
                show: this.value,
                navIndex: 1,
                nav: {
                    txt1: this.chooseTitle,
                    txt2: '',
                    txt3: ''
                },
                columns: {
                    columnItems1: this.items,
                    columnItems2: [],
                    columnItems3: []
                },
                active: {},
                activeClasses: '',
                itemHeight: 40,
                columnNum: 1
            }
        },
        props: {
            ready: {
                type: Boolean,
                default: true
            },
            provance: String,
            city: String,
            area: String,
            done: Function,
            callback: Function,
            title: {
                type: String,
                default: '所在地区'
            },
            chooseTitle: {
                type: String,
                default: '请选择'
            },
            value: {
                type: Boolean,
                default: false
            },
            items: {
                type: Array,
                required: true
            }
        },
        watch: {
            value(val) {
                if (isIOS) {
                    if (val) {
                        pageScroll.lock(this.$refs.mask);
                        addClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    } else {
                        pageScroll.unlock(this.$refs.mask);
                        removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    }
                }
                this.show = val;
            },
            ready(val) {
                val && this.$nextTick(this.init);
            }
        },
        methods: {
            init() {
                this.scrollView = getScrollview(this.$el);
                if (!this.ready) return;
                this.isArray(this.items) && this.provance && this.setDefalutValue(this.items, 'provance', 1);
                this.$on('ydui.cityselect.reset', () => {
                    for (let i = 1; i <= this.columnNum; i++) {
                        this.active['itemValue' + i] = '';
                        this.active['itemName' + i] = '';
                        if ((i - 1) === 0) {
                            this.navIndex = i;
                            this.nav['txt' + i] = this.chooseTitle;
                            this.$refs['itemBox' + i][0].scrollTop = 0;
                            this.backoffView(false);
                        } else {
                            this.nav['txt' + i] = '';
                            this.columns['columnItems' + i] = [];
                        }
                        if (i === this.columnNum) {
                            this.returnValue();
                        }
                    }
                });
            },
            navEvent(index) {
                if (this.columnNum > 2) {
                    if (index >= this.columnNum) {
                        this.forwardView(true);
                    } else {
                        this.backoffView(true);
                    }
                }
                this.navIndex = index;
            },
            itemEvent(index, name, value, children) {
                this.active['itemValue' + index] = value;
                this.active['itemName' + index] = name;
                this.nav['txt' + index] = name;
                this.columns['columnItems' + (index + 1)] = children;
                if (index > 1 && children && children.length > 0 && this.columnNum > 2) {
                    this.forwardView(true);
                }
                this.clearNavTxt(index);
                if (index === this.columnNum || children.length <= 0) {
                    if (index !== this.columnNum) {
                        for (let i = this.columnNum; i >= 0; i--) {
                            if (i > index) {
                                this.active['itemValue' + i] = '';
                                this.active['itemName' + i] = '';
                                this.nav['txt' + i] = '';
                            }
                        }
                    }
                    this.navIndex = index;
                    this.returnValue();
                } else {
                    this.navIndex = index + 1;
                    this.nav['txt' + (index + 1)] = this.chooseTitle;
                }
            },
            currentClass(v, n, index) {
                return (v && v == this.active['itemValue' + index]) || (n && n === this.active['itemName' + index]) ? 'yd-cityselect-item-active' : '';
            },
            clearNavTxt(index) {
                for (let i = 0; i < this.columnNum; i++) {
                    if (i > index) {
                        this.nav['txt' + (i + 1)] = '';
                    }
                }
            },
            getColumsNum(arr) {
                if (this.isArray(arr.c)) {
                    this.columnNum++;
                    this.getColumsNum(arr.c[0]);
                }
            },
            isArray(arr) {
                return arr && arr.constructor === Array && arr.length > 0;
            },
            setDefalutValue(items, currentValue, index) {
                items.every((item, key) => {
                    if (item.v == this[currentValue] || item.n === this[currentValue]) {
                        const childrenItems = this.columns['columnItems' + (index + 1)] = item.c;
                        const itemBox = this.$refs['itemBox' + index][0];
                        itemBox.scrollTop = key * this.itemHeight - itemBox.offsetHeight / 3;
                        this.active['itemValue' + index] = item.v;
                        this.active['itemName' + index] = item.n;
                        this.nav['txt' + index] = item.n;
                        this.navIndex = index;
                        ++index;
                        index >= this.columnNum && this.columnNum > 2 && this.forwardView(false);
                        this.isArray(childrenItems) && this.setDefalutValue(childrenItems, ['', 'provance', 'city', 'area'][index], index);
                        return false;
                    }
                    return true;
                });
            },
            returnValue() {
                // TODO 参数更名，即将删除
                this.done && this.done(this.active);
                this.callback && this.callback(this.active);
                this.close();
            },
            close() {
                isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                this.$emit('input', false);
                this.show = false;
            },
            backoffView(animate) {
                this.activeClasses = (animate ? 'yd-cityselect-move-animate' : '') + ' yd-cityselect-prev';
            },
            forwardView(animate) {
                this.activeClasses = (animate ? 'yd-cityselect-move-animate' : '') + ' yd-cityselect-next';
            }
        },
        created() {
            this.items && this.items[0] && this.getColumsNum(this.items[0]);
        },
        mounted() {
            this.init();
        },
        destroyed() {
            this.close();
        }
    }
</script>

<style lang="scss" scoped>
/**
 * Component:	Variables
 * Description:	Define all variables
*/
.yd-cityselect-mask {
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 1502;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.yd-cityselect {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 75%;
  background-color: #fff;
  z-index: 1502;
  transform: translate(0, 100%);
  transition: transform .3s;
}
.yd-cityselect-active {
  transform: translate(0, 0);
}
.yd-cityselect-move-animate {
  transition: transform .3s;
}
.yd-cityselect-next {
  transform: translate(-50%, 0);
}
.yd-cityselect-prev {
  transform: translate(0, 0);
}
.yd-cityselect-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
.yd-cityselect-header:after {
  content: '';
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #bdbdbd;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.yd-cityselect-title {
  width: 100%;
  font-size: .3rem;
  text-align: center;
  height: 45px;
  line-height: 45px;
  position: relative;
}
.yd-cityselect-title:after {
  content: '';
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #b2b2b2;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.yd-cityselect-nav {
  width: 100%;
  padding-left: 10px;
  overflow: hidden;
  display: flex;
}
.yd-cityselect-nav > a {
  font-size: 13px;
  color: #222;
  display: block;
  height: 40px;
  line-height: 46px;
  padding: 0 8px;
  position: relative;
  margin-right: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 40%;
}
.yd-cityselect-nav-active {
  color: #F23030 !important;
}
.yd-cityselect-nav-active:after {
  content: '';
  width: 100%;
  height: 2px;
  background-color: #F23030;
  position: absolute;
  bottom: 1px;
  left: 0;
  z-index: 2;
}
.yd-cityselect-content {
  height: 100%;
  padding-top: 85px;
  width: 100%;
  display: flex;
}
.yd-cityselect-item {
  display: block;
  height: inherit;
  width: 50%;
  /* for old android */

  flex: 0 0 50%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #FFF;
}
.yd-cityselect-item::-webkit-scrollbar {
  width: 0;
}
.yd-cityselect-item:nth-child(2n) {
  background-color: #F5F5F5;
}
.yd-cityselect-item-active {
  color: #F23030 !important;
}
.yd-cityselect-item-active:after {
  display: block;
  content: '\E600';
  font-family: 'YDUI-INLAY';
}
.yd-cityselect-item-box {
  width: 100%;
  height: inherit;
  display: block;
  padding: 0 20px;
}
.yd-cityselect-item-box > a {
  color: #333;
  font-size: 13px;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;
}
.yd-cityselect-item-box > a:before {
  content: '';
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.yd-cityselect-item-box > a:active {
  background: none;
  /* for firefox */

}
.yd-cityselect-item-box > a span {
  flex: 1;
  display: block;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  text-overflow: ellipsis;
  line-height: 16px;
  max-height: 32.2px;
  font-size: 13px;
}
.yd-cityselect-loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .26rem;
  color: #999;
}
.yd-cityselect-loading svg {
  width: 36px;
  height: 36px;
}

</style>