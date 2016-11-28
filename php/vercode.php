<?php
  session_start();
  $image = imagecreatetruecolor(200, 60);//创建指定大小的图片资源
  $bgcolor = imagecolorallocate($image, 255, 255, 255);//在资源上申请一个颜色
  imagefill($image, 0, 0, $bgcolor);//图片资源填充颜色
  //随机四个数字
  /*for ($i=0; $i < 4; $i++) { 
    $fontsize = 6;
    $fontcolor = imagecolorallocate($image, rand(0, 120), rand(0, 120), rand(0, 120));
    $fontcontent = rand(0, 9);
    $x = ($i * 100 / 4) + rand(5, 10);
    $y = rand(5, 10);
    imagestring($image, $fontsize, $x, $y, $fontcontent, $fontcolor);//画水平的字符串到图片上
  }*/
  //随机数字和字母
  $str = '所有汉字的萨芬空间和骄傲废话秋黄瓜菲欧清风阁确认表跪安吧覅电脑磁盘被分割如果不那是积分';
  $captch_code = '';
  $fontface = 'font/msyh.ttf';
  //$strdb = array('锄', '禾', '日', '当', '午', '汗', '滴', '禾', '下', '土');
  $strdb = str_split($str, 3);
  /*for ($i=0; $i < 4; $i++) { 
    $fontsize = 6;
    $fontcolor = imagecolorallocate($image, rand(0, 120), rand(0, 120), rand(0, 120));
    $data = 'abcdefghijklmnopqrstuvwsyz123456789';
    $fontcontent = substr($data, rand(0, strlen($data) - 1), 1);
    $captch_code .= $fontcontent;
    $x = ($i * 100 / 4) + rand(5, 10);
    $y = rand(5, 10);
    imagestring($image, $fontsize, $x, $y, $fontcontent, $fontcolor);
  }*/
  //产生汉字验证码
  for ($i=0; $i < 4; $i++) { 
    $fontcolor = imagecolorallocate($image, rand(0, 120), rand(0, 120), rand(0, 120));
    $cn = $strdb[rand(0, count($strdb) - 1)];
    $captch_code .= $cn;
    imagettftext($image, mt_rand(20, 24), mt_rand(-60, 60), (40 * $i +20), mt_rand(30, 35), $fontcolor, $fontface, $cn);
  }
  $_SESSION['authcode'] = $captch_code;
  for ($i=0; $i < 200; $i++) { 
    $pointcolor = imagecolorallocate($image, rand(50, 200), rand(50, 200), rand(50, 200));
    imagesetpixel($image, rand(1, 199), rand(1, 59), $pointcolor);//画单一像素
  }
  for ($i=0; $i < 3; $i++) { 
    $linecolor = imagecolorallocate($image, rand(80, 220), rand(80, 220), rand(80, 220));
    imageline($image, rand(1, 199), rand(1, 59), rand(1, 199), rand(1, 59), $linecolor);//画一条线段
  }
  header('content-type: image/png');
  imagepng($image);//打印图片
  imagedestroy($image);//销毁图片
?>
