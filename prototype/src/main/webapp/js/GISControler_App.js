function onFeatureSelectInfo(url) {
	window.open(url, "_blank", "menubar=no, location=no, toolbar=no, scrollbars=yes,  top=55, left=800, width=600, height=600");
}

//좌표이동을 위한 좌표설정과 피쳐 생성
function moveTabXY(loX, laY, addr) {
	
	//$("#mgrnuInfoList").children().remove('li');
	$(".tabmenu").hide();
	$(".circle").show();
	$(".polygon").hide();
	$("#switchDiv").show();
	highlightObj.showBufferFeature(loX, laY, 500);
	
	//메뉴에 따라 다른 버튼을 만들어 줌
	if(menutType == '2'){
		$(".inhuga").show();
		$(".devpos").hide();
	} else if(menutType == '3'){
		$(".inhuga").hide();
		$(".devpos").show();
	}
	
}

function createFeature(x, y) {
	highlightObj.showFeature(x, y);
}

function popupPolygon(type) {

	$("#mgrnuInfoList").children().remove('li');
	
	var geomXY = document.getElementById("geomXY").value;
	var geomLatLon = document.getElementById("geomLatLon").value;
	var area = document.getElementById("area").value;
	
	measureObj.clear();
	highlightObj.clear();
	spatialInfo.clear();
	
	var crdntXY = geomXY.substring(0, geomXY.indexOf(","));
	var crdntX = crdntXY.substring(0, crdntXY.indexOf(" "));
	var crdntY = crdntXY.substring(crdntXY.indexOf(" "), crdntXY.length);
	var LatLon = geomLatLon.substring(0, geomLatLon.indexOf(","));
	var lat = LatLon.substring(0, LatLon.indexOf(" "));
	var lon = LatLon.substring(LatLon.indexOf(" "), LatLon.length);
	
	var geocoder = new daum.maps.services.Geocoder();
		var latlng = new daum.maps.LatLng(lon, lat);
		geocoder.coord2detailaddr( latlng, function(status, result) {
	        if (status === daum.maps.services.Status.OK) {
	            var detailAddr = result[0].jibunAddress.name;
	            $("#addr").val(detailAddr.replace("경기 포천시 ", ""));
	        }
		});
		
	$("#loX").val(crdntX.substring(0, crdntX.indexOf(".")+5));
	$("#laY").val(crdntY.substring(0, crdntY.indexOf(".")+5));
	$("#lat").val(lat.substring(0, lat.indexOf(".")+7));
	$("#lon").val(lon.substring(0, lon.indexOf(".")+7));
	
	var addr = document.getElementById("addr").value;	
	
	if(type == '2'){
		surl = CONTEXT_PATH + "/admin/popup/devPosblByTab2.do";
	} else if(type == '3'){
		surl = CONTEXT_PATH + "/admin/popup/devPosblByTab3.do";
	}
	
	$.ajax({
		type : "POST",
		url :  surl,
		data :{crdntX:crdntX
			  ,crdntY:crdntY
			  ,addr:addr
			  ,geomXY:geomXY
			  ,area:area},
		async : false,
		dataType : "html",
		success : function(data, textStatus, XMLHttpRequest) {
			$("#mgrnuInfoList").append("<li id=map_result>"+data+"</li>");
			$(".circle").hide();
			$(".polygon").show();
		    
	},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("접속이 지연되고 있습니다.");
		}
	});	
}

function popupDevPosbl(type) {
	
	$("#mgrnuInfoList").children().remove('li');

	measureObj.clear();
	spatialInfo.clear();
	polygonSearch.clear();
	
	var loX = document.getElementById("loX").value;
	var laY = document.getElementById("laY").value;
	var addr = document.getElementById("addr").value;	
	//surl = CONTEXT_PATH + "/admin/map/popupmenuByDevPosbl.do"; 
	
	/*
	var surl=CONTEXT_PATH + "/admin/popup/devPosblByTab2.do";
	/*if(menutType == '1' || menutType == '5'){
		surl = CONTEXT_PATH + "/admin/popup/devPosblByTab1.do";
	} else * /if(menutType == '2'){
		surl = CONTEXT_PATH + "/admin/popup/devPosblByTab2.do";
	} else if(menutType == '3'){
		surl = CONTEXT_PATH + "/admin/popup/devPosblByTab3.do";
	}
	*/
	var surl=CONTEXT_PATH + "/admin/popup/devPosblByTab2.do";
	if(type == 3){
		surl = CONTEXT_PATH + "/admin/popup/devPosblByTab3.do";
	}
	
	$.ajax({
		type : "POST",
		url :  surl,
		data :{crdntX:loX,crdntY:laY,addr:addr},
		async : false,
		dataType : "html",
		success : function(data, textStatus, XMLHttpRequest) {
			$("#mgrnuInfoList").append("<li id=map_result>"+data+"</li>");
			$(".circle").show();
			$(".polygon").hide();
	},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("접속이 지연되고 있습니다.");
		}
	});	
	
}

function popupDevPosblBySearch() {
	var loX = document.getElementById("loX").value;
	var laY = document.getElementById("laY").value;
	var addr = document.getElementById("addr").value;
	
	var url = CONTEXT_PATH + "/admin/popup/devPosbl.do?crdntX=" + loX + "&crdntY=" + laY + "&addr=" + addr; 
	
	window.open(url, "_blank", "menubar=no, location=no, toolbar=no, scrollbars=yes,  top=55, left=800, width=600, height=600");
}

function popupPolygonBySearch() {
	
	var geomXY = document.getElementById("geomXY").value;
	var addr = document.getElementById("addr").value;
	
	var url = CONTEXT_PATH + "/admin/popup/polygon.do?geomXY=" + geomXY + "&addr=" + addr; 
	
	window.open(url, "_blank", "menubar=no, location=no, toolbar=no, scrollbars=yes,  top=55, left=800, width=600, height=600");
}

function createCircle() {
	var lon = document.getElementById("lon").value;
	var lat = document.getElementById("lat").value;
	var addr = document.getElementById("addr").value;

	$("#geomXY").val("");
	$("#geomLatLon").val("");
	$("#area").val("");
	
	pMap.activeInteractions("drag");
	moveTabXY(lat,lon,addr);
	popupDevPosbl(3);
}

function fn_AddrSearch(flag) {
	var searchText = "";
	var searchUrl = "";
	var frontText = "경기도 포천시 ";
	var textVal ="";
	
	var inGroup = document.getElementById("searchEmd");
	var strValue = inGroup.options[inGroup.selectedIndex].text;
	
	if(strValue != "전체" &&  $("#juso").val() == "") {
		
		textVal += strValue;
		
		inGroup = document.getElementById("searchRi");
		strValue = inGroup.options[inGroup.selectedIndex].text;

		if(strValue != "전체") {
			textVal += " " + strValue;
		}
		
		if(flag==1) {
			textVal += " " + $("#jibun").val();
		} else if(flag==2) {
			textVal += " " + $("#juso").val();
		} else {
			textVal += " " + $("#addr").val();
		}
		
	} else {
		if(flag==1) {
			textVal += $("#jibun").val();
		} else if(flag==2) {
			textVal += $("#juso").val();
		} else {
			textVal += $("#addr").val();
		}
		
		if(textVal==""){
			alert("잘못된 검색입니다.");
			return;
		}
	}
	
	if(flag==1){
		searchText = escape(encodeURIComponent(frontText.concat(textVal)));
		searchUrl = CONTEXT_PATH+"/admin/map/searchJibun.do?searchText=" + searchText + "&pageIndex=1";
	} else if(flag==2) {
		searchText = escape(encodeURIComponent(frontText.concat(textVal)));
		searchUrl = CONTEXT_PATH+"/admin/map/searchJuso.do?searchText=" + searchText + "&pageIndex=1";
	} else if(flag==3){
		searchText = escape(encodeURIComponent(frontText.concat(textVal)));
		searchUrl = CONTEXT_PATH+"/admin/map/searchJibun.do?searchText=" + searchText + "&pageIndex=1";
	} else {
		searchText = escape(encodeURIComponent(frontText.concat(textVal)));
		searchUrl = CONTEXT_PATH+"/admin/map/searchJuso.do?searchText=" + searchText + "&pageIndex=1";
	}
	
	
	$.ajax({
		type : "POST",
		url :  searchUrl,
		async : false,
		dataType : "json",
		success : function(data, textStatus, XMLHttpRequest) {

			var item = data.LIST;
//			var info = data.paginationInfo;
			$("#mgrnuInfoList").children().remove('li');
			if(item == ""){
				if(flag==3) {
					fn_AddrSearch(4);
				} else {
					$("#mgrnuInfoList").append("<li class=map_result><div><ul>검색결과가 없습니다.</ul><div></li>");
				}
			}
			
			for (var i = 0; i < item.length; i++) {
				$("#mgrnuInfoList").append("<li class=map_result><div><ul><a href='javascript:moveTabXY("+ item[i].xpos + ", " + item[i].ypos + ", \"" + item[i].JUSO + "\")'>" + item[i].JUSO + "</a></ui></div></li>");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("접속이 지연되고 있습니다.");
		}
	});
}

function fn_featureSearch(flag, target) {
	var textVal ="";
	var reqUrl = CONTEXT_PATH+"/admin/map/ajaxRetrieveListByTubeAddr.do";
	
	var inGroup = document.getElementById("searchEmd");
	var emd = inGroup.options[inGroup.selectedIndex].text;
	
	if(emd != "전체" && !$("#juso").val()) {
		
		textVal += emd;
		
		inGroup = document.getElementById("searchRi");
		var ri = inGroup.options[inGroup.selectedIndex].text;
		
		if(ri != "전체") {
			textVal += " " + ri;
			
			if(target==1) {
				textVal += " " + $("#jibun").val();
			} else {
				textVal += " " + $("#juso").val();
			} 
		}
		
	} else {
		if(target==1) {
			textVal += $("#jibun").val();
		} else {
			textVal += $("#juso").val();
		} 
		
		if(textVal==""){
			alert("잘못된 검색입니다.");
			return;
		}
	}
	
	$.ajax({
		type : "POST",
		url : reqUrl,
		async : false,
		data: {serchVal : textVal,
			   flag : flag,
			   target : target
				} ,
		dataType : "json",
		success : function(data, textStatus, XMLHttpRequest) {
			$("#mgrnuInfoList").children().remove('li');
			
			if(data.data.resultList == ""){
				$("#mgrnuInfoList").append("<li class=map_result><div><ul>검색결과가 없습니다.</ul><div></li>");
			}
			
			
			$.each(data.data.resultList, function(key, value){
				var strString = "";
				var dbname = value.dbname.toUpperCase();
				var url = "";
				if (flag == "1") {
					var li = "";
					var ho = "";
					url = CONTEXT_PATH + "/admin/map/retrieveByInfo.do?prmisnSttemntNo=" + value.prmisnSttemntNo + "&dbname=SEOUL_DISTANCE";
					if(value.li != "-"){li = " " + value.li;}
					if(value.ho != "-"){ho = "-" + value.ho;}
					strString =  value.cmpnmOrNm + " / " + value.emd + li + " " + value.lnbr + ho + " / " + value.manageNo;
					$("#mgrnuInfoList").append("<li class=map_result><a target='_self' href='javascript:createFeature("+ value.crdntLoX +", " +value.crdntLaY+")'>" + strString	+ "</a><button onclick='javascript:createFeature("+ value.crdntLoX +", " +value.crdntLaY+");onFeatureSelectInfo(\"" + url + "\");'>관정정보</button></li>");
					
				} else {
					var fcltylcLnbr = "";
					var fcltylcLi = "";
					var geomseq = value.geomseq;
					url = CONTEXT_PATH + "/admin/map/retrieveByInfo.do?geomseq=" + geomseq + "&dbname="	+ dbname;
					if(value.fcltylcLi != undefined){fcltylcLi = " " + value.fcltylcLi;}
					if(value.fcltylcLnbrLegacy != undefined){
						fcltylcLnbr = " " + value.fcltylcLnbrLegacy;
					}
					if(value.fcltylcLnbrNclLnm != undefined){
						fcltylcLnbr = " " + value.fcltylcLnbrNclLnm;
					}
					
					strString =  value.ownerNm + " / " + value.fcltylcEmd + fcltylcLi + fcltylcLnbr + " / " + value.sptExaminNo;
					$("#mgrnuInfoList").append("<li class=map_result><a target='_self' href='javascript:createFeature("+ value.crdntLoX +", " +value.crdntLaY +")'><div><ul>" + strString	+ "</ul><div></a> <button onclick='javascript:createFeature("+ value.crdntLoX +", " +value.crdntLaY +");onFeatureSelectInfo(\"" + url + "\");'>관정정보</button></li>");
				}
				strString = null;
				
			});
		
			return;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("접속이 지연되고 있습니다. 다시 작업해 주세요.");
			return;
		}

	});
}

function changedSearchGroup() {
	var inGroup = document.getElementById("searchGroup");
	var strValue = inGroup.options[inGroup.selectedIndex].value;

	var inSelect = document.getElementById("searchSelect");
	var inSelSize = inSelect.length;
	for (var i = 0; i < inSelSize; i++)
		inSelect.remove(inSelect.length - 1);

	if (strValue == "1") {
		
		var option = document.createElement("option");
		option.text = "생활용";
		option.value = "sttemnt_prmisn_lvlh";
		option.selected = true;
		inSelect.add(option);

		option = document.createElement("option");
		option.text = "공업용";
		option.value = "sttemnt_prmisn_indprp";
		inSelect.add(option);

		option = document.createElement("option");
		option.text = "농업용";
		option.value = "sttemnt_prmisn_farmng";
		inSelect.add(option);
		
		option = document.createElement("option");
		option.text = "기타";
		option.value = "sttemnt_prmisn_etc";
		inSelect.add(option);

	} else if (strValue == "2") {

		var option = document.createElement("option");
		option.text = "생활용";
		option.value = "sttemnt_sttemnt_lvlh";
		inSelect.add(option);

		option = document.createElement("option");
		option.text = "공업용";
		option.value = "sttemnt_sttemnt_indprp";
		inSelect.add(option);

		option = document.createElement("option");
		option.text = "농업용";
		option.value = "sttemnt_sttemnt_farmng";
		inSelect.add(option);
		
		option = document.createElement("option");
		option.text = "기타";
		option.value = "sttemnt_sttemnt_etc";
		inSelect.add(option);

	}  else if (strValue == "3") {

		var option = document.createElement("option");
		option.text = "생활용";
		option.value = "unsttemnt_lvlh";
		inSelect.add(option);

		option = document.createElement("option");
		option.text = "공업용";
		option.value = "unsttemnt_indprp";
		inSelect.add(option);

		option = document.createElement("option");
		option.text = "농업용";
		option.value = "unsttemnt_farmng";
		inSelect.add(option);
		
		option = document.createElement("option");
		option.text = "기타";
		option.value = "unsttemnt_etc";
		inSelect.add(option);
	
	}  else if (strValue == "4") {

		option = document.createElement("option");
		option.text = "사용종료매립지";
		option.value = "use_end_rclmlnd_geom";
		inSelect.add(option);
		
		option = document.createElement("option");
		option.text = "축사시설";
		option.value = "stall_fclty_sttus_dta_geom";
		inSelect.add(option);
		
		option = document.createElement("option");
		option.text = "폐수배출시설";
		option.value = "fttdc_geom";
		inSelect.add(option);
		
		option = document.createElement("option");
		option.text = "특정토양오염";
		option.value = "spcify_grl_geom";
		inSelect.add(option);
		
	}  else if (strValue == "5") {

		option = document.createElement("option");
		option.text = "소규모수도시설";
		option.value = "small_scale_geom";
		inSelect.add(option);
		
		option = document.createElement("option");
		option.text = "약수터";
		option.value = "mineral_spring_geom";
		inSelect.add(option);
		
		option = document.createElement("option");
		option.text = "농업용대형관정";
		option.value = "frmng_lgz_well_geom";
		inSelect.add(option);
		
	} else if (strValue == "6") {

		option = document.createElement("option");
		option.text = "온천시설";
		option.value = "hspr_fclty";
		inSelect.add(option);
		
	} else if (strValue == "7") {

		option = document.createElement("option");
		option.text = "굴착행위";
		option.value = "dgg_action";
		inSelect.add(option);
		
	} else {
		var option = document.createElement("option");
		option.text = "모든시설";
		option.value = "";
		option.selected = true;
		inSelect.add(option);
	}
	inSelect.selectedIndex = "0";
}

//시설물 검색
function featureSearch(){
	/*
	if($("#searchGroup").val() == 0){
		alert("구분을 선택해 주세요.");
		return;
	}
	*/
	if($("#searchMgrnu").val() == '' && $("#searchSpt").val() == ''){
		alert("검색어를 입력하세요.");
		return;
	}
	
	
	$("#mgrnuInfoList").children().remove('li');

	var reqUrl = CONTEXT_PATH+"/admin/map/ajaxSetFeatureByDB.do";
	var layer = document.getElementById("searchSelect").value.toUpperCase();
	var mgrnu = document.getElementById("searchMgrnu").value;
	var groupNo = document.getElementById("searchGroup").value;
	var serchVal = $("#searchSelect option:selected").text();

	if(menutType == 4){
		groupNo = "3";
		layer = "undeclared".toUpperCase();
		mgrnu =  document.getElementById("searchSpt").value;
	}
	
	$.ajax({
		type : "POST",
		url : reqUrl,
		async : false,
		data: {dbname :layer , 
			   mgrnu : mgrnu,
			   groupNo : groupNo,
			   serchVal : serchVal
				} ,
		dataType : "json",
		success : function(data, textStatus, XMLHttpRequest) {
			if(data.data.resultList == ""){
				$("#mgrnuInfoList").append("<li class=map_result><div><ul>검색결과가 없습니다.</ul><div></li>");
			}
			
			
			$.each(data.data.resultList, function(key, value){
				var strString = "";
				var dbname = value.dbname.toUpperCase();
				var url = "";
				if(value.groupNo == "5") {
					if(dbname == "SMALL_SCALE_GEOM"){
						strString =  " 소규모수도시설 / " + value.locplcLc+ " " + value.locplcLnbr;
					} else if(dbname == "MINERAL_SPRING_GEOM"){
						strString =  " 약수터 / " + value.lcDongli + " " + value.lcLnm;
					} else {
						strString =  $("#searchSelect option:selected").text() +" / " + value.lcEmd + " " + value.lcLitong + " " + value.lcLnbr;
					}
					$("#mgrnuInfoList").append("<li class=map_result><a target='_self' href='javascript:createFeature("+ value.longitude +", " +value.latitude+")'><div><ul>" + strString	+ "</ul><div></a><button onclick='javascript:createFeature("+ value.longitude +", " +value.latitude +");onFeatureSelectInfo(\"" + url + "\");'>관정정보</button></li>");
				} else if(value.groupNo == "4") {
					if(dbname == "STALL_FCLTY_STTUS_DTA_GEOM"){
						strString =  value.bplcNm+" / " + value.rghpsnLocplcLnm.replace("경기도 포천시 ", "");
					}else if(dbname == "USE_END_RCLMLND_GEOM"){					
						strString =  " 사용종료 매립지 / " + value.locplc;	
					}else if(dbname == "FTTDC_GEOM"){	
						strString =  value.bsshNm + " / " + value.emd + " " + value.lnbr;	
					} else {
						strString =  value.entrpsNm + " / " + value.lc;	
					}
					$("#mgrnuInfoList").append("<li class=map_result><a target='_self' href='javascript:createFeature("+ value.longitude +", " +value.latitude+")'><div><ul>" + strString	+ "</ul><div></a><button onclick='javascript:createFeature("+ value.longitude +", " +value.latitude +");onFeatureSelectInfo(\"" + url + "\");'>관정정보</button></li>");
				} else if (value.groupNo == "3") {
					var fcltylcLnbr = "";
					var fcltylcLi = "";
					var geomseq = value.geomseq;
					url = CONTEXT_PATH + "/admin/map/retrieveByInfo.do?geomseq=" + geomseq + "&dbname="	+ dbname;
					if(value.fcltylcLi != undefined){fcltylcLi = " " + value.fcltylcLi;}
					if(value.fcltylcLnbrLegacy != undefined){
						fcltylcLnbr = " " + value.fcltylcLnbrLegacy;
					}
					if(value.fcltylcLnbrNclLnm != undefined){
						fcltylcLnbr = " " + value.fcltylcLnbrNclLnm;
					}
					
					strString =  value.ownerNm + " / " + value.fcltylcEmd + fcltylcLi + fcltylcLnbr + " / " + value.sptExaminNo;
					$("#mgrnuInfoList").append("<li class=map_result><a target='_self' href='javascript:createFeature("+ value.crdntLoX +", " +value.crdntLaY +")'><div><ul>" + strString	+ "</ul><div></a><button onclick='javascript:createFeature("+ value.crdntLoX +", " +value.crdntLaY +");onFeatureSelectInfo(\"" + url + "\");'>관정정보</button></li>");
				} else if (value.groupNo == "1" || value.groupNo == "2" || value.groupNo == "6" || value.groupNo == "7") {
					var li = "";
					var ho = "";
					url = CONTEXT_PATH + "/admin/map/retrieveByInfo.do?prmisnSttemntNo=" + value.prmisnSttemntNo + "&dbname=SEOUL_DISTANCE";
					if(value.li != "-"){li = " " + value.li;}
					if(value.ho != "-"){ho = "-" + value.ho;}
					strString =  value.cmpnmOrNm + " / " + value.emd + li + " " + value.lnbr + ho + " / " + value.manageNo;
					$("#mgrnuInfoList").append("<li class=map_result><a target='_self' href='javascript:createFeature("+ value.crdntLoX +", " +value.crdntLaY+")'><div><ul>" + strString	+ "</ul><div></a><button onclick='javascript:createFeature("+ value.crdntLoX +", " +value.crdntLaY+");onFeatureSelectInfo(\"" + url + "\");'>관정정보</button></li>");
				}
				strString = null;
				
			});
		
			return;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("접속이 지연되고 있습니다. 다시 작업해 주세요.");
			return;
		}

	});

}

function openPopupmenuByDudt(flag) {
	url = CONTEXT_PATH + "/admin/map/popupmenuByDudt.do?flag=" + flag; 
	
	window.open(url, "_blank", "menubar=no, location=no, toolbar=no, scrollbars=yes,  top=55, left=800, width=600, height=600");

}

function openPopupmenuByStatTbl() {
	url = CONTEXT_PATH + "/admin/map/popupmenuByStatTbl.do"; 
	
	window.open(url, "_blank", "menubar=no, location=no, toolbar=no, scrollbars=yes,  top=55, left=50, width=1200, height=600");

}
function openPopupmenuDashboard() {
	url = CONTEXT_PATH + "/admin/dashboard/popup.do"; 
	
	window.open(url, "_blank", "menubar=no, location=no, toolbar=no, scrollbars=yes,  top=55, left=400, width=1000, height=800");

}

function containerReset() {
	
	$("#mgrnuInfoList").children().remove('li');
	$("#switchDiv").hide();
	
	$(".tabmenu").show();
	
	$(".tab_content").hide();
	$(".tab_content:first").show();
    $("ul.tabs03 li").removeClass("active").css("color", "#555");
    $("ul.tabs03 li:nth-child(1)").addClass("active").css("color", "#fff");
	$("#tab1").fadeIn();
	$(".seoul").show();
	$(".undclared").hide();
	$(".examine").hide();
	
	removeVal();
}

function removeVal() {
	if(document.getElementById("searchGroup").length > 5)
		document.getElementById("searchGroup").remove(document.getElementById("searchGroup").length-1);
	
	$("#searchGroup option:eq(0)").attr("selected", "selected");
	
	var inSelect = document.getElementById("searchSelect");
	var inSelSize = inSelect.length;
	for (var i = 0; i < inSelSize; i++)
		inSelect.remove(inSelect.length - 1);
	
	var option = document.createElement("option");
	option.text = "모든시설";
	option.value = "";
	option.selected = true;
	inSelect.add(option);
	
    $("#searchMgrnu").val("").attr("placeholder", "검색어를 입력하세요.");
    $("#searchSpt").val("").attr("placeholder", "검색어를 입력하세요.");
    $("#jibun").val("");
    $("#juso").val("");
    $("#addr").val("");
    $("#lat").val("");
	$("#lon").val("");
	$("#laY").val("");
	$("#loX").val("");
	$("#geomXY").val("");
	$("#geomLatLon").val("");
	$("#area").val("");
	insertSelectByMyun();
}

function undeclaredSelect() {
	
	$(".seoul").hide();
	$(".undclared").show();
	$(".examine").hide();
	$("#tab4").hide();
	$("ul.tabs03 li").removeClass("active").css("color", "#555");
	$("ul.tabs03 li:nth-child(2)").addClass("active").css("color", "#fff");
	$("#tab2").fadeIn();
	
	var inSelect = document.getElementById("searchGroup");
	if(inSelect.length == 5) {
		var option = document.createElement("option");
		option.text = "미신고관정";
		option.value = "3";
		option.selected = true;
		inSelect.add(option);
	}
	
	changedSearchGroup();
	insertSelectByMyun();
}

function examineSelect() {
	$(".seoul").hide();
	$(".undclared").hide();
	$(".examine").show();
	$("ul.tabs03 li").removeClass("active").css("color", "#555");
	$("ul.tabs03 li:nth-child(2)").addClass("active").css("color", "#fff");
	$("#tab2").fadeIn();
	
	insertSelectByMyun();
}

function insertSelectByMyun() {
	
	$('#searchEmd, #searchRi, #searchJibun').find('option').each(function() {
		$(this).remove();
	});

	$("#searchEmd, #searchRi, #searchJibun").append("<option value='' selected='selected'>전체</option>");
	
	$.ajax({
		type : "POST",
		url :  CONTEXT_PATH+"/admin/map/ajaxRetrieveListByEmd.do",
		async : false,
		dataType : "json",
		success : function(data, textStatus, XMLHttpRequest) {
			var item = data.data.resultList;
			
			for (var i = 0; i < item.length; i++) {
				$("#searchEmd").append("<option value='" + item[i].myun + "'>" + item[i].myun + "</option>");
			}
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//alert("접속이 지연되고 있습니다.");
		}
	});	

}

function changedSearchEmd() {

	$('#searchRi, #searchJibun').find('option').each(function() {
		$(this).remove();
	});

	$("#searchRi, #searchJibun").append("<option value='' selected='selected'>전체</option>");
	
	var inGroup = document.getElementById("searchEmd");
	var strValue = inGroup.options[inGroup.selectedIndex].value;
	var reqUrl = CONTEXT_PATH+"/admin/map/ajaxRetrieveListByRi.do";
	$.ajax({
		type : "POST",
		url : reqUrl,
		async : false,
		data: { myun : strValue
				} ,
		dataType : "json",
		success : function(data, textStatus, XMLHttpRequest) {
			var item = data.data.resultList;
			
			for (var i = 0; i < item.length; i++) {
				$("#searchRi").append("<option value='" + item[i].legaldongCode + "'>" + item[i].ri + "</option>");
			}
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("접속이 지연되고 있습니다.");
		}
	});
	
}