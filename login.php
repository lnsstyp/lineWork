<?php
$k = $_POST["name"];
$g = $_POST["pass"];
if (file_exists("login.json")) {
  $fp = file_get_contents("login.json");
  $info = json_decode($fp, true);
  //echo $info["name"] . ":" . $info["pass"];
  if ($info[$k] && $info[$k] == $g) {
    echo "True";
  }
}
?>
