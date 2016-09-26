var rd = require('rd');
var format = require('./format');
var glob = require('glob');
var colors = require('colors');

var pattern = 'source/**/upload/*';	//目录通配符
glob(pattern, { nodir: true }, function (err, files) {
    if(err) {
        console.log('匹配目录出错：'.red, err);
    }
    else {
	    files.forEach(function (filepath) {
		    // 异步遍历目录下的所有文件
			rd.each(filepath, function (f, s, next) {
			  // 每找到一个文件都会调用一次此函数
			  // 参数s是通过 fs.stat() 获取到的文件属性值
			  //console.log('file: %s', f);
			  format.videoToMp4(f, function(){
			  	// 必须调用next()才能继续
			  	next();
			  }, function(error){
			  	console.log(error)
			  });
			}, function (err) {
			  if (err) throw err;
			  // 完成
			});
		});
	}
});

