<?php
$onum = $_POST["ordernum"];
$odate = $_POST["orderdate"];
$otype = $_POST["ordertype"];
$oname = $_POST["ordername"];
if (file_exists("productList.json")) {
  $fp = file_get_contents("productList.json");
  $info = json_decode($fp, true);
  if ($onum) {
    $d = array();
    for ($i = 0, $len = count($info["list"]); $i < $len; $i++) {
      if ($info["list"][$i]["number"] == $onum) {
        array_push($d, $info["list"][$i]);
        echo json_encode($d);
        return;
      }
    }
  }
  if ($odate) {
    $d = array();
    for ($i = 0, $len = count($info["list"]); $i < $len; $i++) {
      if ($info["list"][$i]["date"] == $odate) {
        if ($otype && ($otype != "请选择")) {
          if ($info["list"][$i]["type"] == $otype) {
            if ($oname && ($oname != "请选择")) {
              if ($info["list"][$i]["name"] == $oname) {
                array_push($d, $info["list"][$i]);
              }
            } else {
              array_push($d, $info["list"][$i]);
            }
          }
        } else {
        array_push($d, $info["list"][$i]);
        }
      } 
    }
    echo json_encode($d);
    return;
  }
  if ($otype && ($otype != "请选择")) {
    $d = array();
    for ($i = 0, $len = count($info["list"]); $i < $len; $i++) {
      if ($info["list"][$i]["type"] == $otype) {
        if ($oname && ($oname != "请选择")) {
          if ($info["list"][$i]["name"] == $oname) {
            array_push($d, $info["list"][$i]);
          }
        } else {
          array_push($d, $info["list"][$i]);
        }
      }
    }
    echo json_encode($d);
    return;
  }
  echo json_encode($info["list"]);
  return;
}
?>
