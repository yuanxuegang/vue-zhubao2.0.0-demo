var myPlugins = {
    install: function (Vue, options) {
        Vue.filter('formatTime', function (value) {
            Date.prototype.Format = function (fmt) {
                var o = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S": this.getMilliseconds()
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            // return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
            return new Date(value).Format("yyyy-MM-dd");
        })


        Vue.filter('twoDecima', function (value) {
            value = +value;
            return value.toFixed(2)
        })

        Vue.mixin({
            created: function () {
                
            },
            methods: {
                changeTitle: function (titleName) {
                    this.$store.commit('_changeTitle', titleName)
                }
            }
        })

        Vue.prototype.$service = {
            telNumberCheck: function (tel) {
                var pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
                return pattern.test(tel)
            }
        }
    }
};

export default myPlugins

// if (typeof exports == "object") {
//     module.exports = myPlugins;
//   } else if (typeof define == "function" && define.amd) {
//     define([], function () {
//       return myPlugins
//     })
//   } else if (window.Vue) {
//     window.myPlugins = myPlugins;
//     Vue.use(myPlugins);
//   }