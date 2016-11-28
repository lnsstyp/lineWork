$(function () {
  var la = document.getElementById('nowTime'),
    da = document.createElement("input"),
    nowDate = new Date();
  da.type = "date";
  da.id = "addListDate";
  da.value = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();
  la.appendChild(da);
  function infoInit (obj) {
    return $(obj).html("<option>请选择</option>");
  }
  var arrData = {
    "水果": "苹果,香蕉,鸭梨,葡萄,西瓜,哈密瓜,猕猴桃",
    "蔬菜": "青椒,香菜,蒜台,白菜,豆角,油麦菜,胡萝卜",
    "食品": "薯片,饼干,瓜子,辣条,糖果,火腿肠,方便面",
    "饮品": "百事,可乐,奶茶,牛奶,咖啡,美年达,果粒橙",
    "主食": "米饭,馒头,烙饼,面条,水饺,疙瘩汤,麻辣烫"
  };
  $.each(arrData, function(pF) {
    $("#addListType").append('<option value="' + pF + '"">' + pF + '</option>');
  });
  $("#addListType").change(function() {
    infoInit("#addListName");
    $.each(arrData, function(pF, pS) {
      if ($("#addListType option:selected").text() == pF) {
        $.each(pS.split(","), function() {
          $("#addListName").append('<option value="' + this + '">' + this + '</option>');
        });
      };
    });
  });
});
$(function () {
  $("#submitList").mousedown(function() {
    $(this).addClass('btnClick');
  });
  $("#submitList").mouseup(function() {
    $(this).removeClass('btnClick');
  });
  $("#cancelList").mousedown(function() {
    $(this).addClass('btnClick');
  });
  $("#cancelList").mouseup(function() {
    $(this).removeClass('btnClick');
  });
  $("#submitList").click(function() {
    $(this).disabled = true;
    var addListDate = $("#addListDate").val(),
      addListType = $("#addListType").val(),
      addListName = $("#addListName").val(),
      addListNum = $("#addListNum").val(),
      addListPerson = $("#addListPerson").val(),
      addListWoman = $("#addListWoman"),
      addListPrice = $("#addListPrice").val(),
      addListPhone = $("#addListPhone").val();
    if ((addListDate == "") || (addListType == "请选择") || (addListName == "请选择") || (addListPerson == "") || (addListPrice == "") || (addListPhone == "")) {
      alert('信息不完整，请确认全部填写！');
      return;
    };
    if (!confirm('确定提交？')){
      return;
    }
    var sex = '男';
    if ($(addListWoman).prop("checked")) {
      sex = '女';
    };
    var proType = "0",
      proName = "0",
      viewImg = "apple";
    //$.ajaxSettings.async = false;
    $.getJSON('productName.json', function(json) {
      json = objToArray(json);
      var len = arrayLength(json);
      var index = getPosition(json, addListType);
      if (index) {
        proType = index - 1;
        var proNum = json[addListType];
        proNum = objToArray(proNum);
        var ten = arrayLength(proNum);
        index = getPosition(proNum, addListName);
        if (index) {
          proName = index - 1;
          viewImg = proNum[addListName];
          $.ajax({
            url: 'addList.php',
            type: 'POST',
            data: {"addListDate": addListDate, "addListType": addListType, "addListName": addListName, "addListPerson": addListPerson, "addListWoman": sex, "addListPrice": addListPrice, "addListPhone": addListPhone, "proType": proType, "proName": proName, "viewImg": viewImg},
            success: function (data) {
              $(this).disabled = false;
              if (data == "True") {
                alert('添加成功！');
              };
            },
            error: function (error) {
              alert('添加失败！');
            }
          });
        };
      };
    });
    //$.ajaxSettings.async = true;    
  });
$("#cancelList").click(function(event) {
  $("#addListPanel").css('display', 'none');
  $("#imgMask").css('display', 'none');
});
});
function objToArray(obj){
  var arr = [];
  for(var item in obj){
    arr[item] = obj[item];
  }
  return arr;
}
function arrayLength (arr) {
  var num = 0;
  for (var i in arr) {
    num++;
  };
  return num;
}
function getPosition (arr, item) {
  var pos = 0;
  for (var i in arr) {
    pos++;
    if (i == item) {
      break;
    };
  };
  return pos;
}
