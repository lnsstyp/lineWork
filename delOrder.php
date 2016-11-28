<?php
$delId = $_POST["delItem"];
if (file_exists("productList.json")) {
  $fp = file_get_contents("productList.json");
  $info = json_decode($fp, true);
  $d = array();
  $ten = count($delId);
  for ($i = 0, $len = count($info["list"]); $i < $len; $i++) {
    for ($j=0; $j < $ten; $j++) { 
      if ($info["list"][$i]["number"] == $delId[$j]) {
        array_push($d, $i);
        array_splice($delId, $j, 1);
        $ten--;
        break;
      }
    }
    if ($ten == 0) {
      break;
    }
  }
  if (count($d) > 0) {
    $m = $info["list"];
    for ($t=0, $ld = count($d); $t < $ld; $t++) { 
      unset($m[$d[$t]]);
      //array_splice($info["list"], $d[$t], 1);
    }
    if ($m == null) {
      $info["list"] = array();
    } else {
      $n = array_merge($m);
      $info["list"] = $n;
    }
    $fp = encode_json($info);
    file_put_contents("productList.json", $fp);
    echo "True";
    //return;
  }
}
function encode_json($str) {
  return urldecode(json_encode(url_encode($str)));
}
function url_encode($str) {
  if(is_array($str)) {
    foreach($str as $key=>$value) {
      $str[urlencode($key)] = url_encode($value);
    }
  } else {
    $str = urlencode($str);
  }
  return $str;  
}
?>
