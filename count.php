<?php
$counter = 1;
if (file_exists("mycounter.txt")) {
  $fp = fopen("mycounter.txt", "r");
  $counter = fgets($fp, 9);
  $counter++;
  fclose($fp);
}
$fp = fopen("mycounter.txt", "w");
fputs($fp, $counter);
fclose($fp);
echo "<h1>您是第" . $counter . "次访问本页面的用户！</h1>";
?>
