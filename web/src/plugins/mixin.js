export default {
	install: function (Vue, options) {
		Vue.mixin({
		    beforeCreate () {
		    	this.$dialog.loading.open();
		    },
		    mounted () {
		    	setTimeout( ()=> {
		    		this.$dialog.loading.close();
		    	},1000)
		    },
		    methods: {
		        changeTitle: function (titleName) {
		            this.$store.commit('_changeTitle', titleName)
		        }
		    }
		})
	}
}