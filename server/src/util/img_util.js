export var compress = function (imgObj) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  //  canvas.setAttribute('width',imgObj.width);
  //  canvas.setAttribute('height',imgObj.height);
  //  canvas.style.width = imgObj.width;
  //  canvas.style.height = imgObj.height;
  //利用canvas进行绘图
  var scale = imgObj.width / imgObj.height;
  var width1 = 720;
  var height1 = parseInt(width1 / scale);
  canvas.width = width1;
  canvas.height = height1;
  //console.log(canvas.width );
  ctx.drawImage(imgObj, 0, 0, width1, height1);
  //将原来图片的质量压缩到原先的0.02倍。
  var data = canvas.toDataURL('image/jpeg', 0.02); //data url的形式
  return data;
}

