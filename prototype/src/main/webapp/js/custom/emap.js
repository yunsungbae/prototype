goog.provide('ol.source.emap');
goog.require('ol.source.XYZ');
ol.source.emap = function(options) {
	
	if(!options) options = {};
	var projection = options.projection ? options.projection : "SR-ORG:7165";
	var urls = this.getUrls(options.type);
	var resolutions = [];
	var resolution = 1954.597389;
	for(var i=0; i < 14; i++) {
		resolutions.push(resolution);
		resolution = resolution / 2;
	}
	options = {
		projection : projection,
		urls : urls,
		tileGrid : new ol.tilegrid.TileGrid({
	        origin: [213543.28, 411329.85, 280390.0, 478176.57],
			//extent :[-200000.0, -3015.4524155292 , 3803015.45241553, 4000000.0],
	        resolutions: resolutions
	  	}),
	  	tileUrlFunction : function (tileCoord) {
	  	   if (tileCoord[1] < 0 || tileCoord[2] < 0) { 
	  	        return "";}
	  	    var z = tileCoord[0]+6;
	  	    z = z<10? '0'+z:z;
	  	    var x =tileCoord[1];
	  	    var y =tileCoord[2];
	  	  var url = this.urls[0];
			return url.replace(/\{z\}/g, z).replace(/\{y\}/g, y).replace(/\{x\}/g, x);
		}
	};
	goog.base(this, options);
};
goog.inherits(ol.source.emap, ol.source.XYZ);


    
ol.source.emap.prototype.getUrls = function(type) {
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

				"http://emap.ngii.go.kr/proxy/proxyTile.jsp?URL=http://210.117.198.62:8081/2015_map/korean_map_tile/L{z}/{x}/{y}.png"
				
		];
	}
	return urls; 
};
