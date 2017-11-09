import toastVue from './toastPlus.vue'

var toastPlus = {},
    toastVM = null;

toastPlus.install = function (Vue, options) {
  if (!toastVM) {
    var toastTpl = Vue.extend(toastVue)
    toastVM = new toastTpl();
    var toastEl = toastVM.$mount().$el;
    document.body.appendChild(toastEl);
  }
  Vue.prototype.$toast = function (opt) {
    if (toastVM.show) {
      return
    }

    toastVM.text = opt.text;
    toastVM.show = true;

    setTimeout(function () {
      toastVM.show = false;
    }, opt.time || 1500)
  }
}

export default toastPlus