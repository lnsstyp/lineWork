// 字符集设置，可以随意发挥想象
//var chars = new Array(' 1 ',' 0 ',' ',' & ','_','-','hello','world','i','o(︶︿︶)o ','o(∩_∩)o ','囧','$$$','<a href="http://ifindever.com" target=_blank>ifindever</a>','LOVE','I','YOU'); // 随机字符集

var chars = new Array('.',',','。','0','o','囧','o(╯□╰)o','☆','❀','☜','☞','☀','▓','※','♂','♀','♧','♫','♪','卍','☑','♍','♋','♈','♐','♏','⊱','✄','☎','☃');
var max_x,max_y;
function test(){
  // $('#data').css("filter", "progid:DXImageTransform.Microsoft.Matrix(M11=" + m11 + ",M12=" + m12 + ",M21=" + m21 + ",M22=" + m22 + ",SizingMethod='auto expand')");
}

// a-b的随机整数
function r(a,b){
  return a>b?0:Math.round(Math.random()*(b-a)+a);
}
// a-b 随机字符串
function rStr(c,d){
  var len = r(c,d);
  var str = '';
  for(var i = 0;i<len;i++){
    str += chars[r(0,chars.length-1)];
  }
  return str;
}
// 随机颜色
function rColor(){
  return 'rgb('+r(0,255)+','+r(0,255)+','+r(0,255)+')';
}
// 随机角度
function rDeg(a,b){
  return 'rotate('+r(a,b)+'deg)';
}
// 开始动画
function startMove(){
  $('.common').not(':animated').each(function(){
    $(this).animate({
      'top':r(10,max_y-100),
      'left':r(10,max_x-100),
      'opacity':r(0,10)/10,
      'color':rColor(),
      'font-size':r(10,30),
      '-webkit-transform':rDeg(0,360)
    },r(5000,10000));
  });
}
// 监控正在动画的元素个数
function keepAni(){
  var n = $(':animated').length;
  var max_n = $('.common').length;
  $('#data').html('动画数 / 总数 : '+ n + '/' + max_n);
  // 控制运动的元素不少于某个值
  if(n <= 2*max_n/3)startMove();
}

// 初始化
$(document).ready(function(){
  max_y = $(document).height();
  max_x = $(document).width();
  for(var i=0;i<r(50,100);i++){
    var t_div = document.createElement("div");
    $(t_div).addClass('common').css({
      'top':r(10,max_y-100),
      'left':r(10,max_x-100),
      'color':rColor(),
      'opacity':r(0,10)/10,
      '-webkit-transform':rDeg(0,360)
    }).html(rStr(1,3));
    $('body').append(t_div);
  }
  t = setInterval("keepAni()",'50');
});

function zoom(obj){
  var offset = $(this).offset();
  $(obj).animate({
    "font-size":"10em",
    "opacity":"hide",
    "width":$(window).width(),
    "height":$(window).height(),
    "left":0,
    'top':0,
    'background-color':'white'
  },2000,function(){
    stopAni();
  });
}
/*$$('h1').forEach(function(h1){
    var len = h1.textContent.length, s = h1.style;

    //s.width = len + 'ch';
    s.width = len + 'em';
    s.animationTimingFunction = "steps(" + len + "), steps(1)";
    s.animationDuration = 0.4 * len + 's, 1s';
});*/
/* 开门 */
var h = $$('h2');
var t = 0;
var hnumber = 0, extime = 0;

function delaykey(num){
  var h1 = h[num];
  var len1 = h1.textContent.length, s1 = h1.style;
  //s1.animation = "typing 6s steps(15), caret 1s steps(1) " + len1*0.4;
  if(num == h.length - 1){
    s1.webkitAnimation = "typing 6s steps(15), caret 1s steps(1) infinite";
    //s1.MozAnimation = "typing 6s steps(15), caret 1s steps(1) infinite";
    //s1.MsAnimation = "typing 6s steps(15), caret 1s steps(1) infinite";
    s1.animation = "typing 6s steps(15), caret 1s steps(1) infinite";
  }else{
    s1.webkitAnimation = "typing 6s steps(15), caret 1s steps(1) " + len1*0.4;
    //s1.MozAnimation = "typing 6s steps(15), caret 1s steps(1) " + len1*0.4;
    //s1.MsAnimation = "typing 6s steps(15), caret 1s steps(1) " + len1*0.4;
    s1.animation = "typing 6s steps(15), caret 1s steps(1) " + len1*0.4;
  }
  s1.width = len1*1.02 + 'em';
  s1.webkitAnimationTimingFunction = "steps(" + len1 + "), steps(1)";
  //s1.MozAnimationTimingFunction = "steps(" + len1 + "), steps(1)";
  //s1.MsAnimationTimingFunction = "steps(" + len1 + "), steps(1)";
  s1.animationTimingFunction = "steps(" + len1 + "), steps(1)";
  s1.webkitAnimationDuration = 0.4 * len1 + 's, 1s';
  //s1.MozAnimationDuration = 0.4 * len1 + 's, 1s';
  //s1.MsAnimationDuration = 0.4 * len1 + 's, 1s';
  s1.animationDuration = 0.4 * len1 + 's, 1s';
  t = setTimeout(function(){
    delaykey(++hnumber);
  },len1*400);
  if(num == h.length - 1){
    //s1.animation = "typing 6s steps(15), caret 1s steps(1) infinite";
    clearTimeout(t);
    setTimeout(function () {
      $("#d3").css("display", "block");
    }, 6000);
  };
}
function $$(selector, context){
  context = context || document;
  var elements = context.querySelectorAll(selector);
  return Array.prototype.slice.call(elements);
}
function stopAni(){
  clearInterval(t);
  $(':animated').stop();
  $('#data').css('display','none');
  $('#imgone').css('opacity','1').css('transform','rotateY(90deg)');
  $('#imgtwo').css('opacity','1').css('transform','rotateY(-90deg)');
  $('.common').remove();
  $('#backwall').css('background','url(images/yard3.png) 0 0 / 100% 100%');
  $('#introduce').css('display','block');
  $('#highlinght').attr('class','highlinght').css('display','block');
  $('#counts').css('display', 'none');
  delaykey(hnumber);
}

var image = new Image();
image.src = 'images/yard3.png';

/*window.onload = function(){
  console.log('12');
}*/

$.ajax({
  type:'POST',
  url:'count.php',
  async:true,
  success: function (data) {
    var counter = document.getElementById('counts');
    counter.innerHTML = data;
  }
}).responseText;
//console.log(html);

