<?php
  header('content-type: text/html;charset=utf8');
  if (isset($_REQUEST['authcode'])) {
    session_start();
    if ($_REQUEST['authcode'] == $_SESSION['authcode']) {
      echo '<font color="#0000cc">输入正确</font>';
    }else{
      echo '<font color="#cc0000">输入错误</font>';
    }
    exit();
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>填写验证码</title>
</head>
<body>
  <form method="post" action="formcode.php">
    <p>验证码图片：<img id="captch_img" src="vercode.php?r=<?php echo rand();?>" border="1" width="200" height="60">
      <a href="javascript:void(0)" onclick="document.getElementById('captch_img').src='vercode.php?r='+Math.random()">换一个</a>
    </p>
    <p>请输入图片中的内容：<input type="text" name="authcode" value=""></p>
    <p><input type="submit" value="提交" style="padding:6px 20px;"></p>
  </form>
</body>
</html>
