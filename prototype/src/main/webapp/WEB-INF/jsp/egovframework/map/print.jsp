<%@ page language="java" contentType="text/html;utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>::: 포천 지하수관리 시스템 :::</title>
<style type="text/css">
#div_tool {
	height : 34px;
	text-align : right;
}
@media print {
	#div_tool { display:none; }
}
#a_print {
	vertical-align : middle;
	margin-right : 18px;
}
#div_map {
	width : 650px;
	height : 637px;
	margin : 5px 15px 0 15px;
	border : 1px solid #000;
}
#div_legend {
	width : 650px;
	height : 200px;
	margin : 5px 15px 0 15px;
	border : 1px solid #000;
	font-size : 12px;
}

#div_legend ul {
	padding : 0 0 0 10px;
}

#div_legend ul li {
	width : 150px;
	list-style : none;
	float : left;
	padding : 2px 5px;
}

#div_legend ul li * {
	vertical-align : middle;
}


#div_legend ul li img {
	width:16px; height:16px;
}

#div_legend ul li span {
	margin-left : 5px;
}

</style>
<script src="<c:url value='/js/jquery-1.10.2.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/proj4.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/ol-debug.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/custom/patch.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/custom/vworldsource.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/print.js' />"></script>

<body>
	<div id="div_tool">
		<a id="a_print" href="#"><img src="<c:url value='/image/map/icon_mapPrint_on.png' />" alt="인쇄" /></a>
	</div>
	<div id="div_map" ></div>
	<div id="div_legend" >
		<ul>
			<li><img class='tree_layer_img' src='/image/map/legend/1.png' alt='허가관정' /><span>허가관정</span></li>
			<li><img class='tree_layer_img' src='/image/map/legend/1.png' alt='허가관정' /><span>허가관정</span></li>
			<li><img class='tree_layer_img' src='/image/map/legend/1.png' alt='허가관정' /><span>허가관정</span></li>
			<li><img class='tree_layer_img' src='/image/map/legend/1.png' alt='허가관정' /><span>허가관정</span></li>
			<li><img class='tree_layer_img' src='/image/map/legend/1.png' alt='허가관정' /><span>허가관정</span></li>
			<li><img class='tree_layer_img' src='/image/map/legend/1.png' alt='허가관정' /><span>허가관정</span></li>
			<li><img class='tree_layer_img' src='/image/map/legend/1.png' alt='허가관정' /><span>허가관정</span></li>
			<li><img class='tree_layer_img' src='/image/map/legend/1.png' alt='허가관정' /><span>허가관정</span></li>
			<li><img class='tree_layer_img' src='/image/map/legend/1.png' alt='허가관정' /><span>허가관정</span></li>
			<li><img class='tree_layer_img' src='/image/map/legend/1.png' alt='허가관정' /><span>허가관정</span></li>
			<li><img class='tree_layer_img' src='/image/map/legend/1.png' alt='허가관정' /><span>허가관정</span></li>
			<li><img class='tree_layer_img' src='/image/map/legend/1.png' alt='허가관정' /><span>허가관정</span></li>
		</ul>
	</div>
</body>