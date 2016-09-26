var ffmpeg = require('fluent-ffmpeg');

function createThumbnail(inputPath, outPath) {
  var proc = ffmpeg(inputPath)
    // setup event handlers
    .on('filenames', function(filenames) {
      console.log('正在生成视频截图: '.yellow + (filenames.join(', ')).cyan);
    })
    .on('end', function() {
      console.log('视频截图保存成功！'.green);
    })
    .on('error', function(err) {
      console.log('视频截图生成失败: '.red + err.message);
    })
    // take 1 screenshots at predefined timemarks and size
    .takeScreenshots({
      count: 1,
      timemarks: ['00:00:01.000'],
      //size: '150x100',
      filename: '%b_%wx%h.png',
    }, outPath);
};

exports.createThumbnail = createThumbnail;