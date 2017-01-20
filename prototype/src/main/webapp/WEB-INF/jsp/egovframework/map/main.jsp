<%@ page language="java" contentType="text/html;utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
%>

<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>::: 포천 지하수관리 시스템 :::</title>
<link rel="stylesheet" type="text/css" href="<c:url value='/css/ol.css' />" />
<style type="text/css">
<jsp:include page="/css/map_02.jsp"></jsp:include>
</style>
<link rel="stylesheet" type="text/css" href="<c:url value='/js/easyui/themes/bootstrap/easyui.css' />" />

<script src="<c:url value='/js/jquery-1.10.2.js' />"></script>
<%-- <script src="<c:url value='/js/jquery-ui.js' />"></script> --%>
<script src="<c:url value='/js/easyui/jquery.easyui.min.js' />" type="text/javascript"></script>

<script type="text/javascript" src="<c:url value='/js/proj4.js' />"></script>
<%-- <script type="text/javascript" src="<c:url value='/js/GeoObject_App.js' />"></script>--%>
<script type="text/javascript" src="<c:url value='/js/javascript.util.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/jsts.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/GISControler_App.js' />"></script> 
<script type="text/javascript" src="<c:url value='/js/ol-debug.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/custom/patch.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/custom/dragzoomininteraction.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/custom/dragzoomoutinteraction.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/custom/measureinteraction.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/custom/translateinteraction.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/custom/scalelinecontrol.js' />"></script>

<script type="text/javascript" src="<c:url value='/js/custom/emap.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/custom/vworldsource.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/pmap.js' />"></script>
<!-- <script src="http://code.jquery.com/jquery-1.10.2.js"></script> -->
<script src="http://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<!-- services 라이브러리 불러오기 -->
<script type="text/javascript" src="//apis.daum.net/maps/maps3.js?apikey=b03c0a6f2b4581df9318799fc67b4378&libraries=services"></script>

<script type="text/javaScript">
	//컨텍스트 패스
	var CONTEXT_PATH = "${pageContext.request.contextPath}";
	
	//var MapServer = "http://180.67.220.62:11201";

	function initAll(){
		var offset = $("#rightClose").is(":visible")?330:0;
		$("#div_map_container").width($(window).width() - offset - $("#div_map_menu").width() - 1);		
		$("#div_map_container").height($(window).height() - $("#mapnavi").height());
		$("#div_map_menu").height($(window).height() - $("#mapnavi").height());
		pMap.getMap().updateSize();
	}
	$(document).ready(function() {
		pMap.init();
		initAll();
		initTab();
		 $("#searchMgrnu").keypress(function( event ) {
			  if ( event.which == 13 ) {
				 featureSearch();
			     return false; 
			  }
		});
		
		$("#searchSpt").keypress(function( event ) {
			  if ( event.which == 13 ) {
				 featureSearch();
			     return false; 
			  }
		});
		
		$("#jibun").keypress(function( event ) {
			  if ( event.which == 13 ) {
				  if(menutType == 1){
				 	fn_featureSearch(1,1);
				  } else if(menutType == 4){
					fn_featureSearch(2,1);					  
				  }
			     return false; 
			  }
		});
		
		$("#juso").keypress(function( event ) {
			  if ( event.which == 13 ) {
				  if(menutType == 1){
					 	fn_featureSearch(1,2);
					  } else if(menutType == 4){
						fn_featureSearch(2,2);					  
					  }
			     return false; 
			  }
		});
		
		$("#addr").keypress(function( event ) {
			  if ( event.which == 13 ) {
				 fn_AddrSearch(3);
			     return false; 
			  }
		});
		//containerReset();
		 $(window).resize(function(){
		      initAll();
		}).resize();
	});
	
	$(window).unload(function() {
	});

	$(window).load(function() {
	});
	

	function rightSlide() {
		$("#panel02").toggle("slide", {
			direction : "right"
		}, 150);

		if (document.getElementById("rightClose").style.display == "none") {
			document.getElementById("rightOpen").style.display = "none";
			document.getElementById("rightClose").style.display = "";
			$("#div_map_container").width($(window).width() - 330 - $("#div_map_menu").width() - 1);
			// 크롬에서 오류 발생해서 변경
			//document.getElementById("trafficRegist").style.right = "25%";
			$("#trafficRegist").css("right", "25%");

		} else {
			document.getElementById("rightClose").style.display = "none";
			document.getElementById("rightOpen").style.display = "";
			$("#div_map_container").width($(window).width() -  $("#div_map_menu").width() - 1);
			// 크롬에서 오류 발생해서 변경
			//document.getElementById("trafficRegist").style.right = "5%";
			$("#trafficRegist").css("right", "5%");
		}
		pMap.getMap().updateSize();
	}

	function initTab() {
		$(".tab_content").hide();
		$(".tab_content:first").show();

		$("ul.tabs03 li").click(function() {
		//	removeVal();
			$("ul.tabs03 li").removeClass("active").css("color", "#555");
			//$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
			$(this).addClass("active").css("color", "#fff");
			$(".tab_content").hide();
			var activeTab = $(this).attr("rel");
			$("#" + activeTab).fadeIn();
		});
	}

	$(function() {
		$("li.m_menu").click(function() {
			$(this).addClass("m_menu_on");
			$(this).siblings().removeClass("m_menu_on");
		})
	})
	function mapctrl(type) {
		if (type == 'all') {
			pMap.moveAll();
			containerReset//	containerReset();
		} else if (type == 'move') {
			pMap.activeInteractions("drag");
		} else if (type == 'select') {
			pMap.activeInteractions("info", "drag");
		} else if (type == 'plus') {
			pMap.activeInteractions("dragZoomIn");
		} else if (type == 'minus') {
			pMap.activeInteractions("dragZoomOut");
		} else if (type == 'prev') {
			historyObj.prev();
		} else if (type == 'next') {
			historyObj.next();
		}  else if (type == 'distance') {
			pMap.activeInteractions("distance", "drag");
		}  else if (type == 'print') {
			pMap.openPrint();
		}  else if (type == 'save') {
			pMap.save();
		}
	  else if (type == 'area') {
		pMap.activeInteractions("area", "drag");
	}
	}

	var menutType = 1;
	function getView(type) {
		switch (type) {
		case 0:
			openPopupmenuDashboard();
			break;
		case 1:
			menutType = 1;
		//	containerReset();
			break;
		case 2:
			menutType = 2;
		//	containerReset();
			examineSelect();
			break;
		case 3:
			menutType = 3;
		//	containerReset();
			examineSelect();
			break;
		case 4:
			menutType = 1;
			openPopupmenuByDudt(0);
			break;
		case 5:
			menutType = 1;
			openPopupmenuByDudt(1);
			break;
		case 6:
			menutType = 1;
			openPopupmenuByDudt(2);
			break;
		case 7:
			menutType = 4;
		//	containerReset();
			undeclaredSelect();
			break;
		default:
			break;

		}

	}
	
</script>
</head>
<body style="overflow-x: hidden;overflow-y: hidden;">
	<form id="frm" method="post">
		<input type="hidden" id="multiMgrnu" name="multiMgrnu" />
	</form>
	<div id="mapnavi">
		<div class="mapnavibg">
			<a href="javascript:reFresh();"><img src="<c:url value='/image/logo.png' />" /></a>
		</div>
		<ul>
			<li class="m_menu"><a href="javascript:getView(0)">지하수현황</a></li>
			<li class="m_menu"><a href="javascript:getView(1)" class="txt_01">관정검색</a></li>
			<li class="m_menu"><a href="javascript:getView(2)" class="txt_01">인허가검토</a></li>
			<li class="m_menu"><a href="javascript:getView(3)" class="txt_01">개발가능성검토</a></li>
			<li class="m_menu"><a href="javascript:getView(4)" class="txt_02">허가연장(${result.prmisn})</a></li>
			<li class="m_menu"><a href="javascript:getView(5)" class="txt_02">사후관리(${result.aftfat})</a></li>
			<li class="m_menu"><a href="javascript:getView(6)" class="txt_02">수질검사(${result.prposqltwtr})</a></li>
			<li class="m_menu"><a href="javascript:getView(7)">미신고관정관리</a></li>
			<li class="m_menu"><a href="<c:url value='/admin/main.do' />">관리자</a></li>
		</ul>
	</div>
	
	<div id="div_map_menu">
		<ul id="ul_layer_tree"></ul>
	</div>
	<div id="div_map_container" style="position: relative; height: 100%; overflow: hidden; display: block; background-color: transparent;">
		<div id="div_map"></div>
		<div id="mapctrl" style="position: absolute; top: 20px; right: 20px; z-index: 9999; width: 349px; height: 34px; border: 1px solid #cbd4e0; border-radius: 4px;" id="mapctrl" border="0" frameborder="0" scrolling="no">
	        <ul>
	        	<li><a href="javascript:mapctrl('all')"   class="ctrlM01" title="전체">전체</a></li>
	            <li><a href="javascript:mapctrl('move')"   class="ctrlM02" title="이동">이동</a></li>
	            <li><a href="javascript:mapctrl('select')" class="ctrlM03" title="선택">선택</a></li>
	            <li><a href="javascript:mapctrl('plus')"   class="ctrlM04" title="확대">확대</a></li>
	            <li><a href="javascript:mapctrl('minus')"  class="ctrlM05" title="축소">축소</a></li>
	            <li><a href="javascript:mapctrl('prev')"   class="ctrlM07" title="이전">이전</a></li>
	            <li><a href="javascript:mapctrl('next')"   class="ctrlM06" title="다음">다음</a></li>
	            <li><a href="javascript:mapctrl('distance')" class="ctrlM08" title="거리재기">거리재기</a></li>
	              <li><a href="javascript:mapctrl('area')" class="ctrlM08" title="면적">면적</a></li>
	            <li><a href="javascript:mapctrl('print')"    class="ctrlM09" title="인쇄">인쇄</a></li>
	            <li><a href="javascript:mapctrl('save')"    class="ctrlM10" title="저장">저장</a></li>
	        </ul>
	    </div>
	    <div src="<c:url value='/frame/mapzoom.do'/>" style="position: absolute; top: 160px; right: 20px; z-index: 9999; width: 71px; height: 150px;" id="mapzoom" border="0" frameborder="0" scrolling="no" allowTransparency="true" class="mapzoomArea">
    	<div class="slider_btn"></div>
        <div class="mapzoom">
            <div class="zoomin"></div>
            <div class="slider">
            	<div class="slider_bar"></div>
            </div>
            <div class="zoomout"></div>
        </div>
    </div>
     
	</div>
	
	<div id="panel02">
		<div id="container" class="tabmenu">
			<ul class="tabs03">
				<li class="active seoul" rel="tab1">시설검색</li>
				<li rel="tab2">지번검색</li>
				<li rel="tab3">새주소검색</li>
				<li class="undclared" rel="tab4">시설검색</li>
			</ul>
			<div class="tab_container">
				<div id="tab1" class="tab_content panel seoul">
					<ul>
						<p>
							<span>구분</span> <select size="1" id="searchGroup" name="searchGroup" onchange='changedSearchGroup()'>
								<option value="0" selected="selected">전체</option>
								<option value="1">허가</option>
								<option value="2">신고</option>
								<!-- <option value="3">미신고관정</option> -->
								<option value="6">온천시설</option>
								<option value="7">굴착행위</option>
								<!-- <option value="4">오염원</option> -->
								<!-- <option value="5">공공관정</option> -->
							</select>
						</p>
						<p>
							<span>용도</span> <select size="1" id="searchSelect" name="searchSelect">
								<option value="" selected="selected">전체</option>
							</select>
						</p>
						<p>
							<span>관리번호</span>
							<input id="searchMgrnu" name="searchMgrnu" type="text" placeholder="검색어를 입력하세요."></input>
						</p>
						<p>
							<span style="width: 100%" class="seoul">ex) 103, 2005-88</span>
						</p>
						<a class="btn_search" href="javascript:featureSearch()"><img src="<c:url value='/image/map/searchbtn.png'/>" alt="검색하기 버튼" /></a>
					</ul>
				</div>
				<!-- #tab1 -->
				<div id="tab2" class="tab_content panel">
					<ul>
						<p style="padding-top: 3%;">
							<span>읍면동</span> <select size="1" id="searchEmd" name="searchEmd" onchange='changedSearchEmd()'>
								<option value="" selected="selected">전체</option>
							</select>
						</p>
						<p>
							<span>리</span> <select size="1" id="searchRi" name="searchRi">
								<option value="" selected="selected">전체</option>
							</select>
						</p>
						<p>
							<span>지번검색</span><input id="jibun" name="jibun" type="text" placeholder="검색어를 입력하세요."></input>
						</p>
						<p>
							<span style="width: 100%">ex) 소흘읍 송우리, 소흘읍 무림리</span>
						</p>
						
						<a class="btn_search examine" href='javascript:fn_AddrSearch(1);'><img src="<c:url value='/image/map/searchbtn.png'/>" alt="검색하기 버튼" /></a>
						<a class="btn_search seoul" href='javascript:fn_featureSearch(1,1);'><img src="<c:url value='/image/map/searchbtn.png'/>" alt="검색하기 버튼" /></a>
						<a class="btn_search undclared" href='javascript:fn_featureSearch(2,1);'><img src="<c:url value='/image/map/searchbtn.png'/>" alt="검색하기 버튼" /></a>
					</ul>

				</div>
				<!-- #tab3 -->
				<div id="tab3" class="tab_content panel">
					<ul>
						<p style="padding-top: 3%;">
							<span>새주소검색</span><input id="juso" name="juso" type="text" placeholder="검색어를 입력하세요."></input>
						</p>
						<p>
							<span style="width: 100%">ex) 방산길 204, 226</span>
						</p>
						<a class="btn_search examine" href='javascript:fn_AddrSearch(1);'><img src="<c:url value='/image/map/searchbtn.png'/>" alt="검색하기 버튼" /></a>
						<a class="btn_search seoul" href='javascript:fn_featureSearch(1,2);'><img src="<c:url value='/image/map/searchbtn.png'/>" alt="검색하기 버튼" /></a>
						<a class="btn_search undclared" href='javascript:fn_featureSearch(2,2);'><img src="<c:url value='/image/map/searchbtn.png'/>" alt="검색하기 버튼" /></a>
					</ul>
				</div>
				<!-- #tab4 -->
				<div id="tab4" class="tab_content panel undclared">
					<ul>
						<p>
							<span>현장조사번호</span>
							<input id="searchSpt" name="searchSpt" type="text" placeholder="검색어를 입력하세요."></input>
						</p>
						<p>
							<span style="width: 100%">ex) PC010, 300</span>
						</p>
						<a class="btn_search" href="javascript:featureSearch()"><img src="<c:url value='/image/map/searchbtn.png'/>" alt="검색하기 버튼" /></a>
					</ul>
				</div>
			</div>
		</div>
		<div id="switchDiv" style="display: none" class="panel">
			<ul>
				<p style="padding-top: 3%;">
					<span>경도</span><input id="lon" name="lon" type="text" readonly="readonly"></input>
				</p>
				<p>
					<span>위도</span><input id="lat" name="lat" type="text" readonly="readonly"></input>
				</p>
				<p style="padding-top: 3%;">
					<span>TM좌표X</span><input id="loX" name="loX" type="text" readonly="readonly"></input>
				</p>
				<p style="padding-top: 3%;">
					<span>TM좌표Y</span><input id="laY" name="laY" type="text" readonly="readonly"></input>
				</p>
				<p style="padding-top: 3%;"> 
					<span>주소</span><input id="addr" name="addr" type="text"></input>
				</p>
				<p style="padding-top: 3%;">	
					<button onclick="fn_AddrSearch(3)">주소검색</button>
					<span class="circle">
						<button class="inhuga" onclick="popupDevPosbl(2)">인허가검토</button>
						<button class="devpos" onclick="popupDevPosbl(3)">개발가능성<br/>검토</button>
					</span>
					<span class="polygon">
						<button class="inhuga" onclick="popupPolygon(2)">인허가검토</button>
						<button class="devpos" onclick="popupPolygon(3)">개발가능성<br/>검토</button>
					<span>
				</p>
				
			</ul>
			<input type="hidden" id="geomXY" name="geomXY"/>
			<input type="hidden" id="geomLatLon" name="geomLatLon"/>
			<input type="hidden" id="area" name="area"/>
		</div>
		<!-- tabmenu 버튼부분 -->
		<div id="tabDiv" style="height: 100%;width:100%;">
			<ul id="mgrnuInfoList" style="overflow-y: scroll; height: 95%; width:100%;"></ul>
		</div>
		<!-- .tab_container -->
		<!-- #container -->
	</div>
	<!--검색결과-->
	<div id="rightClose" style="position: absolute; top: 50%; right: 308px; z-index: 9999; width: 23px; height: 23px;" border="0" frameborder="0" scrolling="no">
		<A title="접기" id="Close" href="javascript:rightSlide();"><IMG alt="접기" src="<c:url value='/image/map/right_close.png'/>"></A>
	</div>
	<div src="<c:url value='/frame/EgovRightOpen.do'/>" id="rightOpen" style="display: none; position: absolute; top: 50%; right: 0; z-index: 9999; width: 23px; height: 23px;" border="0" frameborder="0" scrolling="no">
		<A title="펼치기" id="Open" href="javascript:rightSlide();"><IMG alt="펼치기" src="<c:url value='/image/map/right_open.png'/>"></A>
	</div>	
	<form id="frmDownloadBase64Image" action="<c:url value='/admin/map/save.do' />" method="POST" >
	   <input type="hidden" name="data" value="" />
	</form>
</body>

</html>