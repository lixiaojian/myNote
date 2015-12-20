$(function(){
	$('.lesx ul li a').click(function(){
	var aaa=$(this).next();
	aaa.slideToggle();
	});
	});




$(function(){
	//公共选项卡切换
	$(".tab_list").each(function(q){
		$(".tab_list").eq(q).find(".tab_a").each(function(e){
			$(this).mouseenter(function(){
				$(".tab_list").eq(q).find(".tab_a").removeClass("on")
				$(this).addClass("on")
				$(".tab_list").eq(q).find(".tab_b").hide()
				$(".tab_list").eq(q).find(".tab_b").eq(e).show()
			})
			
		})	
		$(".tab_list").eq(q).find(".tab_a").eq(0).mouseenter();
	})
	
	//
	
	$(".tab_click").each(function(q){
		$(".tab_click").eq(q).find(".tab_a").each(function(e){
			$(this).click(function(){

				$(".tab_click").eq(q).find(".tab_a").removeClass("on")
				$(this).addClass("on")
				$(".tab_click").eq(q).find(".tab_b").hide()
				$(".tab_click").eq(q).find(".tab_b").eq(e).show()
			})
			
		})	
		$(".tab_click").eq(q).find(".tab_a").eq(0).click();
	})
	//
			
});










