goog.provide('pmap.control.ScaleLine');

goog.require('ol.control.ScaleLine');

/**
 * ol3 ScaleLine Custom
 */
pmap.control.ScaleLine = function(options) {
	goog.base(this, options);
	// 현재 축척 표시 할 DIV 생성 추가
	$(this.element_).prepend("<div class='pmap-scale-line-top'> 1 : 50000 </div>");
	$(this.element_).removeClass("ol-scale-line");
	$(this.element_).addClass("pmap-scale-line");
};
goog.inherits(pmap.control.ScaleLine, ol.control.ScaleLine);

/**
 * Element 업데이트 - ol3 제공 축척 바 위에 현재 축척 표시 - ex) 1 : 50000
 */
pmap.control.ScaleLine.prototype.updateElement_ = function() {
	var viewState = this.viewState_;

	  if (!viewState) {
	    if (this.renderedVisible_) {
	      this.element_.style.display = 'none';
	      this.renderedVisible_ = false;
	    }
	    return;
	  }

	  var center = viewState.center;
	  var projection = viewState.projection;
	  var metersPerUnit = projection.getMetersPerUnit();
	  var pointResolution =
	      projection.getPointResolution(viewState.resolution, center) *
	      metersPerUnit;

	  var nominalCount = this.minWidth_ * pointResolution;
	  var suffix = '';
	  var units = this.getUnits();
	  if (units == ol.control.ScaleLine.Units.DEGREES) {
	    var metersPerDegree = ol.proj.METERS_PER_UNIT[ol.proj.Units.DEGREES];
	    pointResolution /= metersPerDegree;
	    if (nominalCount < metersPerDegree / 60) {
	      suffix = '\u2033'; // seconds
	      pointResolution *= 3600;
	    } else if (nominalCount < metersPerDegree) {
	      suffix = '\u2032'; // minutes
	      pointResolution *= 60;
	    } else {
	      suffix = '\u00b0'; // degrees
	    }
	  } else if (units == ol.control.ScaleLine.Units.IMPERIAL) {
	    if (nominalCount < 0.9144) {
	      suffix = 'in';
	      pointResolution /= 0.0254;
	    } else if (nominalCount < 1609.344) {
	      suffix = 'ft';
	      pointResolution /= 0.3048;
	    } else {
	      suffix = 'mi';
	      pointResolution /= 1609.344;
	    }
	  } else if (units == ol.control.ScaleLine.Units.NAUTICAL) {
	    pointResolution /= 1852;
	    suffix = 'nm';
	  } else if (units == ol.control.ScaleLine.Units.METRIC) {
	    if (nominalCount < 1) {
	      suffix = 'mm';
	      pointResolution *= 1000;
	    } else if (nominalCount < 1000) {
	      suffix = 'm';
	    } else {
	      suffix = 'km';
	      pointResolution /= 1000;
	    }
	  } else if (units == ol.control.ScaleLine.Units.US) {
	    if (nominalCount < 0.9144) {
	      suffix = 'in';
	      pointResolution *= 39.37;
	    } else if (nominalCount < 1609.344) {
	      suffix = 'ft';
	      pointResolution /= 0.30480061;
	    } else {
	      suffix = 'mi';
	      pointResolution /= 1609.3472;
	    }
	  } else {
	    ol.asserts.assert(false, 33); // Invalid units
	  }

	  var i = 3 * Math.floor(
	      Math.log(this.minWidth_ * pointResolution) / Math.log(10));
	  var count, width;
	  while (true) {
	    count = ol.control.ScaleLine.LEADING_DIGITS[((i % 3) + 3) % 3] *
	        Math.pow(10, Math.floor(i / 3));
	    width = Math.round(count / pointResolution);
	    if (isNaN(width)) {
	      this.element_.style.display = 'none';
	      this.renderedVisible_ = false;
	      return;
	    } else if (width >= this.minWidth_) {
	      break;
	    }
	    ++i;
	  }

	  var html = count + ' ' + suffix;
	  if (this.renderedHTML_ != html) {
	    this.innerElement_.innerHTML = html;
	    this.renderedHTML_ = html;
	  }

	  if (this.renderedWidth_ != width) {
	    this.innerElement_.style.width = width + 'px';
	    this.renderedWidth_ = width;
	  }

	  if (!this.renderedVisible_) {
	    this.element_.style.display = '';
	    this.renderedVisible_ = true;
	  }
  
  //현재 축척 표시 추가
  $(".pmap-scale-line-top").text(" 1 : " + parseInt(pMap.getScale()));

};