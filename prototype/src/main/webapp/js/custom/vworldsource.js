goog.provide('ol.source.vworld');
goog.require('ol.source.XYZ');
ol.source.vworld = function(options) {
	if(!options) options = {};
	var projection = options.projection ? options.projection : "EPSG:3857";
	var urls = this.getUrls(options.type);
	var resolutions = [];
	var resolution = 156543.0339;
	for(var i=0; i < 18; i++) {
		resolutions.push(resolution);
		resolution = resolution / 2;
	}
	options = {
		projection : projection,
		urls : urls,
		tileGrid : new ol.tilegrid.TileGrid({
	        origin: [-20037508.34, -20037508.34],
	        resolutions: resolutions
	  	}),
	  	tileUrlFunction : function (coordinate) {
			var z = coordinate[0];
			var x = coordinate[1];
			var limit = Math.pow(2, z);
			var y = limit - coordinate[2] - 1;
			var url = this.urls[0];
			return url.replace(/\{z\}/g, z).replace(/\{y\}/g, y).replace(/\{x\}/g, x);
		}
	};
	goog.base(this, options);
};
goog.inherits(ol.source.vworld, ol.source.XYZ);

ol.source.vworld.prototype.getUrls = function(type) {
	var urls = null;
	// 영상
	if(type == "satellite") {
		urls = [
			"proxy.do?url=http://xdworld.vworld.kr:8080/2d/Satellite/201301/{z}/{x}/{y}.jpeg"
		];
		
	}
	// 하이브리드
	else if(type == "hybrid") {
		urls = [
			"proxy.do?url=http://xdworld.vworld.kr:8080/2d/Hybrid/201411/{z}/{x}/{y}.png"
		];
	}
	// 기본
	else {
		urls = [
			"proxy.do?url=http://xdworld.vworld.kr:8080/2d/Base/201411/{z}/{x}/{y}.png"
		];
	}
	return urls; 
};
