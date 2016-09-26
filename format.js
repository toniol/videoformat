var ffmpeg = require('fluent-ffmpeg');
var colors = require('colors');
var thumbnail = require('./thumbnail');
var rn = require('./rename');
var path = require('path');
var fs = require('fs');
var mkdir = require('./mkdirs');

/**
 * @param  { String }     //文件路径
 * @param  { Function }   //批量获取文件时的回调函数
 * @param  { Function }   //错误回调函数，传递报错信息
 * @return {}
 */
function videoToMp4(inputPath, next, errorCallBack) {

  var baseOutPath = path.parse(inputPath).dir;
  var filename = path.parse(inputPath).name;
  var ext = path.parse(inputPath).ext;
  var outPath = baseOutPath + '/video/';
  var thumbnailPath = baseOutPath + '/thumbnail/';
  var fullFilePath = outPath + filename + '.mp4';
  var videoExts = ['.mp4', '.flv', '.f4v', '.MP4', '.FLV', '.F4V', '.mov'];

  if (videoExts.indexOf(ext) !== -1) {

    mkdir.mkdirs(outPath, 0777, function(err) {});
    mkdir.mkdirs(thumbnailPath, 0777, function(err) {});

    // ffmpeg.ffprobe(inputPath, function(err, metadata) {
    //     console.dir(metadata);
    // });

    var proc = ffmpeg(inputPath)
      // set video bitrate
      .videoBitrate(1024)
      // set target codec
      .videoCodec('libx264')
      // set size in percent
      //.size('640x480')
      // set aspect ratio
      //.aspect('16:9')
      //auto padding
      .autopad(true)
      // set fps
      .fps(24)
      // set audio bitrate
      .audioBitrate('196k')
      // set audio codec
      // .audioCodec('aac')
      // set number of audio channels
      .audioChannels(2)
      // set custom option
      // .addOption('-vtag', 'DIVX')
      // set output format to force
      .format('mp4')
      //foramt process
      .on('progress', function(progress) {

        //var keys = Object.keys(progress);
        console.log((filename + ext).white + '：视频转码完成进度: '.green + (Math.floor(progress.percent) + '%').cyan);
      })
      // setup event handlers
      .on('end', function() {
        console.log((filename + ext).white + '：视频转码成功！'.green);
        thumbnail.createThumbnail(fullFilePath, thumbnailPath);
        rn.rename(inputPath);
        if (typeof next === 'function') {
          next();
        }
      })
      .on('error', function(err, stdout, stderr) {
        console.log('视频转码出错: '.red + (filename + ext).white + '--' + new Date());
        console.log(err.stack);
        console.log('--- ffmpeg stdout ---');
        console.log(stdout);
        console.log('--- ffmpeg stderr ---');
        console.log(stderr);

        if (typeof errorCallBack === 'function') {
          errorCallBack((filename + ext).white + '：视频转码出错: '.red + err.message);
        }
      })
      // save to file
      .save(outPath + filename + '.mp4');
  } else {
    console.log((filename + ext).white + '：不是视频文件...'.red);
    if (typeof next === 'function') {
      next();
    }
  }
};

exports.videoToMp4 = videoToMp4;