<?php
  //基于thinkphp框架
  //定义项目名称
  define('APP_NAME', 'Weixin');
  //定义项目的路径
  define('APP_PATH', 'Weixin/');
  //引入tp的核心文件
  require('./ThinkPHP/ThinkPHP.php');
  
  /*//1.将timestamp,nonce,token按字典序排序
  $timestamp = $_GET['timestamp'];
  $nonce = $_GET['nonce'];
  $token = 'zhanghc';
  $signature = $_GET['signature'];
  $arr = array($timestamp, $nonce, $token);
  sort($arr);
  //2.将排序后的三个参数拼接，然后用sha1加密
  $tmpstr = implode('', $arr);
  $tmpstr = sha1($tmpstr);
  //3.将加密后的字符串与signature进行对比，判断该请求是否来自微信
  if ($tmpstr == $signature) {
    echo $_GET['echostr'];
    exit();
  }*/
?>
