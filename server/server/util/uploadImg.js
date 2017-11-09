var fs = require('fs');
var path = require('path');

var uploadImg = function (uploadFile, devPath) {
	var date = new Date ().getTime();
	var base64Data = uploadFile.replace(/^data:image\/\w+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');
	var imgUrl = `/images/${devPath}/${date}.jpg`;

	fs.writeFile('./server/public' + imgUrl, dataBuffer, function(err) {
		if (err) {
			send(err);
		}
  	});

  	return imgUrl
};

exports.uploadImg = uploadImg;