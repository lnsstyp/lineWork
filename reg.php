<?php
$k = $_POST["name"];
$g = $_POST["pass"];
$m = "True";
if (file_exists("login.json")) {
  $fp = file_get_contents("login.json");
  $info = json_decode($fp, true);
  //echo $info["name"] . ":" . $info["pass"];
  for ($i=0, $len = count($info); $i < $len; $i++) { 
    if ($info[$k]) {
      $m = "False";
      break;
    }
  }
  if ($m == "False") {
    echo "用户名已经存在！";
  } else {
    $info[$k] = $g;
    $fp = json_encode($info);
    file_put_contents("login.json", $fp);
    echo "True";
  }
}
?>
