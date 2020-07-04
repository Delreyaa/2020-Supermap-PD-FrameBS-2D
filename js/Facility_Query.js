var quanjuobj;
var quanjulist = [];
var e = 0;
var oo = L.geoJSON();
var YYY, XXX;
var startx, starty;
var endx, endy;
var myIconstart;
var route = L.geoJSON();
var arr;
var listt = [];
var routepng;
var layertest = [];
var myGrouptest = L.layerGroup();
var myGroupstart = L.layerGroup();
var myGroupend = L.layerGroup();
var kk, kkk;
var carName = [];
var bn = 0;
$(function () {
    $("[data-toggle='tooltip']").tooltip();
});

// 控制左边菜单栏滑入滑出
$('#btn').click(function () {
    if (n == 1) {
        $('#test').animate({
            'margin-left': '0px'
        },
            250);
        $('#map').animate({},
            2500);
        n = n - 1;

    } else {
        $('#test').animate({
            'margin-left': '-300px'
        },
            250);
        $('#map').animate({
            'margin-left': '50px'
        },
            350);
        n = n + 1;
    }
});

var n = 0;
var w1, w2, w3, w4, c1, c2, c3, c4;
var handler1 = 'null';
var handler2 = 'null';
var handler3 = 'null';
var objid = [];
var ally;
var newresultLayer = 'null';
var allresultLayer = 'null';
var editableLayerss;

var host = "http://localhost:8090"
var map;
url_map = host + "/iserver/services/map-EmergWS/rest/maps/EmergMap";     //地图地址
url = host + "/iserver/services/data-EmergWS/rest/data";          //数据地址

// 初始化地图信息
//!!!地图要经过投影转换
var map = L.map('map', {        //地图窗口
    crs: L.CRS.EPSG4326,
    center: [30.61, 103.7],
    zoom: 13,
    minzoom: 10,
    maxzoom: 18
});

L.supermap.tiledMapLayer(url_map).addTo(map);       //添加地图

// 创建图层组
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);
$("#map").css("position", "sticky");

// 地图浏览操作基本功能
function Fullwidth() {   //全图
    var latlng = L.latLng(30.61, 103.7);
    map.setView([30.61, 103.7], 13);
}
function enlarge() {     //放大
    map.zoomIn();
}
function narrow() {      //缩小
    map.zoomOut();
}
function translation() { //平移
    map.panTo([30.61, 103.71]);
}



let queryClickCount = false;    //医院查询状态
var queryResultLayer;           //结果图层

// 查询功能：选中某个医院，弹出医院的坐标和名称等属性信息
function hospitalRSearch() {
    queryClickCount = !queryClickCount; //改变查询状态

    if (queryClickCount === false) {
        //清除结果图层并返回
        queryResultLayer.remove();
        return;
    }

    //设置数据集及目标对象范围（所有的医院）
    var idsParam = new SuperMap.GetFeaturesByIDsParameters({
        IDs: [1, 2, 3, 4, 5, 6],
        datasetNames: ["EmergDS:Hospital_R"],
    });

    //执行查询并绑定弹窗
    L.supermap.featureService(url).
        getFeaturesByIDs(
            idsParam,
            (serviceResult) => {
                //console.log(serviceResult);
                // console.log(this);

                queryResultLayer = L.geoJSON(serviceResult.result.features, {
                    onEachFeature: function (feature, layer) {
                        console.log(feature.geometry.coordinates[0][0]);


                        var bounds = new SuperMap.Bounds(feature.geometry.coordinates[0][0]);
                        var center_lonlat = bounds.getCenterLonLat();

                        layer.bindPopup("<p align=\"center \">" + feature.properties.NAME + "</p>" + center_lonlat);
                    }
                }).addTo(map);
            }
        );
}

function hospitalRSearchRm() {
    queryResultLayer.remove();
}


//导出地图对象
module.exports = { map };




