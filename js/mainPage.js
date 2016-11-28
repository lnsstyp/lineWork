$(function () {
  $("#leftDiv").load("leftPage.html");
  $("#newsfast").load("newsfast.html");
  //$("#proshow").load("proshow.html");
  $("#csschange").load("csschange.html");
  $("#canvasapp").load("canvasapp.html");
  $("#loadmpcontent").click(function() {
    if ($("#mpcontent").css('display') == "block") {
      return;
    };
    $(this).siblings().children('a').removeClass();
    $(this).children('a').addClass('on');
    $("#mpcontent").css('display', 'block');
    $("#newsfast").css('display', 'none');
    $("#proshow").css('display', 'none');
    $("#csschange").css('display', 'none');
    $("#canvasapp").css('display', 'none');
  });
  $("#loadnewsfast").click(function() {
    if ($("#newsfast").css('display') == "block") {
      return;
    };
    $(this).siblings().children('a').removeClass();
    $(this).children('a').addClass('on');
    $("#mpcontent").css('display', 'none');
    $("#newsfast").css('display', 'block');
    $("#proshow").css('display', 'none');
    $("#csschange").css('display', 'none');
    $("#canvasapp").css('display', 'none');
  });
  $("#loadproshow").click(function() {
    if ($("#proshow").css('display') == "block") {
      return;
    };
    $(this).siblings().children('a').removeClass();
    $(this).children('a').addClass('on');
    $("#mpcontent").css('display', 'none');
    $("#newsfast").css('display', 'none');
    $("#proshow").css('display', 'block').removeClass('proshow');
    $("#csschange").css('display', 'none');
    $("#canvasapp").css('display', 'none');
  });
  $("#loadcsschange").click(function() {
    if ($("#csschange").css('display') == "block") {
      return;
    };
    $(this).siblings().children('a').removeClass();
    $(this).children('a').addClass('on');
    $("#mpcontent").css('display', 'none');
    $("#newsfast").css('display', 'none');
    $("#proshow").css('display', 'none');
    $("#csschange").css('display', 'block');
    $("#canvasapp").css('display', 'none');
  });
  $("#loadcanvasapp").click(function() {
    if ($("#canvasapp").css('display') == "block") {
      return;
    };
    $(this).siblings().children('a').removeClass();
    $(this).children('a').addClass('on');
    $("#mpcontent").css('display', 'none');
    $("#newsfast").css('display', 'none');
    $("#proshow").css('display', 'none');
    $("#csschange").css('display', 'none');
    $("#canvasapp").css('display', 'block');
  });
  $("#searchBtn").click(function() {
    var $ordernum = $("#ordernum").val();
    var $orderdate = $("#orderdate").val();
    var $ordertype = $("#ordertype").val();
    var $ordername = $("#ordername").val();
    $.ajax({
      url: 'search.php',
      type: 'POST',
      datatype: 'json',
      data: {"ordernum": $ordernum, "orderdate": $orderdate, "ordertype": $ordertype, "ordername": $ordername},
      success: function (data) {
        var mm = JSON.parse(data);
        if (mm == null) {
          return;
        };
        $("#orderOfAll").html("一共找到" + mm.length + "条订单记录！");
        updateList(mm);
      }
    });
  });
  $("#addOrder").click(function() {
    $("#addList").load("addList.html");
    $("#imgMask").css('display', 'block');
  });
  $("#usernameinfo").click(function() {
    $("#maskLayer").css('display', 'block');
    $("#denglu").css('display', 'block');
  });
});
function updateList (data) {
  $("#orderdetail tr:not(:first-child)").remove();
  var frag = document.createDocumentFragment()
  for (var i = 0, len = data.length; i < len; i++) {
    var row = document.createElement("tr"),
      cell0 = document.createElement("td"),
      cell1 = document.createElement("td"),
      cell2 = document.createElement("td"),
      cell3 = document.createElement("td"),
      cell4 = document.createElement("td"),
      cell5 = document.createElement("td"),
      cell6 = document.createElement("td"),
      cell7 = document.createElement("td"),
      cell8 = document.createElement("td"),
      cell9 = document.createElement("td"),
      inp = document.createElement("input");
      img = document.createElement("img");
    $(img).error(function() {
      $(this).prop("src", "images/proDefault.png");
      $(this).unbind("error");
    });
    row.id = i;
    $(row).attr('data-num', data[i]["number"]);
    inp.type = "checkbox";
    inp.value = i;
    img.src = 'images/' + data[i]["pic"] + '.png';
    cell0.appendChild(inp);
    cell1.appendChild(document.createTextNode(data[i]["number"]));
    cell2.appendChild(document.createTextNode(data[i]["date"]));
    cell3.appendChild(document.createTextNode(data[i]["type"]));
    cell4.appendChild(document.createTextNode(data[i]["name"]));
    cell5.appendChild(img);
    cell6.appendChild(document.createTextNode(data[i]["person"]));
    cell7.appendChild(document.createTextNode(data[i]["sex"]));
    cell8.appendChild(document.createTextNode(data[i]["price"]));
    cell9.appendChild(document.createTextNode(data[i]["telephone"]));
    row.appendChild(cell0);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    row.appendChild(cell6);
    row.appendChild(cell7);
    row.appendChild(cell8);
    row.appendChild(cell9);
    frag.appendChild(row);
  };
  pageBar[0].render({count:data.length});
  $("tr", $(frag)).each(function(index, el) {
    if (index > 9) {
      $(this).css('display', 'none');
    };
  });
  $("#orderdetail").append($(frag));
  enlargePic();
}
$(document).ready(function() {
  var aa=document.getElementById("banner_imgs");
  var bb=document.getElementsByClassName("number")[0].getElementsByTagName("a");
  var t = 0,
    times = 1;
  for(var i=0;i<bb.length;i++){
    bb[i].id=i;
    bb[i].onmouseover=function(){
      clearTimeout(t);
      for(var j=0;j<bb.length;j++){
        bb[j].className=""; 
      } 
      bb[this.id].className="on";
      aa.style.left=-this.id*530+"px";
      times = (parseInt(this.id) == 4) ? 0 : (parseInt(this.id)+ 1);
      t = setTimeout(function () {
        picflash();
      }, 2000);
    } 
  }
  setTimeout(function () {
    picflash();
  }, 2000);
  function picflash () {
    for(var j=0;j<bb.length;j++){
      bb[j].className=""; 
    }
    bb[times].className="on";
    aa.style.left = -times * 530 + "px";
    times++;
    if (times > bb.length - 1) {
      times = 0;
    };
    t = setTimeout(arguments.callee, 2000);
  }
  function wordroll () {
    var roll1 = $("#rollone");
      roll2 = $("#rolltwo");
      roll1Width = roll1.css('width'),
      roll2Width = roll2.css('width'),
      roll1Left = roll1.css('left');
      roll2Left = roll2.css('left');
    roll1Left = parseInt(roll1Left);
    roll2Left = parseInt(roll2Left);
    roll1Width = parseInt(roll1Width);
    roll2Width = parseInt(roll1Width);
    roll1.css('left', roll1Left - 1);
    roll2.css('left', roll2Left - 1);
    if (-roll1Left > roll1Width) {
      roll1.css('left', roll2Width);
    };
    if (-roll2Left > roll2Width) {
      roll2.css('left', roll1Width);
    };
    setTimeout(function () {
      wordroll();
    }, 30);
  }
  wordroll();
});
$(function () {
  function objInit (obj) {
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
    $("#ordertype").append('<option value="' + pF + '"">' + pF + '</option>');
  });
  $("#ordertype").change(function() {
    objInit("#ordername");
    $.each(arrData, function(pF, pS) {
      if ($("#ordertype option:selected").text() == pF) {
        $.each(pS.split(","), function() {
          $("#ordername").append('<option value="' + this + '">' + this + '</option>');
        });
      };
    });
  });
});
$(function(){
  $("#chkAll").click(function(){
    if(this.checked){
      $("#orderdetail tr td input[type=checkbox]:not('.checkBtn')").prop("checked",true);
    }else{
      $("#orderdetail tr td input[type=checkbox]:not('.checkBtn')").prop("checked",false);
    }
  });
  $("#reserveChk").click(function() {
    var checkNum = 0;
    $("#orderdetail tr td input[type=checkbox]:not('.checkBtn')").each(function(index) {
      checkNum++;
      if(this.checked){
        this.checked = false;
      } else {
        this.checked = true;
        checkNum--;
      }
    });
    if (checkNum == 0) {
      $("#chkAll").prop("checked", true);
    } else {
      $("#chkAll").prop("checked", false);
    }
  });
  $("#btnDel").click(function(){
    var intL = $("#orderdetail tr td input:checked:not('.checkBtn')").length;
    var delId = [];
    if(intL != 0){
      $("#orderdetail tr td input[type=checkbox]:not('.checkBtn')").each(function(index) {
        if(this.checked){
          delId.push($("#orderdetail tr[id=" + this.value + "]").attr('data-num'));
          $("#orderdetail tr[id=" + this.value + "]").remove();
        }
      });
      $("#imgLoad").css('display', 'block');
      $("#imgMask").css('display', 'block');
      $.ajax({
        url: 'delOrder.php',
        type: 'POST',
        data: {"delItem": delId},
        success: function (data) {
          $("#imgLoad").css('display', 'none');
          $("#imgMask").css('display', 'none');
          $("#chkAll").prop("checked", false);
          if (data == 'True') {
            alert('删除成功！');
          };
        },
        error: function (data) {
          console.log(data);
        }
      });      
    }
  });
  enlargePic();
});
function enlargePic () {
  var x=5;
  var y=15;
  $("#orderdetail tr td img").mousemove(function(e){
    $("#imgTip").attr("src", this.src).css({"top":(e.pageY+y)+"px","left":(e.pageX+x)+"px"}).show(500);
  });
  $("#orderdetail tr td img").mouseout(function(){
    $("#imgTip").stop(true).hide();
  });
}
