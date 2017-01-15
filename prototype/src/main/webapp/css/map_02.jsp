<%@ page language="java" contentType="text/html;utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
%>

@charset "utf-8";

/*@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);*/

@font-face {
    font-family: 'Noto Sans Korean';
    font-style: normal;
    font-weight: 300;
    src: local('Noto Sans Light'), local('NotoSans-Light'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.eot' />'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.eot?#iefix' />') format('embedded-opentype'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.woff' />') format('woff'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.otf' />') format('opentype');
}

@font-face {
    font-family: 'Noto Sans Korean';
    font-style: normal;
    font-weight: 400;
    src: local('Noto Sans Regular'), local('NotoSans-Regular'),
     url('<c:url value='/fonts/NotoSansKR-Light-Hestia.eot' />'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.eot?#iefix' />') format('embedded-opentype'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.woff' />') format('woff'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.otf' />') format('opentype');
}

@font-face {
    font-family: 'Noto Sans Korean';
    font-style: normal;
    font-weight: 500;
    src: local('Noto Sans Medium'), local('NotoSans-Medium'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.eot' />'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.eot?#iefix' />') format('embedded-opentype'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.woff' />') format('woff'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.otf' />') format('opentype');
}

@font-face {
    font-family: 'Noto Sans Korean';
    font-style: normal;
    font-weight: 700;
    src: local('Noto Sans Bold'), local('NotoSans-Bold'),
     url('<c:url value='/fonts/NotoSansKR-Light-Hestia.eot' />'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.eot?#iefix' />') format('embedded-opentype'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.woff' />') format('woff'),
    url('<c:url value='/fonts/NotoSansKR-Light-Hestia.otf' />') format('opentype');
}


/* reset */
body,p,h1,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,table,th,td,form,fieldset,legend,input,textarea,button,select{margin:0; padding:0} 
body,input,textarea,select,button,table{font-family:'Noto Sans KR','돋움',Dotum,AppleGothic,sans-serif;font-size:14px;font-weight:400;line-height:1.4;color:#444}
img,fieldset{border:0} 
ul,ol{list-style:none} 
em,address{font-style:normal} 
a{text-decoration:none} 
a:hover,a:active,a:focus{text-decoration:none;}
header, footer, section, hgroup, artice, aside, nav {display:block}
.haze, caption, .blind {display:block; width:0; height:0; font-size:0; visibility:hidden; overflow:hidden; line-height:0;}

html {
	height: 100%;
}

body {
	height: 100%;
	background-color: #efefef;
}

#container {
    width: 100%;
    margin: 0 auto;
}

#mapnavi {
	width: 100%;
	height: 60px;
	float: left;
	position: relative;
	min-width: 1260px;
	padding:0;
	background-color: #fff;
	top: 0; 
	left: 0; 
	z-index: 5;
	border-top: 3px solid #2553b5;
	border-bottom: 1px solid #cbd4e0;
}

#mapnavi ul {
	position: relative;
	width:100%
}

.mapnavibg {
	float: left;
	margin-top: 9px;
	margin-left: 20px;
	margin-right: 20px;
}

#mapnavi .m_menu {
	float: left;
    height: 60px;
    padding: 0 10px;
    background: #fff;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.5px;
	background: url('<c:url value='/image/map/menubar.gif' />') no-repeat 0 22px;
}

#mapnavi .m_menu:first-child {
	background:none;
}

#mapnavi .m_menu:last-child {
	position: absolute;
	right: 20px;
	padding-right: 0; 
	background: none;
	border: none;
	margin-top:0;
}

#mapnavi .m_menu a {
	height: 60px;
	width: 100%;
	text-align: center;
	color: #666;
	float: left;
	line-height: 58px;
	font-weight: 700;
}

#mapnavi .m_menu a:hover {
	background:#fff;
	/*color: #2553b5;*/
	/*border-bottom: 3px solid #1e98ff;*/
    /*background:#fff url('<c:url value='/image/map/tip_active.png' />') no-repeat center 0;*/
}

#mapnavi .m_menu:last-child a:hover {
	color: #fff;
	/*border-bottom: 3px solid #1e98ff;*/
	border-radius:4px;
	background:#1e98ff url('<c:url value='/image/map/tip_user.png' />') no-repeat 10px 7px;
}

#mapnavi .m_menu:last-child a {
	height:29px;
	width:56px;
	text-align:left;
	color:#fff;
	float:right;
	line-height:30px;
	padding-left:35px;
	margin:14px auto;
	border-radius:4px;
	background: #1e98ff url('<c:url value='/image/map/tip_user.png' />') no-repeat 10px 7px;
}

#mapnavi .m_menu_on {
	background: #fff;
	border-top: 3px solid #1e98ff;
	margin-top: -3px; 
	/*color: #2553b5;*/
	background: url('<c:url value='/image/map/menubar.gif' />') no-repeat 0 22px;
	/*background:#fff url('<c:url value='/image/map/tip_active.png' />') no-repeat center 0;*/
}

#mapnavi .m_menu_on a {
	float:left;
	background: #fff;
	/*color: #2553b5;*/
	/*background:#fff url('<c:url value='/image/map/tip_active.png' />') no-repeat center 0;*/
	/*border-bottom: 3px solid #1e98ff;*/
}

#mapnavi .m_menu_on:last-child a {
	float:right;
	color:#fff;
	/*border-bottom: 3px solid #1e98ff;*/
	border-radius:4px;
	background:#1e98ff url('<c:url value='/image/map/tip_user.png' />') no-repeat 10px 7px;
}

#panel02 {
	float: right; 
	width: 330px; 
	height: 93.5%; 
	background-color: #fff; 
	border-left: 1px solid #cbd4e0; 
}

#panel02 .map_serch {
	width: 100%;
	height: 50px;
	text-align: center;
	background-color: rgb(236, 236, 236);
}

#panel02 .map_serch li {
	background: url("<c:url value='/images/map/serchimg.gif' />");
	height: 50px;
}

.panel {
	padding: 5px 20px 0px 20px;
	float: left;
	display: none;
	background-color: #fff;
}

.panel ul:first-child {
	border-bottom-color: #cbd4e0;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	float: left;
}

.panel ul>p {
	width: 100%;
	line-height: 35px;
	padding: 3px 0;
	border-bottom-color: #cbd4e0;
	border-bottom-width: 1px;
	border-bottom-style: dashed;
	float: left;
}

.panel ul>p>select {
	border: 1px solid rgb(229, 229, 229);
	border-image: none;
	width: 60%;
	height: 30px;
	padding-left:3px;
}

.panel ul>p>input {
	border: 1px solid rgb(229, 229, 229);
	border-image: none;
	width: 60%;
	height: 30px;
	padding-left:5px;	
}

.panel ul>p>.date {
	border: 1px solid rgb(229, 229, 229);
	border-image: none;
	width: 55%;
	height: 30px;
}

.panel span {
	width: 30%;
	color: #555;
	padding-top: 2px;
	float: left;
}

.panel .btn_search {
	width: 40%;
	padding-bottom: 5%;
	margin-top: 5%;
	float: right;
}

.panel .btn_save {
	width: 30%;
	padding-bottom: 2%;
	margin-top: 2%;
	float: right;
}

.panel .btn_code {
	width: 28%;
	padding-bottom: 5%;
	margin-top: 5%;
	float: left;
}

.panel .pop_btn {
	padding-bottom: 10px;
	margin-top: -20px;
	float: right;
}

.tabmenu .tab ul>li {
	float: left;
}

.tabmenu .poptab ul>li {
	float: left;
}

.tabmenu .poptab .panel {
	padding: 5px 10px 0px;
	width: 95%;
	float: left;
	display: none;
	background-color: rgb(241, 241, 241);
}

.tabmenu .poptab .panel ul:first-child {
	border: currentColor;
	border-image: none;
}

.tabmenu .poptab .panel p {
	height: 45px;
	line-height: 45px;
}

.tabmenu .poptab .panel p.imageblah {
	height: 70px;
}

.tabmenu .poptab .panel p>span {
	background: url("<c:url value='/images/introduce/s_titlebg.gif' />") no-repeat left;
	padding-left: 25px;
}

.tabmenu .poptab .panel .btn_search {
	margin-left: 6.5%;
	float: left;
}

.tabmenu .poptab .panel .btn_save {
	margin-left: 2.5%;
	float: left;
}

.tabmenu .poptab .panel .btn_edit {
	padding: 10px;
	float: right;
}

.tabmenu .poptab .register p>input {
	width: 40%;
}

.tabmenu .poptab .register p>a {
	margin-left: 10px;
}

.tabmenu .statstap ul>li {
	float: left;
}

.tabmenu .statstap .panel {
	width: 95%;
	float: left;
	display: none;
}

.tabmenu .statstap .panel ul {
	padding: 1% 2%;
	border: 1px solid rgb(239, 239, 239);
	border-image: none;
	width: 100%;
	float: left;
	background-color: rgb(248, 248, 248);
}

.tabmenu .statstap .panel p {
	width: 45%;
	height: 45px;
	text-align: left;
	line-height: 45px;
	float: left;
}

.tabmenu .statstap .panel p>span {
	background: url("<c:url value='/images/introduce/s_titlebg.gif' />") no-repeat left;
	width: 100px;
	height: 45px;
	color: rgb(131, 131, 131);
	overflow: hidden;
	padding-left: 20px;
	font-weight: 700;
	float: left;
}

.tabmenu .statstap p>input {
	border: 1px solid rgb(220, 220, 220);
	border-image: none;
	width: 55%;
	height: 25px;
}

.tabmenu .statstap p>.date {
	background: rgb(223, 239, 252);
	border: 1px solid rgb(197, 219, 236);
	border-image: none;
	width: 23%;
	height: 25px;
}

.tabmenu .statstap p>select {
	border: 1px solid rgb(220, 220, 220);
	border-image: none;
	width: 55%;
	height: 25px;
}

.tabmenu .statstap .multiple p>select {
	background: rgb(223, 239, 252);
	width: 100px;
}

.tabmenu .statstap .multiple p>input {
	background: rgb(223, 239, 252);
}

.tabmenu .statstap p>a {
	margin-left: 10px;
}

ul.tabs03 {
    margin: 20px;
    padding: 0;
    float: left;
    list-style: none;
    height: 32px;
    width: 100%;
}
ul.tabs03 li {
    float: left;
    text-align:center;
    cursor: pointer;
    width:95px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #cbd4e0;
	border-right: none;
    font-weight: 500;
	color:#555;
    background: #f7f7f7;
    overflow: hidden;
    position: relative;
}

ul.tabs03 li:last-child {
	border-right: 1px solid #cbd4e0;
}

ul.tabs03 li.active {
	color:#fff;
	font-weight: 700;
    background: #2553b5;
	border: 1px solid #2553b5;
}

ul.tabs02 {
    margin: 20px;
    padding: 0;
    float: left;
    list-style: none;
    height: 32px;
    width: 100%;
}

ul.tabs02 li {
    float:left;
    cursor:pointer;
    background:#f7f7f7;
    overflow:hidden;
    position:relative;
	width:145px;
    height:34px;
    text-align:center;
    line-height:32px;
    font-weight:500;
	color:#555;
	border:1px solid #cbd4e0;
	border-right:none;
}

ul.tabs02 li:last-child {
	width:144px;
	border-right:1px solid #cbd4e0;
}

ul.tabs02 li.active {
	color:#fff;
	font-weight:700;
    background:#1e98ff;
	border:1px solid #1e98ff;
}

.tab_container {
    border-top: none;
    clear: both;
    float: left;
    width: 100%;
    background: #fff;
}
.tab_content {
    display: none;
}
.tab_content02 {
    display: none;
	width:293px;
	text-align:center;
}
.tab_container .tab_content ul {
    margin: 0px;
    padding: 0px;
}
.tab_container .tab_content ul li {
    padding: 5px;
    list-style: none;
}

#mgrnuInfoList {margin:20px;}
#mgrnuInfoList li {color:#555; text-align:left; padding:5px 0;}
#mgrnuInfoList li a {background:url('<c:url value='/image/tip_list.gif' />') no-repeat 0 7px; color:#555; text-align:left; padding-left:10px; display:block;}
#mgrnuInfoList li.map_result {border-bottom:none; text-align:center;}

/* table */

.table_default {border-bottom:1px solid #ccc; margin:10px 0;}
.table_default th {padding:3px 5px; font-size:13px; color:#555; text-align:left; border:1px solid #ccc; border-right:none; border-bottom:none; background:#f4f4f4;}
.table_default td {padding:3px 5px; text-align:left; color:#555; border:1px solid #ccc; border-right:none; border-bottom:none; word-wrap:break-word;}
.table_default tr th:first-child, .table1 tr td:first-child  {border-left:none;}

/* text align */

.txt_left {text-align:left !important;}
.txt_center {text-align:center !important;}
.txt_right {text-align:right !important;}
.txt_num {text-align:right !important;}

/* text color */

.txt_01 {color:#1e98ff!important;}
.txt_02 {color:#80bc00!important;}


/* margin & padding */

.pt0 {padding-top:0 !important;}
.pt5 {padding-top:5px !important;}
.pt10 {padding-top:10px !important;}
.pt15 {padding-top:15px !important;}
.pt20 {padding-top:20px !important;}
.pt25 {padding-top:25px !important;}
.pt30 {padding-top:30px !important;}
.pt35 {padding-top:35px !important;}
.pt40 {padding-top:40px !important;}
.pt45 {padding-top:45px !important;}
.pt50 {padding-top:50px !important;}

.pb0 {padding-bottom:0 !important;}
.pb5 {padding-bottom:5px !important;}
.pb10 {padding-bottom:10px !important;}
.pb15 {padding-bottom:15px !important;}
.pb20 {padding-bottom:20px !important;}
.pb25 {padding-bottom:25px !important;}
.pb30 {padding-bottom:30px !important;}
.pb35 {padding-bottom:35px !important;}
.pb40 {padding-bottom:40px !important;}
.pb45 {padding-bottom:45px !important;}
.pb50 {padding-bottom:50px !important;}

.pl0 {padding-left:0 !important;}
.pl5 {padding-left:5px !important;}
.pl10 {padding-left:10px !important;}
.pl15 {padding-left:15px !important;}
.pl20 {padding-left:20px !important;}
.pl25 {padding-left:25px !important;}
.pl30 {padding-left:30px !important;}
.pl35 {padding-left:35px !important;}
.pl40 {padding-left:40px !important;}
.pl45 {padding-left:45px !important;}
.pl50 {padding-left:50px !important;}

.pr0 {padding-right:0 !important;}
.pr5 {padding-right:5px !important;}
.pr10 {padding-right:10px !important;}
.pr15 {padding-right:15px !important;}
.pr20 {padding-right:20px !important;}
.pr25 {padding-right:25px !important;}
.pr30 {padding-right:30px !important;}
.pr35 {padding-right:35px !important;}
.pr40 {padding-right:40px !important;}
.pr45 {padding-right:45px !important;}
.pr50 {padding-right:50px !important;}

.mt0 {margin-top:0 !important;}
.mt5 {margin-top:5px !important;}
.mt10 {margin-top:10px !important;}
.mt15 {margin-top:15px !important;}
.mt20 {margin-top:20px !important;}
.mt25 {margin-top:25px !important;}
.mt30 {margin-top:30px !important;}
.mt35 {margin-top:35px !important;}
.mt40 {margin-top:40px !important;}
.mt45 {margin-top:45px !important;}
.mt50 {margin-top:50px !important;}
.mt60 {margin-top:60px !important;}

.mb0 {margin-bottom:0px !important;}
.mb5 {margin-bottom:5px !important;}
.mb10 {margin-bottom:10px !important;}
.mb15 {margin-bottom:15px !important;}
.mb20 {margin-bottom:20px !important;}
.mb25 {margin-bottom:25px !important;}
.mb30 {margin-bottom:30px !important;}
.mb35 {margin-bottom:35px !important;}
.mb40 {margin-bottom:40px !important;}
.mb45 {margin-bottom:45px !important;}
.mb50 {margin-bottom:50px !important;}

.ml0 {margin-left:0 !important;}
.ml3 {margin-left:3px !important;}
.ml5 {margin-left:5px !important;}
.ml8 {margin-left:8px !important;}
.ml10 {margin-left:10px !important;}
.ml15 {margin-left:15px !important;}
.ml20 {margin-left:20px !important;}
.ml25 {margin-left:25px !important;}
.ml30 {margin-left:30px !important;}
.ml35 {margin-left:35px !important;}
.ml40 {margin-left:40px !important;}
.ml45 {margin-left:45px !important;}
.ml50 {margin-left:50px !important;}

.mr0 {margin-right:0 !important;}
.mr5 {margin-right:5px !important;}
.mr10 {margin-right:10px !important;}
.mr15 {margin-right:15px !important;}
.mr20 {margin-right:20px !important;}
.mr25 {margin-right:25px !important;}
.mr30 {margin-right:30px !important;}
.mr35 {margin-right:35px !important;}
.mr40 {margin-right:40px !important;}
.mr45 {margin-right:45px !important;}
.mr50 {margin-right:50px !important;}

/*jquery ui*/

#accordion h3 {font-size:14px; font-weight:500; color:#555;}
.ui-accordion .ui-accordion-header {display:block; cursor:pointer; position:relative; margin:2px 0 0 0; padding:0; line-height:30px; height:30px; min-height:0; border:1px solid #cbd4e0; /* support: IE7 */ font-size:100%;}
.ui-accordion .ui-accordion-icons {padding-left: 5px;}
.ui-accordion .ui-accordion-header .ui-accordion-header-icon {position:absolute; width:100%; height:30px; right:0; top:0;}
.ui-icon-plus {background:url('<c:url value='/image/map/img_arrow.png' />') no-repeat right 0; background-size:30px 60px;}
.ui-icon-minus {background:url('<c:url value='/image/map/img_arrow.png' />') no-repeat right -30px; background-size:30px 60px;}

.ui-state-default,
.ui-widget-content .ui-state-default,
.ui-widget-header .ui-state-default {
	background:#f7f7f7;
	color:#555;
}
.ui-state-default a,
.ui-state-default a:link,
.ui-state-default a:visited {
	color: #555;
	text-decoration:none;
}
.ui-state-hover,
.ui-widget-content .ui-state-hover,
.ui-widget-header .ui-state-hover,
.ui-state-focus,
.ui-widget-content .ui-state-focus,
.ui-widget-header .ui-state-focus {
	color:#555;
}
.ui-state-hover a,
.ui-state-hover a:hover,
.ui-state-hover a:link,
.ui-state-hover a:visited,
.ui-state-focus a,
.ui-state-focus a:hover,
.ui-state-focus a:link,
.ui-state-focus a:visited {
	color:#555;
	text-decoration:none;
}
.ui-state-active,
.ui-widget-content .ui-state-active,
.ui-widget-header .ui-state-active {
	color: #555;
	background:#f7f7f7;
}
.ui-state-active a,
.ui-state-active a:link,
.ui-state-active a:visited {
	color:#555;
	background:#f7f7f7;
	text-decoration:none;
}



/* .ui-accordion .ui-accordion-header {
	display: block;
	cursor: pointer;
	position: relative;
	margin: 2px 0 0 0;
    padding: 3px;
	min-height: 0; 
	font-size: 100%;
}
.ui-accordion .ui-accordion-icons {
	padding-left: 5px;
}
.ui-accordion .ui-accordion-icons .ui-accordion-icons {
	padding-left: 5px;
}
.ui-accordion .ui-accordion-header .ui-accordion-header-icon {
	position: absolute;
	left: 5px;
	top: 50%;
	margin-top: -8px;
}
.ui-accordion .ui-accordion-content {
	padding: 0;
	overflow: auto;
}

.ui-state-default,
.ui-widget-content .ui-state-default,
.ui-widget-header .ui-state-default {
	border: 1px solid #d3d3d3;
	background: #e6e6e6;
	font-weight: normal;
	color: #555555;
}
.ui-state-default a,
.ui-state-default a:link,
.ui-state-default a:visited {
	color: #555555;
	text-decoration: none;
}
.ui-state-hover,
.ui-widget-content .ui-state-hover,
.ui-widget-header .ui-state-hover,
.ui-state-focus,
.ui-widget-content .ui-state-focus,
.ui-widget-header .ui-state-focus {
	border: 1px solid #999999;
	background: #dadada;
	font-weight: normal;
	color: #212121;
}
.ui-state-hover a,
.ui-state-hover a:hover,
.ui-state-hover a:link,
.ui-state-hover a:visited,
.ui-state-focus a,
.ui-state-focus a:hover,
.ui-state-focus a:link,
.ui-state-focus a:visited {
	color: #212121;
	text-decoration: none;
}
.ui-state-active,
.ui-widget-content .ui-state-active,
.ui-widget-header .ui-state-active {
	border: 1px solid #aaaaaa;
	background: #dadada;
	font-weight: normal;
	color: #212121;
}
.ui-state-active a,
.ui-state-active a:link,
.ui-state-active a:visited {
	color: #212121;
	text-decoration: none;
}
*/

/*mapctrl*/

#mapctrl {
	background: #fff; 
}
#mapctrl li {
    float: left;
    width: 34px;
    height: 34px;
	text-align: center;
    cursor: pointer;
	padding: 0;
	font-size: 0;
	border-right: 1px solid #e7e7e7;
}
#mapctrl li:last-child {
	border: none;
}

.ctrlM01 {display:block; width:34px; height:34px; background: url('<c:url value='/image/map/icon_mapAll.png' />') no-repeat;}
.ctrlM01:hover {background: url('<c:url value='/image/map/icon_mapAll_on.png'/>') no-repeat;}
.ctrlM02 {display:block; width:34px; height:34px; background: url('<c:url value='/image/map/icon_mapMove.png' />') no-repeat;}
.ctrlM02:hover {background: url('<c:url value='/image/map/icon_mapMove_on.png'/>') no-repeat;}
.ctrlM03 {display:block; width:34px; height:34px; background: url('<c:url value='/image/map/icon_mapSelect.png' />') no-repeat;}
.ctrlM03:hover {background: url('<c:url value='/image/map/icon_mapSelect_on.png'/>') no-repeat;}
.ctrlM04 {display:block; width:34px; height:34px; background: url('<c:url value='/image/map/icon_mapExpand.png' />') no-repeat;}
.ctrlM04:hover {background: url('<c:url value='/image/map/icon_mapExpand_on.png'/>') no-repeat;}
.ctrlM05 {display:block; width:34px; height:34px; background: url('<c:url value='/image/map/icon_mapReduce.png' />') no-repeat;}
.ctrlM05:hover {background: url('<c:url value='/image/map/icon_mapReduce_on.png'/>') no-repeat;}
.ctrlM06 {display:block; width:34px; height:34px; background: url('<c:url value='/image/map/icon_mapNext.png' />') no-repeat;}
.ctrlM06:hover {background: url('<c:url value='/image/map/icon_mapNext_on.png'/>') no-repeat;}
.ctrlM07 {display:block; width:34px; height:34px; background: url('<c:url value='/image/map/icon_mapPre.png' />') no-repeat;}
.ctrlM07:hover {background: url('<c:url value='/image/map/icon_mapPre_on.png'/>') no-repeat;}
.ctrlM08 {display:block; width:34px; height:34px; background: url('<c:url value='/image/map/icon_mapDistance.png' />') no-repeat;}
.ctrlM08:hover {background: url('<c:url value='/image/map/icon_mapDistance_on.png'/>') no-repeat;}
.ctrlM09 {display:block; width:34px; height:34px; background: url('<c:url value='/image/map/icon_mapPrint.png' />') no-repeat;}
.ctrlM09:hover {background: url('<c:url value='/image/map/icon_mapPrint_on.png'/>') no-repeat;}
.ctrlM10 {display:block; width:34px; height:34px; background: url('<c:url value='/image/map/icon_mapSave.png' />') no-repeat;}
.ctrlM10:hover {background: url('<c:url value='/image/map/icon_mapSave_on.png'/>') no-repeat;}


/* mapzoom */

.mapzoomArea{
	position: relative;
	width: 71px;
}

.slider_btn {
	position: relative;
	float: left;
	top: 63px;
	background: url('<c:url value='/image/map/img_map_zoom.png'/>') no-repeat -130px 0;
	width: 36px;
	height: 15px;
}

.mapzoom {
    position: relative;
	float:right;
    width: 29px;
	background: #fff; 
	border: 1px solid #cbd4e0; 
	border-radius: 4px;
	padding:1px;
}

.zoomin {
	background: url('<c:url value='/image/map/img_map_zoom.png'/>') no-repeat -34px 0;
	width: 29px;
	height: 24px;
}

.zoomin:hover {
	background: url('<c:url value='/image/map/img_map_zoom.png'/>') no-repeat 0 0;
	width: 29px;
	height: 24px;
}

.zoomout {
	background: url('<c:url value='/image/map/img_map_zoom.png'/>') no-repeat -34px -29px;
	width: 29px;
	height: 24px;
}

.zoomout:hover {
	background: url('<c:url value='/image/map/img_map_zoom.png'/>') no-repeat 0 -29px;
	width: 29px;
	height: 24px;
}

.slider {
	background: url('<c:url value='/image/map/img_map_zoom.png'/>') no-repeat -112px 0;
    width: 13px;
    height: 82px;
	margin: 8px;
}

.slider_bar {
	background: url('<c:url value='/image/map/img_map_ctrl.png'/>') no-repeat -68px 0;
	width: 21px;
	height: 13px;
	margin: 0 -4px;
}

.ol-tooltip {
	display: block;
	font-size: 12px; font =style : normal;
	font-weight: 400;
	letter-spacing: normal;
	line-height: 1.42857;
	text-align: start;
	text-decoration: none;
	text-shadow: none;
	text-transform: none;
	word-break: normal;
	word-spacing: normal;
	word-wrap: normal;
	position: relative;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 4px;
	color: white;
	padding: 4px 8px;
	opacity: 0.7;
	white-space: nowrap;
}

.ol-tooltip-measure {
	opacity: 1;
	font-weight: bold;
}

.ol-tooltip-static {
	background-color: #ffcc33;
	color: black;
	border: 1px solid white;
}

.ol-tooltip-measure:before,.ol-tooltip-static:before {
	border-top: 6px solid rgba(0, 0, 0, 0.5);
	border-right: 6px solid transparent;
	border-left: 6px solid transparent;
	content: "";
	position: absolute;
	bottom: -6px;
	margin-left: -7px;
	left: 50%;
}

.ol-tooltip-static:before {
	border-top-color: #ffcc33;
}

.ol-tooltip-measure-close {
	color : #f00;
	margin-left : 6px;
	padding : 2px 3px;
	background-color : #fff;
	border-radius : 2px;
	cursor : pointer;
}

#div_map_menu { position:relative; float:left; width:200px; min-height:500px; display:block; background-color:#fff; z-index:100; overflow-y:auto; }
#div_map_container { float:left; position:relative; width:82%; height: 93.5%; }
#div_map { width:100%; height:100%; }

#ul_layer_tree { padding:10px 0px; }
#ul_layer_tree li { padding:2px 0px; }
#ul_layer_tree .tree_layer_img { vertical-align:middle; width:16px; height:16px; display:inline-block; overflow-hidden; border:1px solid #ccc; }
#ul_layer_tree .tree_layer_span { vertical-align:middle; margin-left:5px; }

.pmap-scale-line {
	position : absolute;
	padding : 2px;
	curosr : pointer;
	background : rgba(0,60,136,.3);
	border-radius : 4px;
	bottom : 8px;
	right : 8px;
}

.pmap-scale-line-top {
	color : #fff;
	padding : 3px 0;
}