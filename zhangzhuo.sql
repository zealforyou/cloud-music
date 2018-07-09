/*
Navicat MySQL Data Transfer

Source Server         : zhangzhuo
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : cloud-music

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-07-08 05:38:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_album
-- ----------------------------
DROP TABLE IF EXISTS `tb_album`;
CREATE TABLE `tb_album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `album_name` varchar(255) NOT NULL,
  `type` int(5) DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of tb_album
-- ----------------------------
INSERT INTO `tb_album` VALUES ('4', '15080772093', '我喜欢的音乐', '0');
INSERT INTO `tb_album` VALUES ('5', '18173238698', '我喜欢的音乐', '0');

-- ----------------------------
-- Table structure for tb_music
-- ----------------------------
DROP TABLE IF EXISTS `tb_music`;
CREATE TABLE `tb_music` (
  `local_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `lrc1` varchar(2500) DEFAULT NULL,
  `album_id` varchar(255) NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`local_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of tb_music
-- ----------------------------
INSERT INTO `tb_music` VALUES ('1', '72361f680c054a562ef62a5ef582f34e', '全部都是你', 'CNBALLER', 'http://fs.w.kugou.com/201807080533/25922df38776715b6efbee8035a50aab/G094/M05/0C/11/ng0DAFjKvDGAZg3_ADG8RcMDZDQ350.mp3', 'http://singerimg.kugou.com/uploadpic/softhead/400/20170714/20170714113949555.jpg', '[00:00.14]Dragon Pig、CLOUD WANG、CNBALLER-全部都是你\r\n[00:00.70]词：CNBALLER、Dragon Pig、Cloud Wang\r\n[00:01.94]曲：CNBALLER、Dragon Pig、Cloud Wang\r\n[00:03.54]制作：CNBALLER、Cloud Wang\r\n[00:02.81]混音：BraveX\r\n[00:06.94]我的眼里 都是你\r\n[00:09.35]甜甜蜜蜜 you know what I mean\r\n[00:11.92]对你说我 喜欢你\r\n[00:14.47]我们一起牵手去旅行\r\n[00:16.44]Cnballer：\r\n[00:17.00]Yeah yeah hey let\'s get it\r\n[00:17.89]好想对你说我喜欢你 baby\r\n[00:20.25]It\'s gonna be like ride or die baby\r\n[00:22.83]喜欢你的 bodyline 你的性格 你的 eyes\r\n[00:25.69]有你的城市都很美妙 baby\r\n[00:27.76]如果你也觉得心灵相惜\r\n[00:29.87]那就请你给我个肯定的回应\r\n[00:32.30]Hold up hold up 对感情从不 freestyle\r\n[00:35.31]U make me go crazy I need u right now\r\n[00:37.66]Pre hook：\r\n[00:38.16]I\'m falling I\'m falling I\'m falling\r\n[00:40.49]Baby 就让我来对你说明\r\n[00:42.82]I promise I promise I promise\r\n[00:45.02]我忘不了你 我忘不了你\r\n[00:47.37]Hook：\r\n[00:47.88]我的眼里都是你\r\n[00:49.83]甜甜蜜蜜 you know what I mean\r\n[00:52.35]对你说我喜欢你\r\n[00:54.89]我们一起牵手去旅行\r\n[00:57.51]Baby 我的眼里都是\r\n[00:59.13]心里都是全部都是你\r\n[01:02.21]Baby 我的眼里都是\r\n[01:04.15]心里都是全部都是你\r\n[01:07.46]Cloud：\r\n[01:28.12]Woo yah\r\n[01:29.18]You know it\'s all about u babe ahh\r\n[01:31.78]Let me take you on this ride babe what\r\n[01:34.24]Know I\'ve been around the world\r\n[01:35.46]And I done seen a lot of girls\r\n[01:36.94]But you\'ll always be my no1 babe\r\n[01:39.34]And I know I know I know I know\r\n[01:41.97]I want your good love babe\r\n[01:44.33]And u know u know u know u know\r\n[01:47.24]You wanna be on top of me\r\n[01:48.60]Pre hook：\r\n[01:49.13]I\'m falling I\'m falling I\'m falling\r\n[01:51.08]Baby 就让我来对你说明\r\n[01:53.49]I promise I promise I promise\r\n[01:55.67]我忘不了你 我忘不了你\r\n[01:58.07]我的眼里都是你\r\n[02:00.50]甜甜蜜蜜 you know what I mean\r\n[02:02.96]对你说我喜欢你\r\n[02:05.62]我们一起牵手去旅行\r\n[02:08.17]Baby 我的眼里都是\r\n[02:09.86]心里都是全部都是你\r\n[02:12.98]Baby 我的眼里都是\r\n[02:14.91]心里都是全部都是你\r\n[02:38.50]我的眼里都是你\r\n[02:40.95]甜甜蜜蜜 you know what I mean\r\n[02:43.52]对你说我喜欢你\r\n[02:46.06]我们一起牵手去旅行\r\n[02:48.55]Baby 我的眼里都是\r\n[02:50.34]心里都是全部都是你\r\n[02:53.38]Baby 我的眼里都是\r\n[02:55.48]心里都是全部都是你\r\n[03:09.44]I\'m falling I\'m falling I\'m falling\r\n[03:14.35]I promise I promise I promise\r\n', '5', '2018-07-08 05:33:42');
INSERT INTO `tb_music` VALUES ('2', 'efa2b6fa3ed970efa9745925f6f31412', '你好陌生人', '祁梦潇', 'http://fs.w.kugou.com/201807080534/0f2f8a30626ea107b93636b95a67c803/G126/M0A/0A/14/XpQEAFrDsQGAGirXAEhAf-xyvFM469.mp3', 'http://imge.kugou.com/commendpic/20160923/20160923162707215688.png', '[00:00.24]你好陌生人 - 祁梦潇\r\n[00:01.92]词：祁梦潇\r\n[00:02.87]曲：祁梦潇\r\n[00:19.98]终有一天你会静下心来\r\n[00:24.69]像个局外人将手插进口袋\r\n[00:29.40]看着自己的故事\r\n[00:32.34]笑着摇摇头有点无奈\r\n[00:38.80]也许带点恨也许依然期待\r\n[00:43.51]一把吉他有太多故事承载\r\n[00:48.17]独自接受面对 所有好坏\r\n[00:56.50]你好陌生人\r\n[00:58.66]现在什么身份\r\n[01:00.99]只是你的故人\r\n[01:03.31]你故事里的人\r\n[01:05.62]那是我梦寐以求而无法触及\r\n[01:11.75]怪我太迟钝\r\n[01:15.34]再见陌生人\r\n[01:17.38]最后没转过身\r\n[01:19.72]我已没有办法\r\n[01:22.12]单纯喜欢上一个人\r\n[01:27.02]爱得早爱的久爱的太深\r\n[01:31.62]不如刚刚好爱的那个人\r\n[02:01.36]终有一天你会静下心来\r\n[02:05.82]不再计较所有的得失好坏\r\n[02:10.56]听着别人的故事\r\n[02:13.59]学会情绪用沉默替代\r\n[02:20.13]也许带点恨也许依然期待\r\n[02:24.63]一把吉他有太多故事承载\r\n[02:29.39]独自接受面对 所有好坏\r\n[02:37.75]你好陌生人\r\n[02:39.81]现在什么身份\r\n[02:42.13]只是你的故人\r\n[02:44.46]你故事里的人\r\n[02:46.84]那是我梦寐以求而无法触及\r\n[02:52.93]怪我太迟钝\r\n[02:56.66]再见陌生人\r\n[02:58.60]最后没转过身\r\n[03:00.90]我已没有办法\r\n[03:03.28]单纯喜欢上一个人\r\n[03:08.25]爱得早爱的久爱的太深\r\n[03:12.87]不如刚刚好爱的那个人\r\n[04:05.07]你好陌生人\r\n[04:06.86]现在什么身份\r\n[04:09.15]只是你的故人\r\n[04:11.49]你故事里的人\r\n[04:13.86]那是我梦寐以求而无法触及\r\n[04:19.95]怪我太迟钝\r\n[04:23.68]再见陌生人\r\n[04:25.66]最后没转过身\r\n[04:27.97]我已没有办法\r\n[04:30.32]单纯喜欢上一个人\r\n[04:35.22]爱得早爱的久爱的太深\r\n[04:39.83]不如刚刚好爱的那个人\r\n', '4', '2018-07-08 05:34:52');

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `user_id` varchar(50) NOT NULL,
  `user_name` varchar(50) DEFAULT '游客',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `avatar` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('15080772093', '想听音乐', '2018-07-08 05:33:04', null);
INSERT INTO `tb_user` VALUES ('18173238698', '哈哈哈哈', '2018-07-08 05:33:32', null);
