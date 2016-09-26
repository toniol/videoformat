var fs = require('fs');
var colors = require('colors');


function rename(filepath) {
	fs.rename(filepath, filepath + '.Done', function(err) {
		if (err) {
			console.error('重命名文件失败'.red, err);
			return;
		}
		console.log('转码成功并将原始文件重命名'.green);
	});
}

exports.rename = rename;