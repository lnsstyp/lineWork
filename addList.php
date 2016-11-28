<?php
$addListDate = $_POST["addListDate"];
$addListType = $_POST["addListType"];
$addListName = $_POST["addListName"];
$addListPerson = $_POST["addListPerson"];
$addListWoman = $_POST["addListWoman"];
$addListPrice = $_POST["addListPrice"];
$addListPhone = $_POST["addListPhone"];
$proType = $_POST["proType"];
$proName = $_POST["proName"];
$viewImg = $_POST["viewImg"];
$num = 0;
if ($proName < 10) {
  $proName = '0' . $proName;
};
$addListNum = str_replace("-", "", $addListDate);
if (file_exists("productList.json")) {
  $fp = file_get_contents("productList.json");
  $info = json_decode($fp, true);
  if (substr($info["list"][$info["sizes"] - 1]["number"], 0, 8) == $addListNum) {
    $num = $info["listNum"];
    $num++;
  }
  if ($num < 10) {
    $num = "00" . $num;
  } else if ($num < 100) {
    $num = "0" . $num;
  }
  $addListNum = $addListNum . $proType . $proName . $num;
  $arr = array("number"=>$addListNum, "date"=>$addListDate, "type"=>$addListType, "name"=>$addListName, "pic"=>$viewImg, "person"=>$addListPerson, "sex"=>$addListWoman, "price"=>$addListPrice, "telephone"=>$addListPhone);
  array_push($info["list"], $arr);
  $info["sizes"] += 1;
  $info["listNum"] = $num;
  //$fp = json_encode($info);
  $fp = encode_json($info);
  file_put_contents("productList.json", $fp);
  echo "True";
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
