// 检查字符串是否为空
export const str_isEmpty = function (str) {
	if (str == '' || str == undefined || str == null) {
		return true
	} else {
		return false
	}
}

// 字符串变大写
export const str_toUpperCase = function (str) {
	return str.toUpperCase();
}

// 检查两个字符串是否相等
export const str_CheckEqual = function (str1, str2) {
	if (str_toUpperCase(str1) == str_toUpperCase(str2)) {
		return true
	} else {
		return false
	}
}

// 验证由数字、26个英文字母或者下划线组成的字符串：^\w+$
export const str_regex_userName = function (str1) {
	var reg = /^\w+$/;
	return reg.test(str1)
}

// 验证由数字和26个英文字母组成的字符串
// ^[A-Za-z0-9]+$    //匹配字母和数字  长度1-N
// ^[A-Za-z0-9]*$     //匹配字母和数字  长度0-N
// ^[A-Za-z0-9]{7}$  //匹配字母和数字  长度7
// ^[A-Za-z0-9]{6,12}$  //匹配字母和数字  长度6-12
export const str_regex_password = function (str1) {
	var reg = /^[A-Za-z0-9]{6,12}$/;
	return reg.test(str1)
}


