var map = null;

$(function() {
	
	fn_init_crs();
	fn_init_map();
	fn_move_map();
	
	$("#a_print").click(function() {
		window.print();
	});
});

/**
 * 좌표계 설정
 */
function fn_init_crs() {
	var crsId = "EPSG:5181";
	proj4.defs(crsId, "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs");
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
}

/**
 * 지도 설정
 */
function fn_init_map() {
	
	var layers = opener.layerObj.getLayers();
	map = new ol.Map({
		target : "div_map",
		layers : fn_get_layers(),
		interactions : fn_create_interaction(),
		controls : [],
		view : new ol.View({
			projection : new ol.proj.get("EPSG:3857"),
			maxResolution : 152.87405654296876,
			center : [14161229.221743824, 4574534.667620274],
			zoom : 0,
			maxZoom : 10,
			minZoom : 0
		})
	});
}

/**
 * 레이어 목록
 * @returns {Array}
 */
function fn_get_layers() {
	var layers = [];
	if(opener.layerObj.vworld.base.getVisible()) {
		layers.push(new ol.layer.Tile({ source : new ol.source.vworld(), visible : true }));
	}
	if(opener.layerObj.vworld.satellite.getVisible()) {
		layers.push(new ol.layer.Tile({ source : new ol.source.vworld({ type : "satellite" }), visible : false }));
	}
	if(opener.layerObj.vworld.hybrid.getVisible()) {
		layers.push(new ol.layer.Tile({ source : new ol.source.vworld({ type : "hybrid" }), visible : false }));
	}
	
	var params = $.extend({}, opener.layerObj.getSource().getParams());
//	layers.push(new ol.layer.Image({ source : new ol.source.ImageWMS({
//		url : "proxy/wms.do",
//		params : params,
//		ratio : 1,
//		serverType : "geoserver"
//	})}));
	
	layers.push(new ol.layer.Vector({
		source : opener.highlightObj.source,
		style : opener.highlightObj.getStyle
	}));
	
	return layers;
}

/**
 * 인터렉션 등록
 * @returns {ol.Collection}
 */
function fn_create_interaction() {
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
    
    return interactions;
}

/**
 * 지도 이동
 */
function fn_move_map() {
	map.getView().setCenter(opener.pMap.getMap().getView().getCenter());
	map.getView().setResolution(opener.pMap.getMap().getView().getResolution());
}