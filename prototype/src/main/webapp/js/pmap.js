/**
 * 포천 지도
 */
var pMap = {
		
	/**
	 * ol3 지도
	 */
	map : null,
		
	/**
	 * 초기화
	 */
	init : function() {
		var that = this;
		debugger;
		layerObj.init();
		
		that.initCrs();
		that.initMap();
		historyObj.init();
		measureObj.init();
//		spatialInfo.init();
//		polygonSearch.init();
//		highlightObj.init();
//		
		that.bindEvents();
		that.activeInteractions("drag");
	},
	
	/**
	 * 좌표계 초기화
	 */
	initCrs : function() {
		var that = this;
		var crsId = "EPSG:5181";
		proj4.defs(crsId, "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs");
		proj4.defs("SR-ORG:7165", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"); 
		/* 현재 국토지리원 표준 중부원점(GRS80) EPSG:5186,EPSG:102082 */
		proj4.defs("EPSG:5186", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
		proj4.defs("EPSG:102082", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
		var projection = new ol.proj.Projection({
			code : crsId,
			extent : [90112, 1192896, 1990673, 2761664],
			units : "m",
			axisOrientation : "enu"
		});
		ol.proj.addProjection(projection);
		var projection = new ol.proj.Projection({
			code : "http://www.opengis.net/gml/srs/epsg.xml#5181",
			extent : [90112, 1192896, 1990673, 2761664],
			units : "m",
			axisOrientation : "enu"
		});
		ol.proj.addProjection(projection);
		var projection = new ol.proj.Projection({
			code : "urn:ogc:def:crs:"+crsId,
			extent : [90112, 1192896, 1990673, 2761664],
			units : "m",
			axisOrientation : "enu"
		});
		ol.proj.addProjection(projection);
	},
	
	/**
	 * 지도 초기화
	 */
	initMap : function() {
		var that = this;
		
		that.map = new ol.Map({
			target : "div_map",
			layers : layerObj.getLayers(),
			interactions : that.createInteractions(),
			controls : that.createControls(),
			view : new ol.View({
				projection : new ol.proj.get("EPSG:3857"),
				maxResolution : 152.87405654296876,
				center : [14161229.221743824, 4574534.667620274],
				zoom : 1,
				maxZoom : 9,
				minZoom : 0
			})
		});
	},
//	initMap : function() {
//		var that = this;
//		var mapCrsName = 'EPSG:102082';
//		var mapSrsBaroName = 'SR-ORG:7165';
//		var mapSrsDaumName = 'EPSG:5181';
//		
//		var projectionCRS = ol.proj.get(mapCrsName); //CRS : 원좌표(디비에 구축된 좌표)
//		var projectionBaroSRS = ol.proj.get(mapSrsBaroName); //SRS : 호출해서 불러올 좌표(화면에 보여줄 바로E맵 좌표)
//		var projectionDaumSRS = ol.proj.get(mapSrsDaumName); //SRS : 호출해서 불러올 좌표(화면에 보여줄 로드뷰라인 좌표)
//		//var initProjection = $('.rdoMap:checked',parent.document).val() == 'BARO_BASE' ? projectionBaroSRS:projectionCRS;
//		
//	    //청주좌표
//		var CrsLeftBottomX = 214600; //좌하단 X좌표 사용자 설정
//		var CrsLeftBottomY = 421000; // 좌하단 Y좌표 사용자 설정
//		var CrsRightTopX = 279000;		//우상단 X좌표 사용자 설정
//		var CrsRightTopY = 466000;   	//우상단 Y좌표 사용자 설정
//		var baro_extent = [-200000.0, -28024123.62 , 31824123.62, 4000000.0];
//		//cehyun. L6-L19 기존수치 유지. L20-L21 새한 바로e맵 수치적용.
//		var baro_resolutions = [1954.597389,977.2986945,488.64934725,
//		                        244.324673625,122.1623368125,61.08116840625,
//		                        30.540584203125,15.2702921015625,7.63514605078125,
//		                        3.817573025390625,1.9087865126953125,0.9543932563476563,
//		                        0.47719662817382813,0.23859831408691406,0.119299157,0.0596495785];
//		var CrsExtent = [CrsLeftBottomX,CrsLeftBottomY,CrsRightTopX,CrsRightTopY];
//		var SrsBaroExtent =  ol.proj.transformExtent(CrsExtent,projectionCRS,projectionBaroSRS);
//		var SrsBaroCenter = ol.extent.getCenter(SrsBaroExtent);
//		baro_base_layer = new ol.layer.Tile({
//	         title: "BARO_BASE",
//	         source: new ol.source.TileImage({
//	        	 projection: projectionBaroSRS,
//	        	 tileGrid: new ol.tilegrid.TileGrid({
//	        	        origin: [baro_extent[0], baro_extent[1]],
//	        	        resolutions: baro_resolutions
//	        	 }),
//	        	 tileUrlFunction: function(tileCoord, pixelRatio, projection) {
//	                 if (tileCoord[1] < 0 || tileCoord[2] < 0) { 
//	                     return "";}
//	                 var z = tileCoord[0]+6;
//	                 z = z<10? '0'+z:z;
//	                 var x =tileCoord[1];
//	                 var y =tileCoord[2];
//	                 
//	               //  var url = './proxy.jsp?url='+tmsBaseUrlDefault+'/L' + z+'/'+ x +'/'+ y +'.png'; // 오프라인 청주개발서버 방법
//	                 
//	                 /*
//	                 var url = ngiiTileUrls +'L' + z+'/'+ x +'/'+ y +'.png'; //API 제공하여 api key 사용하여 바로e맵 온라인 연계 방법
//	                 */
//	             	var url ="proxy.do?url=http://emap.ngii.go.kr/proxy/proxyTile.jsp?apikey=RB_wJMX0B0xdYL7NHNCy1Q&URL=http://210.117.198.62:8081/2015_map/korean_map_tile/"+'L' + z+'/'+ x +'/'+ y +'.png';
//	             //	http://emap.ngii.go.kr/proxy/proxyTile.jsp?apikey=RB_wJMX0B0xdYL7NHNCy1Q&URL=http://210.117.198.62:8081/2015_map/korean_map_tile/L06/3/59.png
//	                 return url; 
//	             }
//	         })
//	     });
//		that.map = new ol.Map({
//			target : "div_map",
//			layers : [baro_base_layer],
//			interactions : that.createInteractions(),
//			controls : that.createControls(),
//			view : new ol.View({
//		    	 projection: projectionBaroSRS,
//		    	 center: SrsBaroCenter, 
//		    	 extent: SrsBaroExtent,
//		    	 maxResolution:122.16209227364743,
//		    	 maxZoom:12, //청주
//		    	 minZoom:0,
//		    	 zoom: 1
//				
//			})
//		});
//	},
	
	/**
	 * 기능 초기화
	 * @returns {ol.Collection} 기능 콜렉션
	 */
	createInteractions : function() {
		var interactions = new ol.Collection();
		
		var kinetic = new ol.Kinetic(-0.005, 0.05, 100);

		var doubleClickZoom = new ol.interaction.DoubleClickZoom();
		doubleClickZoom.set("id", "doubleClickZoom");
		doubleClickZoom.set("name", "drag");
		interactions.push(doubleClickZoom);

		var dragPan = new ol.interaction.DragPan({
	      kinetic: kinetic
	    });
		dragPan.set("id", "dragPan");
		dragPan.set("name", "drag");
	    interactions.push(dragPan);

	    var pinchRotate = new ol.interaction.PinchRotate();
	    pinchRotate.set("id", "pinchRotate");
	    pinchRotate.set("name", "drag");
	    interactions.push(pinchRotate);

	    var pinchZoom = new ol.interaction.PinchZoom();
	    pinchZoom.set("id", "pinchZoom");
	    pinchZoom.set("name", "drag");
	    interactions.push(pinchZoom);

	    var keyboardPan = new ol.interaction.KeyboardPan();
	    keyboardPan.set("id", "keyboardPan");
	    keyboardPan.set("name", "drag");
	    interactions.push(keyboardPan);
	    
	    var mouseWheelZoom = new ol.interaction.MouseWheelZoom();
	    mouseWheelZoom.set("id", "mouseWheelZoom");
	    mouseWheelZoom.set("name", "drag");
	    interactions.push(mouseWheelZoom);
	    
	    var dragZoomIn = new ol.interaction.DragZoomIn();
	    dragZoomIn.set("id", "dragZoomIn");
	    dragZoomIn.set("name", "dragZoomIn");
	    interactions.push(dragZoomIn);
	    
	    var dragZoomOut = new ol.interaction.DragZoomOut();
	    dragZoomOut.set("id", "dragZoomOut");
	    dragZoomOut.set("name", "dragZoomOut");
	    interactions.push(dragZoomOut);
	   
	    return interactions;
	},
	
	/**
	 * 축척 표시 컨트롤 생성 및 등록
	 * @returns {Array}
	 */
	createControls : function() {
		var controls = [];
		controls.push(new pmap.control.ScaleLine({ units : 'metric' }));
		return controls;
	},
	
	/**
	 * 축척 표시
	 * @returns {Number}
	 */
	getScale : function() {
		var that = this;
		var resolution = that.getMap().getView().getResolution();
		var units = that.getMap().getView().getProjection().getUnits();
		var inchesPerUnit = {
		    'm': 39.37,
		    'km': 39370
		};
		var dotsPerInch = 96;
		return resolution * inchesPerUnit[units] * dotsPerInch;
	},
	
	/**
	 * 지도 초기화
	 * @returns {ol.Map} ol3 지도 객체
	 */
	getMap : function() {
		var that = this;
		return that.map;
	},
	
	/**
	 * 기능 활성화
	 * @param opt_names 실행할 인터렉션 이름
	 * @param opt_ids 실행할 인터렉션 아이디
	 */
	activeInteractions : function(opt_names, opt_ids) {
		var that = this;
		
		var names = new ol.Collection();
		if(goog.isDef(opt_names)) {
			if(goog.isArray(opt_names)) {
				names = new ol.Collection(opt_names);
			}
			else if(goog.isString(opt_names)) {
				names = new ol.Collection([opt_names]);
			}
		}
		
		var ids = new ol.Collection();
		if(goog.isDef(opt_ids)) {
			if(goog.isArray(opt_ids)) {
				ids = new ol.Collection(opt_ids);
			}
			else if(goog.isString(opt_ids)) {
				ids = new ol.Collection([opt_ids]);
			}
		}
		
		var interactions = that.map.getInteractions();
	    interactions.forEach(function(interaction){
	    	if(interaction.get("active")) interaction.setActive(false);
	    });

	    names.forEach(function(name) {
	    	interactions.forEach(function(interaction) {
	    		if(interaction.get("name") == name) {
	    			if(!interaction.get("active")) interaction.setActive(true);
	    		}
	    	});
	    });
	    ids.forEach(function(id) {
	    	interactions.forEach(function(interaction) {
	    		if(interaction.get("name") == id) {
	    			if(!interaction.get("active")) interaction.setActive(true);
	    		}
	    	});
	    });
	},
	
	/**
	 * 전체로 이동하고 초기화
	 */
	moveAll : function() {
		var that = this;
		var view = that.getMap().getView();
		var center = [14161229.221743824, 4574534.667620274];
		view.setCenter(center);
		view.setZoom(0);
		
		measureObj.clear();
		highlightObj.clear();
		spatialInfo.clear();
		polygonSearch.clear();
	},
	
	/**
	 * 인쇄 팝업 열기
	 */
	openPrint : function() {
		var that = this;
		var url = CONTEXT_PATH + "/admin/map/print.do";
		var pop = window.open(url, "Print", "width=705,height=900");
		pop.focus();
	},
	
	/**
	 * 화면 저장
	 */
	save : function() {
		var that = this;
		that.map.once("postcompose", function(event) {
			var layers = that.map.getLayers();
			var checked = false;
			for(var i=0, len=layers.get("length"); i < len; i++) {
				var source = layers.item(i).getSource();
				if(source instanceof ol.source.XYZ) {
					checked = true;
					break;
				}
			}
			
			var format = null;
			if(checked) {
				format = "image/jpeg";
			}
			else {
				format = "image/png";
			}
			
			if(that.map.tileQueue_.isEmpty()) {
				var canvas = event.context.canvas;
				var data = canvas.toDataURL(format);
				$("#frmDownloadBase64Image input[name=data]").val(data);
				$("#frmDownloadBase64Image").submit();
				that.insertLog();
			}
			else {
				$.messager.alert("지도저장", "지도 로딩 중에는 사용할 수 없습니다.");
			}
		});
		that.map.renderSync();
	},
	
	/**
	 * 이벤트 연결
	 */
	bindEvents : function() {
		var that = this;
		// 축척 위치 바 이동
		that.map.on("moveend", function() {
			var zoom = that.map.getView().getZoom();
			var top = 108 - (zoom*9);
			$(".slider_btn").css("top", top);
		});
		
		// 확대
		$(".mapzoom .zoomin").click(function() {
			var zoom = that.map.getView().getZoom() + 1;
			if(zoom > 9) zoom = 9;
			that.map.getView().setZoom(zoom);
			return false;
		});
		
		// 축소
		$(".mapzoom .zoomout").click(function() {
			var zoom = that.map.getView().getZoom() - 1;
			if(zoom < 0) zoom = 0;
			that.map.getView().setZoom(zoom);
			return false;
		});
	}
		
};

/**
 * 이전 다음 기능 객체
 */
var historyObj = {
	
	/**
	 * 이전 위치 정보 목록
	 */
	prevHistories : [],
	
	/**
	 * 다음 위치 정보 목록
	 */
	nextHistories : [],
	
	/**
	 * 플래그 (이전, 다음으로 이동하는 경우 저장 안함)
	 */
	flag : false, 
	
	/**
	 * 초기화
	 */
	init : function() {
		var that = this;
		pMap.getMap().on("moveend", function() {
			
			var extent = [14147546, 4543716, 14187329, 4606121];
			var center = this.getView().getCenter();
			
			// 포천시 영역내로만 이동하도록 제약
			if(!ol.extent.containsCoordinate(extent, center)) {
				var history = that.prevHistories[that.prevHistories.length-1];
				var view = pMap.getMap().getView();
				that.flag = true;
				view.setCenter(history.center);
				view.setResolution(view.constrainResolution(history.resolution));
			}
			else {
				if(that.flag) {
					that.flag = false;
				}
				else {
					var history = {
						center : center,
						resolution : this.getView().getResolution()
					};
					that.prevHistories.push(history);
					that.nextHistories = [];
				}
			}
		});
	},
	
	/**
	 * 이전
	 */
	prev : function() {
		var that = this;
		
		if(that.prevHistories.length > 1) {
			that.nextHistories.push(that.prevHistories.pop());
			var history = that.prevHistories[that.prevHistories.length-1];
			var view = pMap.getMap().getView();
			that.flag = true;
			view.setCenter(history.center);
			view.setResolution(view.constrainResolution(history.resolution));
		}
		else {
			alert("[이전] 지도화면이 더 이상 없습니다.");
		}
		
	},
	
	/**
	 * 다음
	 */
	next : function() {
		var that = this;
		
		if(that.nextHistories.length > 0) {
			var history = that.nextHistories.pop();
			that.prevHistories.push(history);
			
			var view = pMap.getMap().getView();
			that.flag = true;
			view.setCenter(history.center);
			view.setResolution(view.constrainResolution(history.resolution));
		}
		else {
			alert("[다음] 지도화면이 더 이상 없습니다.");
		}
	}
		
};

/**
 * 측정
 * @type {Object}
 */
var measureObj = {
		
	/**
	 * 벡터 소스
	 * @type {ol.source.Vector}
	 */
	source : null,
	
	/**
	 * 초기화
	 */
	init : function() {
		var that = this;
		that.createLayer();
		that.addInteractions();
	},
	
	/**
	 * 벡터 레이어 생성 및 등록
	 */
	createLayer : function() {
		var that = this;
		
		that.source = new ol.source.Vector();
		var measureVector = new ol.layer.Vector({
			id : "measureVector",
			source : that.source,
			style : new ol.style.Style({
	            fill : new ol.style.Fill({
	                color : 'rgba(255, 255, 255, 0.2)'
	            }),
	            stroke : new ol.style.Stroke({
	                color : '#ffcc33',
	                width : 2
	            }),
	            image : new ol.style.Circle({
	                radius : 7,
	                fill : new ol.style.Fill({
	                    color : '#ffcc33'
	                })
	            })
	        })
		});
		pMap.getMap().addLayer(measureVector);
	},
	
	/**
	 * 인터렉션 생성 및 등록
	 */
	addInteractions : function() {
		var that = this;
		var interaction = new ol.interaction.Measure({ type : "distance", source : that.source });
		interaction.set("id", "distance");
		interaction.set("name", "distance");
    	pMap.getMap().addInteraction(interaction);
	},
	
	/**
	 * 정리
	 */
	clear : function() {
		var that = this;
		var map = pMap.getMap();
		var features = that.source.getFeatures();
		for(var i=features.length-1; i >= 0; i--) {
			that.source.removeFeature(features[i]);
		}
		var overlays = map.getOverlays();
		for(var i=overlays.get("length")-1; i >= 0; i--) {
			var overlay = overlays.item(i);
			map.removeOverlay(overlay);
		}
	},
	
	/**
	 * 결과 삭제
	 * @param index 인덱스
	 */
	remove : function(index) {
		var that = this;
		var map = pMap.getMap();
		var features = that.source.getFeatures();
		for(var i=features.length-1; i >= 0; i--) {
			if(features[i].get("index") == index) {
				that.source.removeFeature(features[i]);
			}
		}
		var overlays = map.getOverlays();
		for(var i=overlays.get("length")-1; i >= 0; i--) {
			var overlay = overlays.item(i);
			if(overlay.get("name") == "measure" && overlay.get("index") == index) {
				map.removeOverlay(overlay);
			}
		}
	}
		
};

/**
 * 레이어 객체
 */
var layerObj = {
	
	/**
	 * 트리 데이터
	 */
	data : [{
	    id : "legend",
	    text : "범례",
	    type : "root",
	    state : "open",
	    children : [
		    {
		    	id : "1",
			    text : "허가관정",
			    type : "group",
			    state : "closed",
			    checked : true,
			    children : [
			        {
			        	id : "sttemnt_prmisn_lvlh",
					    text : "생활용",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "sttemnt_prmisn_indprp",
					    text : "공업용",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "sttemnt_prmisn_farmng",
					    text : "농업용",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "sttemnt_prmisn_etc",
					    text : "기타",
					    type : "geoserver",
					    checked : true
			        }
			    ]
		    },
		    {
		    	id : "2",
			    text : "신고관정",
			    type : "group",
			    state : "closed",
			    checked : true,
			    children : [
			        {
			        	id : "sttemnt_sttemnt_lvlh",
					    text : "생활용",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "sttemnt_sttemnt_indprp",
					    text : "공업용",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "sttemnt_sttemnt_farmng",
					    text : "농업용",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "sttemnt_sttemnt_etc",
					    text : "기타",
					    type : "geoserver",
					    checked : true
			        } 
		        ]
			    
		    },
		    {
		    	id : "3",
			    text : "온천시설",
			    type : "group",
			    state : "closed",
			    checked : true,
			    children : [
			        {
			        	id : "hspr_fclty",
					    text : "온천시설",
					    type : "geoserver",
					    checked : true
			        }
		        ]
		    },
		    {
		    	id : "4",
			    text : "굴착행위",
			    type : "group",
			    state : "closed",
			    checked : true,
			    children : [
			        {
			        	id : "dgg_action",
					    text : "굴착행위",
					    type : "geoserver",
					    checked : true
			        }
		        ]
		    },
		    {
		    	id : "5",
			    text : "공공관정",
			    type : "group",
			    state : "closed",
			    children : [
			        {
			        	id : "small_scale_geom",
					    text : "소규모수도시설",
					    type : "geoserver"
			        },
			        {
			        	id : "mineral_spring_geom",
					    text : "약수터",
					    type : "geoserver"
			        },
			        {
			        	id : "frmng_lgz_well_geom",
					    text : "농업용대형관정",
					    type : "geoserver"
			        }
		        ]
		    },
		    {
		    	id : "6",
			    text : "미신고관정",
			    type : "group",
			    state : "closed",
			    checked : true,
			    children : [
			        {
			        	id : "unsttemnt_lvlh",
					    text : "생활용",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "unsttemnt_indprp",
					    text : "공업용",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "unsttemnt_farmng",
					    text : "농업용",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "unsttemnt_etc",
					    text : "기타",
					    type : "geoserver",
					    checked : true
			        } 
		        ]
		    },
		    {
		    	id : "7",
			    text : "오염원",
			    type : "group",
			    state : "closed",
			    children : [
			        {
			        	id : "use_end_rclmlnd_geom",
					    text : "사용종료매립지",
					    type : "geoserver"
			        },
			        {
			        	id : "stall_fclty_sttus_dta_geom",
					    text : "축사시설",
					    type : "geoserver"
			        },
			        {
			        	id : "fttdc_geom",
					    text : "폐수배출시설",
					    type : "geoserver"
			        },
			        {
			        	id : "spcify_grl_geom",
					    text : "특정토양오염",
					    type : "geoserver"
			        } 
		        ]
		    },
		    {
		    	id : "8",
			    text : "규제사항",
			    type : "group",
			    state : "closed",
			    children : [
			        {
			        	id : "farmng_promte_geom",
					    text : "농업진흥지역도",
					    type : "geoserver"
			        },
			        {
			        	id : "munhwajae_geom",
					    text : "문화재보호도",
					    type : "geoserver"
			        },
			        {
			        	id : "sanji_geom",
					    text : "산지정보도",
					    type : "geoserver"
			        },
			        {
			        	id : "hspr_dstrc_geom",
					    text : "온천지구",
					    type : "geoserver"
			        },
			        {
			        	id : "wtl_pipe_lm",
					    text : "상수도",
					    type : "geoserver"
			        },
			        {
			        	id : "swl_pipe_lm",
					    text : "하수도",
					    type : "geoserver"
			        }
		        ]
		    },
		    {
		    	id : "9",
			    text : "기초조사",
			    type : "group",
			    state : "closed",
			    children : [
			        {
			        	id : "sumun_jijil",
					    text : "수문지질도",
					    type : "geoserver"
			        },
			        {
			        	id : "jijil_gujo_line",
					    text : "지질구조선",
					    type : "geoserver"
			        },
			        {
			        	id : "oyeom_frglty",
					    text : "오염취약성",
					    type : "geoserver"
			        },
			        {
			        	id : "sujil_diagram",
					    text : "수질현황도",
					    type : "geoserver"
			        },
			        {
			        	id : "water_period",
					    text : "수위 갈수기",
					    type : "geoserver"
			        },
			        {
			        	id : "water_normal",
					    text : "수위 평수기",
					    type : "geoserver"
			        },
			        {
			        	id : "water_rain",
					    text : "수위 풍수기",
					    type : "geoserver"
			        }
		        ]
		    },
		    {
		    	id : "10",
			    text : "지적도",
			    type : "group",
			    state : "closed",
			    checked : true,
			    children : [
			        {
			        	id : "pochun_emd_map",
					    text : "읍면동",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_sineup",
					    text : "신읍동",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_eoryong",
					    text : "어룡동",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_jajak",
					    text : "자작동",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_seondan",
					    text : "선단동",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_seorun",
					    text : "설운동",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_donggyo",
					    text : "동교동",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_soheul",
					    text : "소흘읍",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_gunnae",
					    text : "군내면",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_naechon",
					    text : "내촌면",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_gasan",
					    text : "가산면",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_sinbuk",
					    text : "신북면",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_changsu",
					    text : "창수면",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_yeongjung",
					    text : "영중면",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_ildong",
					    text : "일동면",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_idong",
					    text : "이동면",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_yeongbuk",
					    text : "영북면",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_gwanin",
					    text : "관인면",
					    type : "geoserver",
					    checked : true
			        },
			        {
			        	id : "pochun_jijuk_grs80_hwahyeon",
					    text : "화현면",
					    type : "geoserver",
					    checked : true
			        }
		        ]
		    }
	    ]
	},
    {
    	id : "11",
	    text : "브이월드",
	    type : "group",
	    children : [
	        {
	        	id : "hybrid",
			    text : "하이브리드",
			    type : "vworld"
	        },
	        {
	        	id : "satellite",
			    text : "영상",
			    type : "vworld"
	        },
	        {
	        	id : "base",
			    text : "2d",
			    type : "vworld",
			    checked : true
	        }
        ]
    }],
    
    /**
     * 레이어
     */
    layer : null,
		
	/**
	 * 이미지WMS 소스
	 */
	source : null,
	
	/**
	 * 브이월드 레이어
	 */
	vworld : {
		base : null,
		satellite : null,
		hybrid : null
	},
	emap : {
		base : null,
		satellite : null,
		hybrid : null
	},
	
	/**
	 * 초기화
	 */
	init : function() {
		var that = this;
		that.createSource();
		//that.load();
		//that.appendImages();
		that.createTree();
	},
	
	/**
	 * 레이어 목록 반환
	 * @returns {Array}
	 */
	getLayers : function() {
		var that = this;
		debugger;
		var layers = [];
	//	that.emap.base = new ol.layer.Tile({source : new ol.source.emap(),visible:true});
		that.vworld.base = new ol.layer.Tile({ source : new ol.source.vworld(), visible : true });
		that.vworld.satellite = new ol.layer.Tile({ source : new ol.source.vworld({ type : "satellite" }), visible : false });
		that.vworld.hybrid = new ol.layer.Tile({ source : new ol.source.vworld({ type : "hybrid" }), visible : false });
		that.layer = new ol.layer.Image({ source : that.getSource() });
	//	layers.push(that.emap.base);
		layers.push(that.vworld.base);
		layers.push(that.vworld.satellite);
		layers.push(that.vworld.hybrid);
		layers.push(that.layer);
		
		return layers;
	},
	
	/**
	 * 이미지WMS 소스 생성
	 */
	createSource : function() {
		var that = this;
		that.source = new ol.source.ImageWMS({
    		url : "proxy/wms.do",
    		params : {
    			LAYERS : "",
    			FORMAT : "image/png"
    		},
    		ratio : 1,
    		serverType : "geoserver"
    	});
	},
	
	/**
	 * 이미지WMS 소스 반환
	 * @returns {ol.source.ImageWMS}
	 */
	getSource : function() {
		var that = this;
		return that.source;
	},
	
	/**
	 * 스타일 정보 불러오기
	 */
	load : function() {
		var that = this;
		var url = "proxy/wms.do?service=WMS&version=1.1.1&request=GetStyles&layers="+that.layers.join();
		$.get(url).done(function(result) {
			var root = $(result);

			var data = [];
			root.find("sld\\:FeatureTypeStyle, FeatureTypeStyle").each(function() {
				var featureTypeStyle = $(this);
				var id = featureTypeStyle.find("> sld\\:name, > name").text();
				var text = featureTypeStyle.find("> sld\\:title, > title").text();
				if(!text) text = id;
				var img = "<img class='tree_layer_img' src='http://www.mangoe.co.kr:11201/geoserver/pochun/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + id + "' alt='" + text + "'>";
				var tagStr = img;
				tagStr += "<span class='tree_layer_span'>" + text + "</span>";
				var node = {
					id : id,
					text : tagStr,
					type : "geoserver"
				};
				data.push(node);
			});
			
			data.push({ id : "hybrid", text : "브이월드(하이브리드)", type : "vworld" });
			data.push({ id : "satellite", text : "브이월드(영상)", type : "vworld" });
			data.push({ id : "base", text : "브이월드(2d)", type : "vworld", checked : true });
			
			that.data = data;
			that.createTree();
		});
	},
	
	/**
	 * 범례 이미지 추가
	 */
	appendImages : function() {
		var that = this;
		var data = that.data[0].children;
		for(var i=0, len=data.length; i < len; i++) {
			var children = data[i].children;
			for(var j=0, jLen=children.length; j < jLen; j++) {
				var obj = children[j];
				if(obj.type == "geoserver") {
					var id = obj.id;
					var text = obj.text;
					var src = "http://www.mangoe.co.kr:11201/geoserver/pochun/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=17&HEIGHT=17&LAYER=" + id;
					var tagStr = "<span class='tree_layer_img' style='background:url(" + src + ");' alt='" + text + "'></span>";
					tagStr += "<span class='tree_layer_span'>" + text + "</span>";
					obj.text = tagStr;
				}
			}
		}
	},
	
	/**
	 * 트리 생성
	 * @param result
	 */
	createTree : function() {
		var that = this;
		$("#ul_layer_tree").tree({
			data : that.data,
			checkbox : true,
			lines : true,
			onCheck : function(node, checked) {
				if(node.type == "vworld") {
					that.vworld[node.id].setVisible(checked);
				}
				else {
					that.reload();
				} 
			}
		});
		that.reload();
	},
	
	/**
	 * 화면 갱신
	 */
	reload : function() {
		
		var that = this;
		var layers = [];
		var nodes = $("#ul_layer_tree").tree("getChecked");
		for(var i=nodes.length-1; i >=0; i--) {
			if(nodes[i].type == "geoserver") {
				layers.push(nodes[i].id);
			}
		}
		if(layers.length > 0) {
			that.source.updateParams({
				LAYERS : layers.join()
			});
			if(that.layer) {
				that.layer.setVisible(true);
			}
		}
		else {
			if(that.layer) {
				that.layer.setVisible(false);
			}
		}
	}
		
};

/**
 * 하이라이트 객체
 */
var highlightObj = {
		
	/**
	 * 소스
	 */
	source : null,
	
	/**
	 * 인터렉션
	 */
	interaction : null,
	
	/**
	 * 초기화
	 */
	init : function() {
		var that = this;
		
		that.source = new ol.source.Vector();
		var layer = new ol.layer.Vector({
			source : that.source,
			style : that.getStyle
		});
		pMap.getMap().addLayer(layer);
		
		that.interaction = new pmap.interaction.Translate({
			features : new ol.Collection()
		});
		that.interaction.set("id", "translate");
		that.interaction.set("name", "drag");
		pMap.getMap().addInteraction(that.interaction);
		that.interaction.setActive(false);
		
		that.interaction.on("translateend", function(response) { 
			if(response.features.get("length") > 0) {
				that.showCenter(response.features.item(0));
			}
		});
		 
	},
	
	/**
	 * 정리
	 */
	clear : function() {
		var that = this;
		that.source.clear();
	},
	
	/**
	 * 도형 목록 표시
	 * @param features
	 */
	showFeatures : function(features) {
		var that = this;
		that.clear();
		that.source.addFeatures(features);
	},
	
	/**
	 * 도형 표시
	 * @param x
	 * @param y
	 */
	showFeature : function(x, y) {
		var that = this;
		that.clear();
		
		var point = new ol.geom.Point([x, y]);
		var epsg5181 = ol.proj.get("EPSG:5181");
		var epsg3857 = ol.proj.get("EPSG:3857");
		var transformGeom = point.transform(epsg5181, epsg3857);
		
		var feature = new ol.Feature(transformGeom);
		that.source.addFeature(feature);
		
		var center = transformGeom.getCoordinates();
		pMap.getMap().getView().setCenter(center);
		pMap.getMap().getView().setZoom(7);
		
	},
	
	/**
	 * 도형 버퍼 표시
	 * @param lon
	 * @param lat
	 * @param buffer
	 */
	showBufferFeature : function(lon, lat, buffer) {
		var that = this;
		
		that.clear();
		
		var ol3format = new ol.format.GeoJSON();
		var jsts_parser = new jsts.io.GeoJSONParser();
		
		var point = new ol.geom.Point([lon, lat]);
		var epsg4326 = ol.proj.get("EPSG:4326");
		var epsg5181 = ol.proj.get("EPSG:5181");
		var epsg3857 = ol.proj.get("EPSG:3857");
		var transformGeom = point.transform(epsg4326, epsg5181);
		var geojson = ol3format.writeGeometry(transformGeom);
		var jstsGeometry = jsts_parser.read(geojson).buffer(buffer, 50);
		geojson = jsts_parser.write(jstsGeometry);
		var circle = ol3format.readGeometry(geojson);
		var geom = circle.transform(epsg5181, epsg3857);
		var feature = new ol.Feature(geom);
		that.source.addFeature(feature);
		that.showCenter(feature);
		
		var collection = new ol.Collection();
		collection.push(feature);
		that.interaction.setFeatures(collection);

		var extent = geom.getExtent();
		that.moveFeature(extent);
	},
	
	/**
	 * 중심 좌표 표시
	 * @param feature
	 */
	showCenter : function(feature) {
		var that = this;
		var epsg5181 = ol.proj.get("EPSG:5181");
		var epsg3857 = ol.proj.get("EPSG:3857");
		var epsg4326 = ol.proj.get("EPSG:4326");
		var point = new ol.geom.Point(ol.extent.getCenter(feature.getGeometry().getExtent()));
		var transformGeom = point.transform(epsg3857, epsg5181);
		var center = transformGeom.getCoordinates();
		var x = center[0].toFixed(4);
		var y = center[1].toFixed(4);
		var transformGeomLatlon = transformGeom.transform(epsg5181, epsg4326); 
		var centerLatlon = transformGeomLatlon.getCoordinates();
		var lat = centerLatlon[0].toFixed(6);
		var lon = centerLatlon[1].toFixed(6);
		
		var geocoder = new daum.maps.services.Geocoder();
		var latlng = new daum.maps.LatLng(lon, lat);
		geocoder.coord2detailaddr( latlng, function(status, result) {
	        if (status === daum.maps.services.Status.OK) {
	            var detailAddr = result[0].jibunAddress.name;
	            $("#addr").val(detailAddr.replace("경기 포천시 ", ""));
	        }
		});
		
		var centerText = "위도 : " + lat + ", 경도 : " + lon;
		
		feature.setProperties({ center : centerText });
		$("#loX").val(x);
		$("#laY").val(y);
		$("#lat").val(lat);
		$("#lon").val(lon);
	},
	
	/**
	 * 스타일 반환
	 * @param feature
	 * @returns {ol.style.Style}
	 */
	getStyle : function(feature) {
		var properties = feature.getProperties();
		var style = new ol.style.Style({
			fill : new ol.style.Fill({
				color : 'rgba(234, 63, 206, 0.3)'
			}),
			stroke : new ol.style.Stroke({
				color : 'rgba(234, 63, 206, 0.3)',
				width : 5
			}),
			image : new ol.style.Circle({
				radius : 7,
				fill : new ol.style.Fill({
					color : 'rgba(234, 63, 206, 0.3)'
				})
			}),
			text : new ol.style.Text({
				text : properties.center,
				fill : new ol.style.Fill({ color : "#0000ff" }),
				stroke : new ol.style.Stroke({ color : "#ffffff" , width : 3})
			})
		});
		return style;
	},
	
	/**
	 * 위치 이동
	 * @param extent
	 */
	moveFeature : function(extent) {
		pMap.getMap().getView().fit(extent, pMap.getMap().getSize());
	}
	
};

/**
 * 공간 확인 객체
 */
var spatialInfo = {
		
	/**
	 * 검색할 타입 및 표시할 컬럼 정보
	 */
	featureTypes : {
		"sttemnt_prmisn_lvlh" : {
			columns : ["prmisn_sttemnt_no", "cmpnm_or_nm", "li", "lnbr", "emd", "ho", "manage_no", "crdnt_lo_x", "crdnt_la_y"]
		},
		"sttemnt_prmisn_indprp" : {
			columns : ["prmisn_sttemnt_no", "cmpnm_or_nm", "li", "lnbr", "emd", "ho", "manage_no", "crdnt_lo_x", "crdnt_la_y"]
		},
		"sttemnt_prmisn_farmng" : {
			columns : ["prmisn_sttemnt_no", "cmpnm_or_nm", "li", "lnbr", "emd", "ho", "manage_no", "crdnt_lo_x", "crdnt_la_y"]
		},
	    "sttemnt_prmisn_etc" : {
	    	columns : ["prmisn_sttemnt_no", "cmpnm_or_nm", "li", "lnbr", "emd", "ho", "manage_no", "crdnt_lo_x", "crdnt_la_y"]
		}, 
		"sttemnt_sttemnt_lvlh" : {
			columns : ["prmisn_sttemnt_no", "cmpnm_or_nm", "li", "lnbr", "emd", "ho", "manage_no", "crdnt_lo_x", "crdnt_la_y"]
		}, 
		"sttemnt_sttemnt_indprp" : {
			columns : ["prmisn_sttemnt_no", "cmpnm_or_nm", "li", "lnbr", "emd", "ho", "manage_no", "crdnt_lo_x", "crdnt_la_y"]
		},
	    "sttemnt_sttemnt_farmng" : {
	    	columns : ["prmisn_sttemnt_no", "cmpnm_or_nm", "li", "lnbr", "emd", "ho", "manage_no", "crdnt_lo_x", "crdnt_la_y"]
		}, 
		"sttemnt_sttemnt_etc" : {
			columns : ["prmisn_sttemnt_no", "cmpnm_or_nm", "li", "lnbr", "emd", "ho", "manage_no", "crdnt_lo_x", "crdnt_la_y"]
		}, 
		"hspr_fclty" : {
			columns : ["prmisn_sttemnt_no", "cmpnm_or_nm", "li", "lnbr", "emd", "ho", "manage_no", "crdnt_lo_x", "crdnt_la_y"]
		},
	    "dgg_action" : {
	    	columns : ["prmisn_sttemnt_no", "cmpnm_or_nm", "li", "lnbr", "emd", "ho", "manage_no", "crdnt_lo_x", "crdnt_la_y"]
		}, 
		"small_scale_geom" : {
			columns : ["locplc_lc", "locplc_lnbr", "geomseq", "longitude", "latitude"]
		}, 
		"mineral_spring_geom" : {
			columns : ["lc_lnm", "lc_dongli", "geomseq", "longitude", "latitude"]
		},
	    "frmng_lgz_well_geom" : {
	    	columns : ["lc_litong", "lc_lnbr", "geomseq", "lc_emd", "longitude", "latitude"]
		},
		"unsttemnt_lvlh" : {
			columns : ["spt_examin_no", "owner_nm", "fcltylc_emd", "fcltylc_li", "fcltylc_lnbr_ncl_lnm", "geomseq", "fcltylc_lnbr_legacy", "crdnt_lo_x", "crdnt_la_y"]
		},
		"unsttemnt_indprp" : {
			columns : ["spt_examin_no", "owner_nm", "fcltylc_emd", "fcltylc_li", "fcltylc_lnbr_ncl_lnm", "geomseq", "fcltylc_lnbr_legacy", "crdnt_lo_x", "crdnt_la_y"]
		},
	    "unsttemnt_farmng" : {
	    	columns : ["spt_examin_no", "owner_nm", "fcltylc_emd", "fcltylc_li", "fcltylc_lnbr_ncl_lnm", "geomseq", "fcltylc_lnbr_legacy", "crdnt_lo_x", "crdnt_la_y"]
		}, 
		"unsttemnt_etc" : {
			columns : ["spt_examin_no", "owner_nm", "fcltylc_emd", "fcltylc_li", "fcltylc_lnbr_ncl_lnm", "geomseq", "fcltylc_lnbr_legacy", "crdnt_lo_x", "crdnt_la_y"]
		}, 
		"use_end_rclmlnd_geom" : {
			columns : ["locplc", "geomseq", "longitude", "latitude"]
		},
	    "stall_fclty_sttus_dta_geom" : {
	    	columns : ["rghpsn_locplc_lnm", "bplc_nm", "geomseq", "longitude", "latitude"]
		}, 
		"fttdc_geom" : {
			columns : ["bssh_nm", "emd", "lnbr", "geomseq", "longitude", "latitude"]
		}, 
		"spcify_grl_geom" : {
			columns : ["entrps_nm", "lc", "geomseq", "longitude", "latitude"]
		}
	},
	
	/**
	 * 소스
	 */
	source : null,
	
	/**
	 * 인터렉션
	 */
	interaction : null,
	
	/**
	 * 초기화
	 */
	init : function() {
		var that = this;
		that.source = new ol.source.Vector();
		var layer = new ol.layer.Vector({
			source : that.source
		});
		pMap.getMap().addLayer(layer);
		that.interaction = new ol.interaction.Draw({ type : "Point", source : that.source });
		that.interaction.set("id", "info");
		that.interaction.set("name", "info");
		pMap.getMap().addInteraction(that.interaction);
		that.interaction.setActive(false);
		
		that.source.on("addfeature", function(evt) {
			that.search(evt);
		});
	},
	
	/**
	 * 정리
	 */
	clear : function() {
		var that = this;
		that.source.clear();
	},
	
	/**
	 * 검색
	 * @param evt
	 */
	search : function(evt) {
		var that = this;
		
		var featureTypes = [];
		var layers = layerObj.getSource().getParams()["LAYERS"].split(",");
		for(var i=0, len=layers.length; i < len; i++) {
			var layerName = layers[i];
			if(that.featureTypes[layerName]) {
				featureTypes.push(layerName);
			}
		}
		
		var ol3format = new ol.format.GeoJSON();
		var jsts_parser = new jsts.io.GeoJSONParser();
		
		var buffer = pMap.getMap().getView().getResolution() * 5;
		var geom = evt.feature.getGeometry().clone();
		var geojson = ol3format.writeGeometry(geom);
		var jstsGeometry = jsts_parser.read(geojson).buffer(buffer);
		geojson = jsts_parser.write(jstsGeometry);
		var circle = ol3format.readGeometry(geojson);
		
		var featureRequest = new ol.format.WFS().writeGetFeature({
			srsName : "EPSG:3857",
			featureNS : "http://www.mangoe.co.kr:11201/geoserver/pochun/wfs",
			featurePrefix : "pochun",
			featureTypes : featureTypes,
			outputFormat : "application/json",
			filter : ol.format.ogc.filter.intersects("geom", circle, "EPSG:3857")
		});
		
		$.ajax({
	    	url : 'proxy/wfs.do',
	    	type : "POST",
	    	dataType : "text",
	    	data : new XMLSerializer().serializeToString(featureRequest),
	    	contentType : "text/xml"
		}).done(function(response) {
			var features = new ol.format.GeoJSON().readFeatures(JSON.parse(response));
			var resultList = [];
			
			if(features.length > 0) {
				highlightObj.showFeatures(features);
				
				for(var i=0, len=features.length; i < len; i++) {
					var feature = features[i];
					var fid = feature.getId();
					var split = fid.split(".");
					var featureType = split[0];
					var properties = feature.getProperties();
					
					var obj = {};
					obj.dbname = featureType;
					var columns = that.featureTypes[featureType].columns;
					for(var j=0, jLen=columns.length; j < jLen; j++) {
						var column = that.underbarToCamelcase(columns[j]);
						if(column == "geomseq" && !properties[columns[j]]) {
							obj[column] = split[1];
						}
						else {
							obj[column] = properties[columns[j]];
						}
					}
					resultList.push(obj);
				}
			}
			
			fn_info_result(resultList);
		});
		
		that.clear();
	},
	
	/**
	 * 언더바를 Camelcase 형태로 변경
	 * @param value
	 * @returns {String}
	 */
	underbarToCamelcase : function(value) {
		var result = "";
		if(value) {
			value = value.toLowerCase();
			result = value.replace(/[-_]([a-z])/g, function (g) { return g[1].toUpperCase(); });
		}
		return result;
	}
		
};

/**
 * 다각형 검색
 */
var polygonSearch = {
	
	/**
	 * 소스
	 */
	source : null,
	
	/**
	 * 인터렉션
	 */
	interaction : null,
	
	/**
	 * 초기화
	 */
	init : function() {
		var that = this;
		that.source = new ol.source.Vector();
		var layer = new ol.layer.Vector({
			source : that.source
		});
		pMap.getMap().addLayer(layer);
		that.interaction = new ol.interaction.Draw({ type : "Polygon", source : that.source });
		that.interaction.set("id", "polygonSearch");
		that.interaction.set("name", "polygonSearch");
		pMap.getMap().addInteraction(that.interaction);
		that.interaction.setActive(false);
		
		that.source.on("addfeature", function(evt) {
			that.search(evt.feature);
		});
	},
	
	/**
	 * 정리
	 */
	clear : function() {
		var that = this;
		that.source.clear();
	},
	
	/**
	 * 검색
	 * @param feature
	 */
	search : function(feature) {
		var that = this;
		var features = that.source.getFeatures();
		for(var i=features.length-1; i >= 0; i--) {
			if(features[i] != feature) {
				that.source.removeFeature(features[i]);
			}
		}
		
		var geom = feature.getGeometry().clone();
		var epsg3857 = ol.proj.get("EPSG:3857");
		var epsg5181 = ol.proj.get("EPSG:5181");
		var transformGeom = geom.transform(epsg3857, epsg5181);
		var geomLatLon = feature.getGeometry().clone();
		var epsg4326 = ol.proj.get("EPSG:4326");
		var transformGeomLatlon = geomLatLon.transform(epsg3857, epsg4326); 
		fn_polygon_result(transformGeom.getCoordinates()[0], transformGeom.getArea(), transformGeomLatlon.getCoordinates()[0]);
	},
	
	/**
	 * 활성화
	 */
	active : function() {
		pMap.activeInteractions("polygonSearch", "drag");
	}
		
};

/**
 * 공간확인 검색 결과
 * @param resultList
 */
function fn_info_result(resultList) {
	
	$("#mgrnuInfoList").children().remove('li');
	$("#mgrnuInfoList").find("option").remove().end();
	
	for(var i=0; i<resultList.length; i++) {
		
		var result = resultList[i];
		var layer = result.dbname.toUpperCase();
		var url = "";
		var strString = "";
		var crdntLoX = "";
		var crdntLaY = "";

		if (layer == "STTEMNT_PRMISN_LVLH"		 	|| layer == "STTEMNT_PRMISN_INDPRP"
			|| layer == "STTEMNT_PRMISN_FARMNG"		|| layer == "STTEMNT_PRMISN_ETC"
			|| layer == "STTEMNT_STTEMNT_LVLH"		|| layer == "STTEMNT_STTEMNT_INDPRP"
			|| layer == "STTEMNT_STTEMNT_FARMNG" 	|| layer == "STTEMNT_STTEMNT_ETC"
			|| layer == "HSPR_FCLTY" 				|| layer == "DGG_ACTION") {
			var li = "";
			var ho = "";
			if(result.li != "-"){
				li = " " + result.li;
			}
			if(result.ho != "-"){
				ho = "-" + result.ho;
			}
			crdntLoX = result.crdntLoX;
			crdntLaY = result.crdntLaY;
			
			
			url = CONTEXT_PATH+"/admin/map/retrieveByInfo.do?prmisnSttemntNo=" + result.prmisnSttemntNo + "&dbname=SEOUL_DISTANCE";
			strString = result.cmpnmOrNm + " / " + result.emd + li + " " + result.lnbr + ho + " / " + result.manageNo;
		} else {
			if (layer == "UNSTTEMNT_ETC" || layer == "UNSTTEMNT_FARMNG"
				||layer == "UNSTTEMNT_INDPRP" || layer == "UNSTTEMNT_LVLH"){
				var sptNo = result.sptExaminNo;
				var owName = result.ownerNm;
				var fclEmd = result.fcltylcEmd;
				var fclLi = "";
				var fclLnbr = "";
				if(fclLi != null){
					fclLi = " " + result.fcltylcLi;
				}
				if(result.fcltylcLnbrLegacy != null){
					fclLnbr = " " + result.fcltylcLnbrLegacy;
				}
				if(result.fcltylcLnbrNclLnm != null){
					fclLnbr = " " + result.fcltylcLnbrNclLnm;
				}
				crdntLoX = result.crdntLoX;
				crdntLaY = result.crdntLaY;
				
				strString = owName + " / " + fclEmd + fclLi + fclLnbr + " / " + sptNo;
			} else if (layer == "SPCIFY_GRL_GEOM"){
				crdntLoX = result.longitude;
				crdntLaY = result.latitude;
				strString = result.entrpsNm +  " / " + result.lc;
			} else if(layer == "FTTDC_GEOM"){
				crdntLoX = result.longitude;
				crdntLaY = result.latitude;
				strString = result.bsshNm + " / " + result.emd + " " + result.lnbr;
			} else if(layer == "USE_END_RCLMLND_GEOM"){
				crdntLoX = result.longitude;
				crdntLaY = result.latitude;
				strString = "사용종료매립지 / " + result.locplc;
			} else if(layer == "STALL_FCLTY_STTUS_DTA_GEOM"){
				crdntLoX = result.longitude;
				crdntLaY = result.latitude;
				strString = result.bplcNm + " / " + result.rghpsnLocplcLnm.replace("경기도 포천시 ", "");
			} else if (	layer == "SMALL_SCALE_GEOM"){
				crdntLoX = result.longitude;
				crdntLaY = result.latitude;
				strString = "소규모수도시설 / " + result.locplcLc + " " + result.locplcLnbr;
			} else if (	layer == "MINERAL_SPRING_GEOM"){
				crdntLoX = result.longitude;
				crdntLaY = result.latitude;
				strString = "약수터 / " + result.lcLnm + " " + result.lcDongli;
			} else if ( layer == "FRMNG_LGZ_WELL_GEOM"){
				crdntLoX = result.longitude;
				crdntLaY = result.latitude;
				strString = "농업용대형관정 / " + result.lcEmd + " " + result.lcLitong + " " + result.lcLnbr;
			}
			var geomseq = result.geomseq;
			url = CONTEXT_PATH+"/admin/map/retrieveByInfo.do?geomseq=" + geomseq + "&dbname="	+ layer;
		}
		$("#mgrnuInfoList").append("<li class=map_result><a target='_self' href='javascript:createFeature("+ crdntLoX +", " +crdntLaY+");'><div><ul>" + strString	+ "</ul><div></a><button onclick='javascript:createFeature("+ crdntLoX +", " +crdntLaY+");onFeatureSelectInfo(\"" + url + "\");'>관정정보</button></li>");
	}
}

/**
 * 다각형 검색 결과
 * @param coordinates
 */
function fn_polygon_result(coordinates, area, coordinatesLatLon) {
	var temp = (coordinates.join()).split(",");
	var i=1;
	var replaceStr =temp[0];
	for(;i<temp.length;i++){
		if(i%2 == 0){ //홀수
			replaceStr = replaceStr + "," +temp[i];
		}else{ //짝수
			replaceStr = replaceStr + " " +temp[i];
		}
	}
	//alert(replaceStr);
	//alert(coordinatesLatLon.join());
	var output;
    /*if (area > 1000000) {
        output = (Math.round(area / 1000000 * 100) / 100) + ' ' + '㎢';
    } else {
        output = (Math.round(area * 100) / 100) + ' ' + '㎡';
    }
    alert(area + " : " + output);
    */
	output = (Math.round(area * 100) / 100);
    var tempLatLon = (coordinatesLatLon.join()).split(",");
	var j=1;
	var replaceStrLatLon =tempLatLon[0];
	for(;j<tempLatLon.length;j++){
		if(j%2 == 0){ //홀수
			replaceStrLatLon = replaceStrLatLon + "," +tempLatLon[j];
		}else{ //짝수
			replaceStrLatLon = replaceStrLatLon + " " +tempLatLon[j];
		}
	}
	
	$("#geomXY").val(replaceStr);
	$("#area").val(output);
	$("#geomLatLon").val(replaceStrLatLon);
	popupPolygon(3);
}




