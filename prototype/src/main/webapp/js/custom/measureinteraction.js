goog.provide('ol.interaction.Measure');
goog.provide('ol.interaction.MeasureEventType');
goog.provide('ol.interaction.MeasureEvent');

goog.require('ol.interaction.Draw');

// 측정 (좌표, 거리, 면적, 반경(면적))
ol.interaction.Measure = function(opt_options) {
	
	this.index = 0;
	
	// 측정 타입
	this.type = goog.isDef(opt_options.type) ? opt_options.type : "coordinate";
	
	// 도형 타입
	var geomType = "";
	if(opt_options.type == "coordinate") {
		geomType = "Point";
	}
	else if(opt_options.type == "distance") {
		geomType = "LineString";
	}
	else if(opt_options.type == "area") {
		geomType = "Polygon";
	}
	else if(opt_options.type == "radius") {
		geomType = "Circle";
	}
	else {
		geomType = "Point";
	}
	
	// 도형
	this.feature = null;
	
	// 오버레이
	this.overlay = null;
	
	// 레이어 옵션
	var options = {
		source : opt_options.source,
        type : geomType,
        style : new ol.style.Style({
            fill : new ol.style.Fill({
                color : 'rgba(255, 255, 255, 0.2)'
            }),
            stroke : new ol.style.Stroke({
                color : 'rgba(0, 0, 0, 0.5)',
                lineDash : [10, 10],
                width : 2
            }),
            image : new ol.style.Circle({
                radius : 5,
                stroke : new ol.style.Stroke({
                    color : 'rgba(0, 0, 0, 0.7)'
                }),
                fill : new ol.style.Fill({
                    color : 'rgba(255, 255, 255, 0.2)'
                })
            })
        })
	};
	goog.base(this, options);
	
	// 이벤트 등록
	this.on('drawstart', this.drawStart);
	this.on('drawend', this.drawEnd);
	
	/// 측정 중 취소하는 경우 취소 이벤트 호출
	this.on('propertychange', function(evt) {
		if(!this.get("active")) {
			this.cancel();
		}
	});
	
};
goog.inherits(ol.interaction.Measure, ol.interaction.Draw);

ol.interaction.Measure.prototype.cancel = function() {
	if(this.feature) {
		this.feature = null;
	}
	if(this.overlay) {
		this.map_.removeOverlay(this.overlay);
		this.overlay = null;
	}
	this.map_.un('pointermove', this.drawing, this);
};

ol.interaction.Measure.prototype.drawStart = function(evt) {
	this.feature = evt.feature;
	this.overlay = new ol.Overlay({
		element : $("<div class='ol-tooltip ol-tooltip-measure'></div>")[0],
		offset : [0, -15],
		positioning : 'bottom-center'
	});
	
	this.overlay.set("index", ++this.index);
	this.overlay.set("name", "measure");
	this.map_.addOverlay(this.overlay);
	this.map_.on('pointermove', this.drawing, this);
};

ol.interaction.Measure.prototype.drawing = function(evt) {
	if(evt.dragging) {
		return;
	}
	var coordinate = evt.coordinate;
	if(this.feature) {
		var output = null;
		var geom = this.feature.getGeometry();
		if(geom instanceof ol.geom.Polygon) {
			output = this.formatArea(geom.getArea());
		}
		else if(geom instanceof ol.geom.LineString) {
			var geometry = geom.clone().transform(pMap.getMap().getView().getProjection(), ol.proj.get("EPSG:5181"));
			output = this.formatLength(geometry.getLength());
		}
		else if(geom instanceof ol.geom.Circle) {
			output = this.formatLength(geom.getRadius());
		}
		$(this.overlay.getElement()).html(output);
		this.overlay.setPosition(coordinate);
	}
};

ol.interaction.Measure.prototype.drawEnd = function(evt) {
	var value = null;
	if(this.type == "coordinate") {
		var coordinate = evt.feature.getGeometry().getLastCoordinate();
		var val = coordinate[0].toFixed(2) + ", " + coordinate[1].toFixed(2);
		if(this.map_.getView().getProjection() != ol.proj.get("EPSG:4326")) {
			var lonlat = evt.feature.getGeometry().clone().transform(this.map_.getView().getProjection(), ol.proj.get("EPSG:4326")).getCoordinates();
			val += "<br /> " + lonlat[0].toFixed(6) + ", " + lonlat[1].toFixed(6);
			val += "<br /> " + ol.coordinate.degreesToStringHDMS_(lonlat[0], 'EW') + ' ' + ol.coordinate.degreesToStringHDMS_(lonlat[1], 'NS');
		}
		$(this.overlay.getElement()).html(val);
		this.overlay.setPosition(coordinate);
		this.overlay.setOffset([0, -13]);
		value = coordinate[0].toFixed(2) + ", " + coordinate[1].toFixed(2);
	}
	else if(this.type == "distance") {
		var geometry = evt.feature.getGeometry().clone().transform(pMap.getMap().getView().getProjection(), ol.proj.get("EPSG:5181"));
		var len = this.formatLength(geometry.getLength());
		var val = len;
		val += "<a href='#' class='ol-tooltip-measure-close' onclick='measureObj.remove(" + this.index + ")'; >x</a>"
		evt.feature.set("index", this.index);
		$(this.overlay.getElement()).html(val);
		value = len;
	}
	else if(this.type == "area") {
		 value = evt.feature.getGeometry().getArea();
	var 	val=this.formatArea(value);
	val+= "<a href='#' class='ol-tooltip-measure-close' onclick='areaObj.remove(" + this.index + ")'; >x</a>"
		evt.feature.set("index", this.index);
		$(this.overlay.getElement()).html(val);
	
	}
	else if(this.type == "radius") {
		var geometry = this.feature.getGeometry();
		var radius = geometry.getRadius();
		var area = radius * radius * Math.PI;
		
		var overlay = new ol.Overlay({
			element : $("<div class='ol-tooltip ol-tooltip-static'></div>")[0],
			offset : [0, 0],
			positioning : 'bottom-center'
		});
		overlay.set("name", "measure");
		overlay.setPosition(geometry.getCenter());
		this.map_.addOverlay(overlay);
		$(overlay.getElement()).html(this.formatArea(area));
		value = area;
	}
	else {
		this.overlay.setOffset([0, -7]);
	}
	$(this.overlay.getElement()).attr("class", "ol-tooltip ol-tooltip-static");
	
	this.feature = null;
	this.overlay = null;
	this.map_.un('pointermove', this.drawing, this);
};

ol.interaction.Measure.prototype.formatLength = function(length) {
	var output;
    if (length > 1000) {
    	output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
    } else {
    	output = (Math.round(length * 100) / 100) + ' ' + 'm';
    }
    return output;
};

ol.interaction.Measure.prototype.formatArea = function(area) {
	var output;
    if (area > 1000000) {
        output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>';
    } else {
        output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
    }
    return output;
};