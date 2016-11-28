$(document).ready(function(){
  $(window).scroll(function(){
    var top = $(document).scrollTop();
    var menu = $("#menu");
    var items = $("#content").find(".item");
    var currenId = "";
    items.each(function(){
      var m = $(this);
      var itemtop = m.offset().top;
      if(top > itemtop -380){
        currentId = "#" + m.attr("id");
      }else{
        return false;
      }
    });
    var currentLink = menu.find(".current");
    if(currentId && currentLink.attr("href") != currentId){
      currentLink.removeClass("current");
      menu.find("[href='" + currentId + "']").addClass("current");
    }
  });
});
