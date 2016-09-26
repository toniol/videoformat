var path = require('path');
var fs = require('fs');

/**
 * @param  { String }     将创建的目录路径
 * @param  { Number }     目录权限（读写权限），默认0777
 * @param  { Function }   回调，传递异常参数err
 */
function mkdirs(dirpath, mode, callback) {
  fs.exists(dirpath, function(exists) {
    if (exists) {
      callback(dirpath);
    } else {
      //尝试创建父目录，然后再创建当前目录
      mkdirs(path.dirname(dirpath), mode, function() {
        fs.mkdir(dirpath, mode, callback);
      });
    }
  });
};

exports.mkdirs = mkdirs;