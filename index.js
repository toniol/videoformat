var watch = require('watch');
var glob = require('glob');
var colors = require('colors');

/* ==========================================================================
   自定义模块
   ========================================================================== */
var format = require('./format');

var pattern = 'source/**/upload/';		//目录通配符
glob(pattern, { nodir: false }, function (err, files) {
    if(err) {
        console.log('匹配目录出错：', err);
    }
    else {
	    files.forEach(function (filepath) {

		    watch.createMonitor(filepath, function(monitor) {

				console.log(filepath + ''.white, ':文件夹视频转码服务开启...'.green);

				monitor.on("created", function(filepath, stat) {
					// Handle new files
					if(stat.size){
						// console.log(filepath, 'created', stat.size)
						format.videoToMp4(filepath);
					}
				});
				monitor.on("changed", function(filepath, curr, prev) {
					// Handle file changes
				});
				monitor.on("removed", function(filepath, stat) {
					// Handle removed files
				});
				//monitor.stop(); // Stop watching
			});
		});
	}
});

