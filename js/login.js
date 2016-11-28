$(function () {
  $("#dlBtn").click(function() {
    var $name = $("#username");
    var $pass = $("#password");
    if ($name.val() != "" && $pass.val() != "") {
      UserLogin($name.val(), $pass.val());
    } else {
      if ($name.val() == "") {
        alert("用户名不能为空！");
        $name.focus();
        return false;
      } else {
        alert("密码不能为空！");
        $pass.focus();
        return false;
      }
    }
  });
  $("#lgBtn").click(function() {
    var $name = $("#username");
    var $pass = $("#password");
    if ($name.val() != "" && $pass.val() != "") {
      UserReg($name.val(), $pass.val());
    } else {
      if ($name.val() == "") {
        alert("用户名不能为空！");
        $name.focus();
        return false;
      } else {
        alert("密码不能为空！");
        $pass.focus();
        return false;
      }
    }
  });
  $("#clslg").click(function() {
    $("#denglu").css('display', 'none');
    $("#maskLayer").css('display', 'none');
  });
});
function UserLogin (name, pass) {
  $.ajax({
    url: 'login.php',
    type: 'POST',
    data: {"name":name,"pass":pass},
    success: function (data) {
      if (data == "True") {
        // window.location = "ChatMain.html";
        $("#usernameinfo").html("欢迎你：" + $("#username").val());
        $("#denglu").css("display","none");
        $("#maskLayer").css('display', 'none');
      } else {
        $("#lgmsg").html("用户名或密码错误！");
        //alert("用户名或密码错误！");
        return false;
      }
    }
  });  
}
function UserReg (name, pass) {
  $.ajax({
    url: 'reg.php',
    type: 'POST',
    data: {"name":name,"pass":pass},
    success: function (data) {
      if (data == "True") {
        // window.location = "ChatMain.html";
        $("#lgmsg").html("");
        $("#denglu").css("display","none");
        $("#maskLayer").css('display', 'none');
      } else {
        $("#lgmsg").html("已经存在的用户名！");
        //alert("用户名或密码错误！");
        return false;
      }
    }
  });  
}
