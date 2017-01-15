$(document).ready(function(){

	//wrap----------------------------------------
	var bgSet = function(){
		var wH = $(window).height() ;
		var lnbH = $("#lnb").height() ;
		var mHeight = wH - 100;
		var minHeight;

		if ((lnbH+100) > mHeight)
		{
			minHeight = lnbH + 50;
		}else {
			minHeight = mHeight-50;
		}

		$("#contents").css({
			minHeight: minHeight
		});

	};

	bgSet();

	$(window).resize(function(){
		bgSet(); // white background
	});

	//menu common----------------------------------------

	var $lnb = $("#lnb"),
		$footer = $("#footer");

	/*
	var imgOn = function($this){
		var imgSrc = $(">img", $this).attr("src");
		var imgBar = imgSrc.split("_");
		var imgPng = imgBar[0].split(".png");
		$("img", $this).attr("src", imgPng[0]+"_on.png");
	}

	var imgOff = function($this){
		var imgSrc = $(">img", $this).attr("src");
		var imgBar = imgSrc.split("_");
		var imgPng = imgBar[0].split(".png");
		$("img", $this).attr("src", imgPng[0]+".png");
	}

	var imgAllOff = function($this){
		var $parent = $this.parent();
		$parent.siblings().each(function(){
			$this = $(">a", $(this));
			imgOff($this);
		});
	}*/

	var childrenOff = function($this){
		var $parent = $this.parent();
		$parent.siblings().each(function(){
			$(this).removeClass("on");
			$(this).has("ul").removeClass("case");
			$("li", $(this)).each(function(){$(this).removeClass("on");});
		});
	}

	//lnb----------------------------------------

	$(">li>a", $lnb).each(function(){
		  $(this).on({
			click:function(){
				$this = $(this);
				//imgAllOff($this);
				//imgOn($this);
				childrenOff($this);
				$(this).parent().addClass("on");
				bgSet();
				return false;
			},
			keypress:function(e){
				 if(e.which == 13){$(this).trigger("click");}
			}
		  });

	});

	// 메뉴 링크
	$("li>a, >li>ul>li>a, >li>ul>li>ul>li>a", $lnb).each(function(){
		  $(this).on({
			click:function(){
				$this = $(this);
				childrenOff($this);

				$(this).parent().addClass("on");
				$(this).parent().has("ul").addClass("case");
				bgSet();
				//######################################################//
				var href = "";
				var subHref = "";
				if($(this).attr('href').indexOf('http://')!=-1){
					href = 'pageLink.do';
					// ger URL 체크
					subHref = $(this).attr('href').indexOf('?')==-1?'?menuId=':'&menuId=';
					subHref+= $(this).attr('id');
				}else {
					href = $(this).attr('href');
				}
				if($(this).attr('href').indexOf('http://')!=-1 && href!='' && $("#lnbOn").val()==""){
					$("#pageLinkForm")
						.attr("action", href+subHref)
						.find("[name=pageLink]").val($(this).attr('href')).end()
						.find("[name=pageTitle]").val($(this).text()).end()
						.submit();
//				    $(location).attr('href', (href+subHref));
				}else if($(this).attr('href').indexOf('?')!=-1 && href!='' && $("#lnbOn").val()==""){
				    $(location).attr('href',href+'&menuId='+ $(this).attr('id'));
                }else if(href!='' && $("#lnbOn").val()==""){
				    $(location).attr('href',href+'?menuId='+ $(this).attr('id'));
				}
				//######################################################//
				return false;
			},
			keypress:function(e){
				 if(e.which == 13){$(this).trigger("click");}
			}
		  });
	});

	$("li", $lnb).each(function(){

			var li_length = $(">li", $(this).parent()).length;
			var idx = ($(this).index()) + 1;

			if (li_length  == idx){
				$(this).addClass("last");
			}


		});
	//table----------------------------------------------
	$(".table1").each(function(){

		$("tbody tr:odd", $(this)).each(function(){
		$(this).addClass("odd");
		});

	});


	var $gnb = $("#gnb"),
		$lnb = $("#lnb"),
		$footer = $("#footer");

	//gnb----------------------------------------------

	var gnbHide = function(){
		$(">li", $gnb).each(function(){
			$(this).removeClass("on");
		});
	}

	$(">li", $gnb).each(function(){
		//keyboard
		$(">a", $(this)).each(function(){
			$(this).on({
				focus:function(){
					gnbHide();
					$(this).parent("li").addClass("on");}
			});
		});

		$(">ul>li>a", $(this)).each(function(){
			$(this).on({
				focus:function(){$(this).addClass("on");},
				blur:function(){
					$(this).removeClass("on");
					var li_idx = $(this).parent("li").index();
					var li_length = $(">li", $(this).parent("li").parent("ul")).length;
					if (li_idx == li_length-1){
						$(this).parents("li.on").removeClass();
					}
				}
			});
		});

		//mouse
		$(this).hover(function(){
			$(this).addClass("on");
		},function(){gnbHide();}
		);

	});

	//footer----------------------------------------------
	var footerPosY = function(){
		var winHeight = $(window).height();
		var bodyHeight = $("body").height();


		if (bodyHeight <= winHeight) {
			$("#footer").css({
				"position":"fixed",
				"left":"0",
				"bottom":"0"
			});
		}else{
			$("#footer").css({
				"position":"static"
			});
		}

	};

	footerPosY();

	$(window).resize(function(){
		footerPosY();
	});

	//table----------------------------------------------

	$(".tableType1").each(function(){
		$("tbody tr:odd>td", $(this)).each(function(){
			$(this).css("background", "#f1f1f1");
		});
	});

	//tab----------------------------------------------

	var tabView = function(){
		var $tabArea = $(".tabArea"),
			$tabNavi = $(".tabNavi", $tabArea),
			tabLength = $("a", $tabNavi).length;

		if (tabLength == '3')
		{
			$(">p", $tabNavi).css("padding","0");
		}

		$(".tabCon", $tabArea).eq(0).show();
		footerPosY();

		$tabArea.each(function(){
			$("a", $tabNavi).on("click", function(e){
					e.preventDefault();
					$("a", $tabNavi).removeClass();
					$(this).addClass("on");
					var idx = $(this).index();
					$(".tabCon", $tabArea).hide();
					$(".tabCon", $tabArea).eq(idx).show();
					footerPosY();
			});
		});
	}();

	//suit schedule layer----------------------------------------------

	var suitSchedule = function(){

		var $suitSchedule = $(".suitSchedule");

		//show
		$(".suitNum", $suitSchedule).each(function(){
			$(this).on({
				mouseenter:function(e){
					e.preventDefault();

					var $parent = $(this).parent("td");

					var offset = $(this).position();
					var thisX = offset.left;
					var thisY = offset.top;

					$(".layer_suit").css({
						"top":thisY+50 ,
						"left": thisX-90
					}).show();
				},
				mouseleave:function(){$(".layer_suit").hide();},
			});

		});

			/*
			$(this).on("hover", function(e){
				e.preventDefault();

				var $parent = $(this).parent("td");

				var offset = $(this).position();
				var thisX = offset.left;
				var thisY = offset.top;

				$(".layer_suit").css({
					"top":thisY+50 ,
					"left": thisX-90
				}).show();
			},function(){}
			*/



		//hide
		$(document).on("click", function(e){
			var target = e.target.className;

			if (target != 'suitNum')
			{
				$(".layer_suit").hide();
			}
		});

	}();

	//tree---------------------------------------------------
	 var tree = $('.tree');
	 var togglePlus = '\<button type=\"button\" class=\"toggle plus\"\>+\<\/button\>';
	 var toggleMinus = '\<button type=\"button\" class=\"toggle minus\"\>-\<\/button\>';

	 // defalt
	 tree.find('li>ul').css('display','none');
	 tree.find('ul>li:last-child').addClass('last');
	 tree.find('li>ul:hidden').parent('li').prepend(togglePlus);
	 tree.find('li>ul:visible').parent('li').prepend(toggleMinus);

	 // active
	 tree.find('li.active').parents('li').addClass('open');
	 tree.find('li.open').parents('li').addClass('open');
	 tree.find('li.open>.toggle').text('-').removeClass('plus').addClass('minus');
	 tree.find('li.open>ul').slideDown(100);

	 // click toggle
	 $('.tree .toggle').click(function(){
	  t = $(this);
	  t.parent('li').toggleClass('open');
	  if(t.parent('li').hasClass('open')){
	   t.text('-').removeClass('plus').addClass('minus');
	   t.parent('li').find('>ul').slideDown(100);
	  } else {
	   t.text('+').removeClass('minus').addClass('plus');
	   t.parent('li').find('>ul').slideUp(100);
	  }
	 });

	 $(".toggle").next().click(function(e){
		 e.preventDefault();
		$(this).prev(".toggle").trigger("click");
	 });


});//loaded