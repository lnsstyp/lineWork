<?php
  session_start();
  //产生图片验证码
  $table = array(
    'pic0' => '不',
    'pic1' => '冷',
    'pic2' => '心',
    'pic3' => '杰',
  );
  $index = rand(0, 3);
  $value = $table['pic'.$index];
  $_SESSION['authcode'] = $value;
  $filename = dirname(__FILE__).'\\img\\pic'.$index.'.jpg';
  $contents = file_get_contents($filename);
  header('content-type: image/jpg');
  echo $contents;
?>
