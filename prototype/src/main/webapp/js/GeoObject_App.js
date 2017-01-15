/*
 * Project:  JoyMap Object for Web Javascript
 * Author:   G&Ssoft Co,. Ltd, gskim@joymap.net
 * Copyright(c) G&Ssoft Co,. Ltd. All rights reserved
 * Comment
 * 1. first, add event listner for map and add listner for featurecanvas
 * 2. add init and close function ==> ex) onLoad="initPage()" onunload="closePage()"
 * 3. delete map variable and call geoobject' close function ==> ex) geoobject.close(); delete geoobject;
 * 4. refer the product javascript sample
*/

function geoobject_()
{ 
	
    // enum
    var joyenum =
    {
		//ScreenModeEnum
	    jmSM_NullMode:0,
	    jmSM_SelectMode:1,
	    jmSM_SelectPolylineMode:3,
	    jmSM_SelectPolygonMode:4,
	    jmSM_SelectGeometryMode: 5,
	    jmSM_ZoomInMode: 11,
	    jmSM_ZoomInAreaMode: 12,
	    jmSM_ZoomOutMode: 13,
	    jmSM_ZoomOutAreaMode: 14,
	    jmSM_PanningMode: 15,
	    jmSM_InsertSymbolMode: 21,
	    jmSM_InsertTextMode: 23,
	    jmSM_InsertPolylineMode:24,
	    jmSM_InsertPolygonMode:25,
	    jmSM_InsertCircleMode: 26,
	    jmSM_InsertSplineMode: 27,
	    jmSM_InsertRectangleMode: 28,
	    jmSM_InsertPictureMode: 29,
	    jmSM_DistanceMode: 32,
	    jmSM_AreaMode: 33,
	    jmSM_SingPostMode: 34,
	    jmSM_EditVertexMoveMode: 41,
	    jmSM_EditVertexDeleteMode: 42,
	    jmSM_EditVertexAddMode: 43,
	    jmSM_EditMoveMode: 44,
	    jmSM_EditDeleteMode: 45,
	    jmSM_EditCopyMode: 46,
	    jmSM_EditRotateMode: 47,
	    jmSM_EditExtendMode: 48,
	    jmSM_EditTrimMode: 49,
	    jmSM_EditExtTrimMode: 50,
	    jmSM_EditScaleMode: 51,
	    jmSM_EditBreakMode: 52,
		jmSM_EditBreakGeometryMode: 53,
		jmSM_EditDeleteRingMode: 54,
		jmSM_VolumnMode: 55,
		jmSM_TerrainProfileMode:56,
		jmSM_SightMode: 57,
		jmSM_End: 58,
	    jmSM_AnnotationMove: 101,
	    jmSM_AutoPanningMode: 102,
	    jmSM_AnnotationRotate: 103,
	    jmSM_AnnotationEndMove: 104,

		//SpatialOperatorEnum
	    jmSO_Intersects: 0,
	    jmSO_Equals: 1,
	    jmSO_Disjoint: 2,
	    jmSO_Touches: 3,
	    jmSO_Crosses: 4,
	    jmSO_Within: 5,
	    jmSO_Contains: 6,
	    jmSO_Overlaps: 7,
		
		//SnapModeEnum
	    jmNM_NullPoint: 0x0000,
	    jmNM_EndPoint: 0x0001,
	    jmNM_MidPoint: 0x0002,
	    jmNM_NearestPoint: 0x0004,
	    jmNM_IntersactPoint: 0x0008,
	    jmNM_PerpendicularPoint: 0x0010,
	    jmNM_CenterPoint: 0x0020,
	    jmNM_ScalePoint: 0x0040,
	    jmNM_RotatePoint: 0x0080,
	    jmNM_GPSPoint: 0x01000,
	    jmNM_Geometry: 0x000f,

	    jmTM_None: 0,
	    jmTM_Style: 1,
	    jmTM_Chart: 2,
	    jmTM_UserDefine: 3,

	    jmLC_TOP: 0,
	    jmLC_UP: 1,
	    jmLC_DOWN: 2,
	    jmLC_BOTTOM: 3,

	    jmCL_Direction: 0x01,
	    jmCL_ScaleBar: 0x02,
	    jmCL_GPSCoordText: 0x04,
	    jmCL_GPSSymbol: 0x08,
	    jmCL_ZoomLevel: 0x10,
	    jmCL_CenterPos: 0x20,
	    jmCL_Legend: 0x40,
		
		//MapMoveEnum
	    jmMM_ManuMove: 0,
	    jmMM_AutoMove: 1,
		
		//MapRotateEnum
	    jmME_FixRotate: 0,
	    jmME_AutoRotate: 1,

		//TapPositionEnum
	    jmTP_North: 0,
	    jmTP_South: 1, 
	    jmTP_West: 2, 
	    jmTP_East: 3,

		//DockAreaEnum
	    jmDA_No: 0,
	    jmDA_Left: 0x1,
	    jmDA_Right: 0x2,
	    jmDA_Top: 0x4,
	    jmDA_Bottom: 0x8,
	    jmDA_All: 0xf,

	    jmDA_Closable: 0x01,
	    jmDA_Movable: 0x02,
	    jmDA_Floatable: 0x04,
	    jmDA_VerticalTitleBar: 0x08,
	    jmDA_FeatureMask: 0x0f,
	    jmDA_AllFeature: 0x01 | 0x02 | 0x04,
	    jmDA_NoFeatures: 0x00,
	    jmDA_Reserved: 0xff,
		
		//SystemResourceEnum
	    jmRS_Logo: 0x0001,
	    jmRS_Location: 0x0002,
	    jmRS_Compass: 0x0004,
	    jmRS_ScaleBar: 0x0008,
		jmRS_Scale: 0x0080,
	    jmRS_IndexMapWidget: 0x0010,
	    jmRS_MapCtrlWidget: 0x0020,
	    jmRS_ZoomLevelWidget: 0x0040,
	    jmRS_MotionBtn: 0x0100,
	    jmRS_LocationBtn: 0x0200,

		//ChartTypeEnum
	    jmCT_LINE: 0,
	    jmCT_AREA: 1,
	    jmCT_BAR: 2,
	    jmCT_FLOATINGBAR: 3,
	    jmCT_HILOCLOSE: 4,
	    jmCT_COMBO_LINE_BAR: 5,
	    jmCT_COMBO_HLC_BAR: 6,
	    jmCT_COMBO_LINE_AREA: 7,
	    jmCT_COMBO_LINE_LINE: 8,
	    jmCT_COMBO_HLC_AREA: 9,
	    jmCT_3DHILOCLOSE: 10,
	    jmCT_3DCOMBO_LINE_BAR: 11,
	    jmCT_3DCOMBO_LINE_AREA: 12,
	    jmCT_3DCOMBO_LINE_LINE: 13,
	    jmCT_3DCOMBO_HLC_BAR: 14,
	    jmCT_3DCOMBO_HLC_AREA: 15,
	    jmCT_3DBAR: 16,
	    jmCT_3DFLOATINGBAR: 17,
	    jmCT_3DAREA: 18,
	    jmCT_3DLINE: 19,
	    jmCT_3DPIE: 20,
	    jmCT_2DPIE: 21,

		//ToolBarTypeEnum
	    jmTB_MapDiz: 0,
	    jmTB_MapNav: 1,
	    jmTB_MapSelect: 2,
	    jmTB_MapMeasure: 3,
	    jmTB_Edit: 4,
	    jmTB_EditVertex: 5,
	    jmTB_View: 6,
	    jmTB_LayerAdd: 7,
	    jmTB_VectorGeomProcess: 8,
	    jmTB_VectorProcess: 9,
		
		//LineCapEnum
		jmLC_Flat: 0,
		jmLC_Square: 1,
		jmLC_Round: 2,
		jmLC_Triangle: 3,
		jmLC_NoAnchor: 0x10,
		jmLC_SquareAnchor: 0x11,
		jmLC_RoundAnchor: 0x12,
		jmLC_DiamondAnchor:0x13,
		jmLC_ArrowAnchor: 0x14,
		jmLC_ArrowAnchor1: 0x15,
		jmLC_ArrowAnchor2: 0x16,
		jmLC_Custom: 0xff,
		jmLC_AnchorMask: 0xf0,
		
		//LineJoinEnum 
		jmLJ_Round: 1,
		jmLJ_Mitre: 2,
		jmLJ_Bevel: 3,
		
		//PointLocationEnum
		jmPL_StartNode: 0x01,
		jmPL_EndNode: 0x02,
		jmPL_Node: 0x03,
		jmPL_Vertex: 0x04,
		jmPL_All: 0x07,
		
		//FileFormatEnum 
		jmFF_IMG_BMP: 1,
		jmFF_IMG_JPG: 3,
		jmFF_IMG_PNG: 4,
		
		//TopoSyncMoveEnum 
		jmTS_None: 0x000,
		jmTS_Symbol2Symbol: 0x001,
		jmTS_Symbol2Node: 0x002,
		jmTS_Symbol2Vertex: 0x004,
		jmTS_Node2Symbol: 0x008,
		jmTS_Node2Node: 0x010,
		jmTS_Node2Vertex: 0x020,
		jmTS_Vertex2Symbol: 0x040,
		jmTS_Vertex2Node: 0x080,
		jmTS_Vertex2Vertex: 0x100,
		jmTS_ComplexSymbolVertexStand: 0x1b7,
		
		//GeometryTypeEnum
		jmGT_Unknown: 0,
		jmGT_Point: 1,
		jmGT_LineString: 2,
		jmGT_Polygon: 3,
		jmGT_MultiPoint: 4,
		jmGT_MultiLineString: 5,
		jmGT_MultiPolygon: 6,
		jmGT_GeometryCollection: 7,
		jmGT_None: 100,
		jmGT_LinearRing: 101,
		jmGT_Point25D: 0x80000001,
		jmGT_LineString25D: 0x80000002,
		jmGT_Polygon25D: 0x80000003,
		jmGT_MultiPoint25D: 0x80000004,
		jmGT_MultiLineString25D: 0x80000005,
		jmGT_MultiPolygon25D: 0x80000006,
		jmGT_GeometryCollection25D: 0x80000007,
		
		//DockFeatureEnum;
		jmDF_NoFeatures: 0x00,	
		jmDF_Closable: 0x01,	
		jmDF_Movable: 0x02,	
		jmDF_Floatable: 0x04,	
		jmDF_VerticalTitleBar: 0x08,	
		jmDF_FeatureMask: 0x0f,	
		jmDF_AllFeature: 0x07,	
		jmDF_Reserved: 0xff,

		//CanvasTypeEnum;
		jmCT_NULL: 0,
		jmCT_2D: 1,
		jmCT_GRAPHIC: 2,
		jmCT_3D: 3,
		jmCT_EARTH: 4,
		jmCT_AR:5,
		
		//SymbolizerTypeEnum
		jmSL_Default: 0,
		jmSL_Line: 1,
		jmSL_Polygon: 2,
		jmSL_Point: 3,
		jmSL_Label : 4,
		
		//SensorTypeEnum
		jmSR_Location: 0,
		jmSR_Motion: 1,
		jmSR_Video: 2,
		
		//SymbolizerTypeEnum
		jmSL_Default: 0,
		jmSL_Line: 1,
		jmSL_Polygon: 2,
		jmSL_Point: 3,
		jmSL_Label : 4,
		
		//LabelPositionTypeEnum
		jmLP_GeoMBRCenter: 0,
		jmLP_GeoMapInterMBRCenter: 1,
		jmLP_GeoFirstCenter: 2,
		jmLP_GeoFirstPointOnSurface: 3,
		
		//SpatialOperatorEnum
		jmSO_Intersects: 0,
		jmSO_Equals: 1,
		jmSO_Disjoint: 2,
		jmSO_Touches: 3,
		jmSO_Crosses: 4,
		jmSO_Within: 5,
		jmSO_Contains: 6,
		jmSO_Overlaps: 7,
		
		//MouseButtonTypeEnum
		jmMB_NoButton: 0,
		jmMB_LeftButton: 1,
		jmMB_RightButton: 2,
		jmMB_MidButton: 4, 
		jmMB_WheelButton: 8,
		
		//SystemKeyEnum
		jmSK_NONE: 0,    //corresponds to android's UNKNOWN
		jmSK_LeftSoftKey: 1,
		jmSK_RightSoftKey: 2,
		jmSK_Home: 3,    // the home key - added to match android
		jmSK_Back: 4,    // CLR
		jmSK_Send: 5,    // the green (talk) key
		jmSK_End: 6,     // the red key
		jmSK_0: 7,
		jmSK_1: 8,
		jmSK_2: 9,
		jmSK_3: 10,
		jmSK_4: 11,
		jmSK_5: 12,
		jmSK_6: 13,
		jmSK_7: 14,
		jmSK_8: 15,
		jmSK_9: 16,
		jmSK_Star: 17,    // the * key
		jmSK_Hash: 18,    // the # key
		jmSK_Escape: 19,  //	
		jmSK_Delete: 20,
		jmSK_Shift: 21,
		jmSK_Control: 22,
		jmSK_Up: 23,
		jmSK_Down: 24,
		jmSK_Left: 25,
		jmSK_Right: 26,
		jmSK_Enter: 27,      // the center key
		jmSK_VolUp: 28,   // volume up - match android
		jmSK_VolDown: 29, // volume down - same
		jmSK_Power: 30,   // power button - same
		jmSK_Camera: 31,  // camera         - same
		jmSK_KeyCount: 32
	};
 
    HashMap = function(){  
        this.map = new Array();
    };  
    HashMap.prototype = {  
        put : function(key, value){  
            this.map[key] = value;
        },  
        get : function(key){  
            return this.map[key];
        },  
        getAll : function(){  
            return this.map;
        },  
        remove : function(key){
            delete this.map[key];
        },
        clear : function(){  
            this.map = new Array();
        },  
        getKeys : function(){  
            var keys = new Array();  
            for(i in this.map){  
                keys.push(i);
            }  
            return keys;
        }
    };
  
	// JSON 
	if (typeof JSON !== 'object') {
		JSON = {};
	}
	(function () {
	    'use strict';
	    function f(n) {
	        return n < 10 ? '0' + n : n;
	    }

	    if (typeof Date.prototype.toJSON !== 'function') {
	        Date.prototype.toJSON = function () {
	            return isFinite(this.valueOf())
	                ? this.getUTCFullYear()     + '-' +
	                    f(this.getUTCMonth() + 1) + '-' +
	                    f(this.getUTCDate())      + 'T' +
	                    f(this.getUTCHours())     + ':' +
	                    f(this.getUTCMinutes())   + ':' +
	                    f(this.getUTCSeconds())   + 'Z'
	                : null;
	        };
	        String.prototype.toJSON      =
	            Number.prototype.toJSON  =
	            Boolean.prototype.toJSON = function () {
	                return this.valueOf();
	            };
	    }
		
	    var cx, escapable, gap, indent, meta, rep;
	    function quote(string) {
	        escapable.lastIndex = 0;
	        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
	            var c = meta[a];
	            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	        }) + '"' : '"' + string + '"';
	    }

	    function str(key, holder) {
	        var i, k, v, length, mind = gap, partial, value = holder[key];
	        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
	            value = value.toJSON(key);
	        }
			
	        if (typeof rep === 'function') {
	            value = rep.call(holder, key, value);
	        }

	        switch (typeof value) {
	        case 'string':
	            return quote(value);
	        case 'number':
	            return isFinite(value) ? String(value) : 'null';
	        case 'boolean':
	        case 'null':
	            return String(value);
	        case 'object':
	            if (!value)
	                return 'null';
	            gap += indent;
	            partial = [];
	            if (Object.prototype.toString.apply(value) === '[object Array]') {
	                length = value.length;
	                for (i = 0; i < length; i += 1) {
	                    partial[i] = str(i, value) || 'null';
	                }
	                v = partial.length === 0
	                    ? '[]'
	                    : gap
	                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
	                    : '[' + partial.join(',') + ']';
	                gap = mind;
	                return v;
	            }

	            if (rep && typeof rep === 'object') {
	                length = rep.length;
	                for (i = 0; i < length; i += 1) {
	                    if (typeof rep[i] === 'string') {
	                        k = rep[i];
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            } else {
	                for (k in value) {
	                    if (Object.prototype.hasOwnProperty.call(value, k)) {
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            }
	            v = partial.length === 0
	                ? '{}'
	                : gap
	                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
	                : '{' + partial.join(',') + '}';
	            gap = mind;
	            return v;
	        }
	    }

	    if (typeof JSON.stringify !== 'function') {
	        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	        meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\' };
	        JSON.stringify = function (value, replacer, space) {
	            var i;
	            gap = '';
	            indent = '';
	            if (typeof space === 'number') {
	                for (i = 0; i < space; i += 1) {
	                    indent += ' ';
	                }
	            } else if (typeof space === 'string') {
	                indent = space;
	            }
	            rep = replacer;
	            if (replacer && typeof replacer !== 'function' &&
	                    (typeof replacer !== 'object' ||
	                    typeof replacer.length !== 'number')) {
	                throw new Error('JSON.stringify');
	            }
	            return str('', {'': value});
	        };
	    }
	    if (typeof JSON.parse !== 'function') {
	        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	        JSON.parse = function (text, reviver) {
	            var j;
	            function walk(holder, key) {
	                var k, v, value = holder[key];
	                if (value && typeof value === 'object') {
	                    for (k in value) {
	                        if (Object.prototype.hasOwnProperty.call(value, k)) {
	                            v = walk(value, k);
	                            if (v !== undefined) {
	                                value[k] = v;
	                            } else {
	                                delete value[k];
	                            }
	                        }
	                    }
	                }
	                return reviver.call(holder, key, value);
	            }
	            text = String(text);
	            cx.lastIndex = 0;
	            if (cx.test(text)) {
	                text = text.replace(cx, function (a) {
	                    return '\\u' +
	                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	                });
	            }
	            if (/^[\],:{}\s]*$/
	                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
	                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
	                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
	                j = eval('(' + text + ')');
	                return typeof reviver === 'function'
	                    ? walk({'': j}, '')
	                    : j;
	            }
	            throw new SyntaxError('JSON.parse');
	        };
	    }
	}());

    // member variable
    var self = this;
    var mbIE = false;
    var mIEVersion;
    var mDspCommonFactory;
    var mDspDisplayFactory;
    var mDspMap;
    var mMapType;
    var mDspFeatureCanvas;
    var mDspApp;
    var mDspLwg;
    var mDspSensor;
    var mVer = "1,6,1501,5001";
    var mKeyMapEvt = new HashMap();
    var mKeyFtCvsEvt = new HashMap();
    var mKeySensorEvt = new HashMap();

    // member function
    self.getDisplayFactory = function()
    {
        return mDspDisplayFactory;
    }
  
    self.getCommonFactory = function()
    {
        return mDspCommonFactory;
    }

    self.getApplication = function() 
	{
        return mDspApp;
	}
	
	self.getLayerTreeWidget = function() 
	{
        return mDspLwg;
	}
	
    self.getMap = function() 
    {
        return mDspMap;
    }
	
    self.getFeatureCanvas = function() 
    {
        return mDspFeatureCanvas;
    }
	
	self.getLocSensor = function()
	{
		return mDspSensor;
	}
	
    self.getIsIE = function()
    {
	    return mbIE;
    }

    self.getIEVersion = function()
    {
        return mIEVersion;
    }
	
	self.getIsSupportModalDialog = function()
	{
  		if(mbIE == true && mIEVersion < 9) return true;
  		return false;
	}
	
    self.tr = function(name)
    {
	    if(mLang == 'ko' || mLang == 'ko-KR')
	    {
		    if(name == 'Layer') return '레이어';
		    if(name == 'Attribute') return '속성';
		    if(name == 'Index') return '인덱스';
	    }
	    else
	    {
		    return name;
	    }
    }
	
    self.getVersion = function()
    {
        return mVer;
    }

    self.getLanguage = function()
    {
	    return mLang;
    }
	
    self.getEnum = function()
    {
        return joyenum;
    }
	
    // init application widget
    self.initApplication = function(idAppdiv, maptype, isCreateDefWidget, isLayerWidgetToolbar) 
    {
        if (navigator.userLanguage) // Explorer
            mLang = navigator.userLanguage;
        else if (navigator.language) // FF
            mLang = navigator.language;
        else
            mLang = "en";
    	
	    // create object
	    var strHTML;
	    var idObject = idAppdiv + '_mapobject';
	    mMapType = maptype;
	    if((navigator.userAgent.search("MSIE") >= 0) || (!(window.ActiveXObject) && "ActiveXObject" in window))
	    {
		    if(maptype == 'map2d')
        strHTML = '<object id="' + idObject + '" classid="CLSID:187B9673-4A05-49BF-B0A5-6359D5100901" width="100%" height="100%"><param name="packagename" value=' + location.href + '></object>';
        else if(maptype == 'mapearth')
		    strHTML = '<object id="' + idObject + '" classid="CLSID:187B9673-4A05-49BF-B0A5-6359D5100904" width="100%" height="100%"><param name="packagename" value=' + location.href + '></object>';
		    else if(maptype == 'mapar')
		    strHTML = '<object id="' + idObject + '" classid="CLSID:187B9673-4A05-49BF-B0A5-6359D5100907" width="100%" height="100%"><param name="packagename" value=' + location.href + '></object>';
		    else // application
			    strHTML = '<object id="' + idObject + '" classid="CLSID:187B9673-4A05-49BF-B0A5-6359D5100951" width="100%" height="100%"><param name="packagename" value=' + location.href + '></object>';
		    mbIE = true;
            if(navigator.appVersion.indexOf('Trident/5.0') > -1)
            	mIEVersion = 9;
			else if(navigator.appVersion.indexOf('Trident/6.0') > -1)
				mIEVersion = 10;
			else if(navigator.appVersion.indexOf('Trident/7.0') > -1)
				mIEVersion = 11;
			else
				mIEVersion = 8;
	    }
	    else
	    {
		    if(maptype == 'map2d')
		    strHTML = '<object id="' + idObject + '" type="application/joymap-map2d" width="100%" height="100%" wmode="transparent" packagename=' + location.href + '/>';
		    else if(maptype == 'mapearth')
		    strHTML = '<object id="' + idObject + '" type="application/joymap-mapearth" width="100%" height="100%" packagename=' + location.href + '/>';
		    else if(maptype == 'mapar')
		    strHTML = '<object id="' + idObject + '" type="application/joymap-mapar" width="100%" height="100%" packagename=' + location.href + '/>';
		    else
			    strHTML = '<object id="' + idObject + '" type="application/joymap-application" width="100%" height="100%" packagename=' + location.href + '/>';
	    }
	    document.getElementById(idAppdiv).innerHTML = strHTML;
		
		var mapobject = document.getElementById(idObject);
	    // init app
	    if(mbIE == true)
	    {
		    if(maptype == 'app')
		    {
			    mDspApp = mapobject.GetApplication();
	    	    mDspFeatureCanvas = mDspApp.GetFeatureCanvas();
	    	    mDspCommonFactory = mDspApp.GetCommonFactory();			  
		    }
		    else
			{
				mDspFeatureCanvas = mapobject.GetFeatureCanvas();
				if(maptype == 'map2d')
					mDspMap = mapobject.GetMap2D();
				else if(maptype == 'mapearth')
					mDspMap = mapobject.GetMapEarth();
				else if(maptype == 'mapar')
					mDspMap = mapobject.GetMapAR();
				mDspCommonFactory = mDspMap.GetCommonFactory();
		    }
	    }
	    else
	    {
		    if(maptype == 'app')
		    {
				mDspApp = mapobject;
				mDspFeatureCanvas = mDspApp.GetFeatureCanvas();
				mDspCommonFactory = mDspApp.GetCommonFactory();
		    }
		    else
		    {
				mDspMap = mapobject;
				mDspFeatureCanvas = null;
				mDspCommonFactory = mDspMap.GetCommonFactory();
		    }
	    }
		mDspDisplayFactory = mDspCommonFactory.GetDisplayFactory();
        if(mDspMap != null && mDspFeatureCanvas == null)
        {
			mDspFeatureCanvas = mDspDisplayFactory.CreateFeatureCanvas();
			mDspMap.SetFeatureCanvas(mDspFeatureCanvas); 
        }
    
        if(isCreateDefWidget == false) // except create default widget
			return;
	
        if(mDspApp != null)
        {
            // init Default 2D Widget
  	        var dockWidget = mDspDisplayFactory.CreateWidget(0, "DockWidget");
  	        mDspMap = dockWidget.SetCanvas("2D", "map2d");
  	        mDspApp.AddWidget(dockWidget);
  
  	        // init DockWidget in LayerTreeWidget
  	        var dockWidget = mDspDisplayFactory.CreateWidget(0, "DockWidget");
	        mDspLwg = mDspDisplayFactory.CreateWidget(0, "LayerTreeWidget");
	        dockWidget.SetWidget("범례", mDspLwg);
	        //dockWidget.SetWidget(self.tr("Layer"), mDspLwg);
	        dockWidget.SetFeatures(joyenum.jmDF_NoFeatures);
	        mDspApp.AddDockWidget(joyenum.jmDA_Left, dockWidget);
			mDspLwg.SetDisplayContextMenu(true);
			mDspLwg.SetDisplayToolBar(true);
//	        mDspLwg.SetDisplayToolBar(isLayerWidgetToolbar);
  
  	        // init DockWidget in FeatureAttributeTreeWidget
//  	        var attrDockWidget = mDspDisplayFactory.CreateWidget(0, "DockWidget");
//  	        attrDockWidget.SetWidget(self.tr("Attribute"), mDspDisplayFactory.CreateWidget(0, "FeatureAttributeTreeWidget"));
//  	        mDspApp.AddDockWidget(joyenum.jmDA_Left, attrDockWidget);
//  	        mDspApp.TabifyDockWidget(dockWidget, attrDockWidget);
  		
  	        // init DockWidget in IndexMapWidget
//  	        var dockWidget = mDspDisplayFactory.CreateWidget(0, "DockWidget");
//  	        dockWidget.SetWidget(self.tr("Index"), mDspDisplayFactory.CreateWidget(0, "IndexMapWidget"));
//  	        mDspApp.AddDockWidget(joyenum.jmDA_Left, dockWidget);
        }
        else
  	        mDspMap.Invalidate();

        mDspMap.SetScreenMode(joyenum.jmSM_PanningMode);
    }

	// events
	self.onEvent = function(type, evtname, v1, v2, v3, v4, v5)
	{
	    var func;
	    if(type == 'map')
	        func = mKeyMapEvt.get(evtname);
        else if (type == 'sensor')
            func = mKeySensorEvt.get(evtname);
        else
	        func = mKeyFtCvsEvt.get(evtname);
	    
	    if(func != null)
	        func(v1, v2, v3, v4, v5);
	}
	
    self.addMapEventListener = function(eventName, func)
    {
        if(mDspMap == null) return;
        mKeyMapEvt.put(eventName, func);
	    if(mbIE == true)
            eval("function mDspMap::" + eventName + "(v1, v2, v3, v4, v5) { return self.onEvent('map','" + eventName + "', v1, v2, v3, v4, v5); }");
	    else
	    {
	        if(mMapType == 'app')
	            eval("mDspApp.Map_" + eventName + " = function(v1, v2, v3, v4, v5) { return self.onEvent('map','" + eventName + "', v1, v2, v3, v4, v5); }");
	        else
	            eval("mDspMap." + eventName + " = function(v1, v2, v3, v4, v5) { return self.onEvent('map','" + eventName + "', v1, v2, v3, v4, v5); }");
	    }
    }
  
    self.removeMapEventListener = function(eventName)
    {
        if(mDspMap == null) return;
        mKeyMapEvt.remove(eventName);
	    if(mbIE == true)
            eval("function mDspMap::" + eventName + "() {}");
	    else
	    {
	        if(mMapType == 'app')
	            eval("mDspApp.Map_" + eventName + " = null");
	        else
	            eval("mDspMap." + eventName + " = null");
	    }
    }
   
    self.addFeatureCanvasEventListener = function(eventName, func)
    {
        if(mDspFeatureCanvas == null) return;
        mKeyFtCvsEvt.put(eventName, func);
 	    if(mbIE == true)
            eval("function mDspFeatureCanvas::" + eventName + "(v1, v2, v3, v4, v5) { return self.onEvent('featurecanvas','" + eventName + "', v1, v2, v3, v4, v5); }");
        else if(mDspFeatureCanvas != null)
        {
            if(mMapType == 'app')
	            eval("mDspApp.FeatureCanvas_" + eventName + " = function(v1, v2, v3, v4, v5) { return self.onEvent('featurecanvas','" + eventName + "', v1, v2, v3, v4, v5); }");
	        else
                eval("mDspMap.FeatureCanvas_" + eventName + " = function(v1, v2, v3, v4, v5) { return self.onEvent('featurecanvas','" + eventName + "', v1, v2, v3, v4, v5); }");
        }
    }

    self.removeFeatureCanvasEventListener = function(eventName)
    {
        if(mDspFeatureCanvas == null) return;
            mKeyFtCvsEvt.remove(eventName);
        if(mbIE == true)
            eval("function mDspFeatureCanvas::" + eventName + "() {}");
        else if(mDspFeatureCanvas != null)
        {
            if(mMapType == 'app')
	            eval("mDspApp.FeatureCanvas_" + eventName + " = null");
	        else
            eval("mDspMap.FeatureCanvas_" + eventName + " = null");
        }
    }
  
    self.getFeatureLayerByName = function(lyname, lydispname)
    {
        for(var  i=0; i<mDspFeatureCanvas.GetSize(); i++)
        {
  	        var oFtLayer = mDspFeatureCanvas.GetFeatureLayer(i);
  	        var strName = oFtLayer.GetLayer().GetName();
  	        if(strName == lyname)
  		        return oFtLayer;
  	        if(strName == lydispname)
  		        return oFtLayer;
        }
        return null;
    }

	self.startLocationSensor = function(portnum, baudnum)
	{
		if(mDspCommonFactory == null) return;
		
		mDspSensor = mDspCommonFactory.GetLocationSensor();
		var params = mDspCommonFactory.CreateParameters();
		var param1 = mDspCommonFactory.CreateParameter();

		param1.SetInt(portnum);
		param1.SetName("port");
		params.AddParameter(param1); 

		var param2 = mDspCommonFactory.CreateParameter();
		param2.SetInt(baudnum);
		param2.SetName("baud");
		params.AddParameter(param2);

		var retval = mDspSensor.Start(params);
		
		param1 = null;
		param2 = null;
		params = null;
		//self.gc();
		return retval;
	}
	
	self.getLastErrorMsg = function()
	{
		var utility = mDspCommonFactory.CreateUtility();
		return utility.GetLastErrorMsg();
	}
	
    self.addSensorEventListener = function (eventName, func) {
        if (mDspSensor == null) return;
        mKeySensorEvt.put(eventName, func);
        if (mbIE == true)
            eval("function mDspSensor::" + eventName + "(v1, v2, v3, v4, v5) { return self.onEvent('sensor','" + eventName + "', v1, v2, v3, v4, v5); }");
        else
            eval("mDspSensor." + eventName + " = function(v1, v2, v3, v4, v5) { return self.onEvent('sensor','" + eventName + "', v1, v2, v3, v4, v5); }");
    }

    self.removeSensorEventListener = function (eventName) {
        if (mDspSensor == null) return;
        mKeySensorEvt.remove(eventName);
        if (mbIE == true)
            eval("function mDspSensor::" + eventName + "() {}");
        else
            eval("mDspSensor." + eventName + " = null");
    }

	self.getValueFromFtLayer = function(retLayer, layersrc)
	{
		var retFtLayer = retLayer.GetFeatureLayer(layersrc);
        var ftCol = retFtLayer.GetFeatureCollection();
        if(ftCol.GetSize() < 1)	
	        return null;
		
        var ftType = retFtLayer.GetLayer().GetFeatureType();
        var arr = new Array();
        ftCol.MoveFirst();
        for(var i=0; i<ftCol.GetSize(); i++, ftCol.MoveNext())
        {
	        var ft = ftCol.GetFeature();
	        arr[i] = new Array();
	        for(var j=0;j<ftType.GetSize();j++)
				arr[i][j] = ft.GetAttributeToString(j);
        }
		return arr;
	}
	
    self.getQueryResult = function(layersrc, sql)
    {
        var retLayer = layersrc.ExecuteSQL(sql, 0, 0);
        if(retLayer == null) return null;
  	
		var val = self.getValueFromFtLayer(retLayer, layersrc);
		self.gc();
		return val;
    }
  
    self.removeQueryResult = function(arr)
    {
        for(var row=0;row<arr.length;row++)
            delete arr[row];
        delete arr;
    }

    var mIPAddress = "localhost";
    var mPort = "80";
    var mServiceID = 1;
    var mCategoryID = 1;

    self.getIPAddress = function()		{ return mIPAddress;	}
    self.getPort = function()				{ return mPort;	}
    self.getServiceID = function()		{ return mServiceID;	}
    self.getCategoryID = function()	{ return mCategoryID;	}
    self.setIPAddress = function(ipAddress)		{ mIPAddress = ipAddress;	}
    self.setPort = function(port)					{ mPort = port;	}
    self.setServiceID = function(serviceID)		{ mServiceID = serviceID;	}
    self.setCategoryID = function(categoryID)	{ mCategoryID = categoryID;	}

    self.getQueryResultDirectly = function (sql)  
    {
        var xmlHttp = null;
        if(window.XMLHttpRequest)
	        xmlHttp = new XMLHttpRequest();
        else
	        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	
        var url = "http://" + mIPAddress + ":" + mPort + "/JoyMapServer/api/WebService?REQUEST=QUERYSTRING&CATEGORY=" + String(mCategoryID) + 
			        "&SERVICEID=" + String(mServiceID) + "&OUTPUTFORMAT=JSON&QUERY="+ sql;

        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        if(xmlHttp.status == 200)
        {
	        alert(xmlHttp.responseText);
	        return JSON.parse(xmlHttp.responseText);
        }
		
        return null;
    }

    self.getGeometryFactory = function(srs)
    {
        var crsFac = mDspCommonFactory.CreateCRSFactory();
        var crs = crsFac.CreateFromProj4(srs);
        return dspCommonFactory.CreateGeometryFactory(crs);
    }

	self.gc = function()
    {
      if (typeof(CollectGarbage) == "function")
			  CollectGarbage(); 
    }
	
    self.close = function () 
    {
		// removeallevents
		var mapkeys = mKeyMapEvt.getKeys();
		for(i=0;i<mapkeys.length;i++)
			self.removeMapEventListener(mapkeys[i]);
		var ftcvskeys = mKeyFtCvsEvt.getKeys();
		for(i=0;i<ftcvskeys.length;i++)
			self.removeFeatureCanvasEventListener(ftcvskeys[i]);
		
        delete mKeyMapEvt;
        delete mKeyFtCvsEvt;
        mDspCommonFactory = null;
        mDspDisplayFactory = null;
        mDspFeatureCanvas = null;
        mDspMap = null;
        mDspApp = null;

        self.gc();
    }
}

var geoobject = new geoobject_();

