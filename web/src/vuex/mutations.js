var mutations = {
	_changeTitle:function (state, titleName) {
		state.titleName = titleName;
	},
	_changeFooterStatus:function (state, status) {
		state.showfooterC = status;
	},
	_login:function (state, data) {
		state.userData.userName = data.userName;
		state.userData.userImg = data.userImg;
		state.userData.status = data._id;
	},
	_changeGoodsDetailsPageHidden:function (state) {
		state.goodsDetailsPageHidden = 'none';
	},
	_changeGoodsDetailsPageShow:function (state) {
		state.goodsDetailsPageHidden = 'block';
	}
}

export default mutations