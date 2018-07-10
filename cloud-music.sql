/*
Navicat MySQL Data Transfer

Source Server         : huangtaining
Source Server Version : 50525
Source Host           : 172.22.200.164:3306
Source Database       : cloud-music

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2018-07-10 17:24:03
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

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
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`local_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for tb_search_log
-- ----------------------------
DROP TABLE IF EXISTS `tb_search_log`;
CREATE TABLE `tb_search_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(255) DEFAULT NULL,
  `user_id` varchar(50) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

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
