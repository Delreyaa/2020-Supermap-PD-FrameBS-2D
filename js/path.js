// var host = "http://localhost:8090"
// var map;
// url_map = host + "/iserver/services/map-EmergWS/rest/maps/EmergMap";     //地图地址
// url = host + "/iserver/services/data-EmergWS/rest/data";                 //数据地址
// 数据集：RoadNetwork@EmergDS


var url_na = "http://localhost:8090/iserver/services/transportationAnalyst-EmergWS/rest/networkanalyst/RoadNetwork@EmergDS";  //网络分析服务地址

//自定义图标
var myIcon = L.icon({
    iconUrl: "../../dist/leaflet/images/marker-icon.png",
    iconSize: [25, 25]
});

var result; //最佳路径分析时服务器返回的结果
var findPathResultLayer = new Array();  //结果图层


// 获取Chemical_Factory的坐标
var factoryLatLon;
(factoryQuery = () => {
    var factorySqlParam = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: "Chemical_Factory@EmergDS",
            attributeFilter: "SMID = 1"
        },
        datasetNames: ["EmergDS:Chemical_Factory"]
    });
    L.supermap
        .featureService(url)
        .getFeaturesBySQL(factorySqlParam, function (serviceResult) {
            factoryLatLon = serviceResult.result.features.features[0].geometry.coordinates
        });
})();

// 添加事件监听：鼠标点击事件
// 鼠标点击时，获取选中要素的坐标，并调用findPathProcess()函数查询路线

findPath = () => {
    let idsParam = new SuperMap.GetFeaturesByIDsParameters({
        IDs: [1, 2, 3, 4, 5, 6],
        datasetNames: ["EmergDS:Hospital_R"],
    });
    L.supermap.featureService(url).
        getFeaturesByIDs(
            idsParam,
            (serviceResult) => {
                queryResultLayer = L.geoJSON(serviceResult.result.features, {
                    onEachFeature: (feature, layer) => {
                        layer.on({
                            click: (e) => {
                                console.log(e.target.feature.properties.NAME);  //点选的医院的名称
                                let name = e.target.feature.properties.NAME;
                                for (i in hospitalLatLons) {
                                    if (hospitalLatLons[i]["name"] === name) {
                                        findPathProcess(hospitalLatLons[i]["coordinate"]);
                                    }
                                }
                            }
                        });
                    }
                }).addTo(map);
            }
        );

}


findPathProcess = (startLatLon = hospitalLatLons[0]["coordinate"]) => {
    //从医院出发，到事故点（Chemical_Factory@EmergDS）
    //出发点默认值为市第一人民医院

    //网络分析结果参数
    let resultSetting = new SuperMap.TransportationAnalystResultSetting(
        {
            //是否在分析结果中包含弧段要素集合
            returnEdgeFeatures: true,
            //返回的弧段要素集合中是否包含集合对象信息
            returnEdgeGeometry: true,
            //返回的结果中是否包含经过弧段ID集合
            returnEdgeIDs: true,
            //返回的分析结果总是否包含结点要素集合
            returnNodeFeatures: true,
            //返回的结点要素集合中是否包含集合对象信息
            returnNodeGeometry: true,
            //返回的分析结果中是否包含经过结点ID集合
            returnNodeIDs: true,
            //返回分析结果中是否包含行驶导引集合
            returnPathGuides: true,
            //返回结果中是否包含路由对象集合
            returnRoutes: true
        }
    );

    //网络分析通用参数
    let analystParameter = new SuperMap.TransportationAnalystParameter({
        //分析结果返回的内容
        resultSetting: resultSetting,
        //阻力字段的名称
        weightFieldName: "SmLength"
    });

    //最佳路径分析参数
    let findPathParams = new SuperMap.FindPathParameters({
        //是否通过结点ID指定路径分析的结点
        isAnalyzeById: false,
        //最佳路径分析经过的结点或设施点数组
        nodes: [L.point(startLatLon), L.point(factoryLatLon)],
        //是否按照弧段数最少的进行最佳路径分析
        hasLeastEdgeCount: false,
        //交通网络分析通用参数
        parameter: analystParameter
    });

    let findPathService = L.supermap.networkAnalystService(url_na);
    //向服务器发送请求，并对返回的结果进行分析处理，展示在客户端上
    findPathService.findPath(findPathParams, function (serviceResult) {
        //获取服务器返回的结果
        result = serviceResult.result;
        //显示结果
        result.pathList.map(function (result) {
            findPathResultLayer.push(L.geoJSON(result.route).addTo(map));
            L.geoJSON(result.pathGuideItems, {
                pointToLayer: function (geoPoints, latlng) {
                    findPathResultLayer.push(L.marker(latlng, { icon: myIcon }).addTo(map));
                },
                filter: function (geoJsonFeature) {
                    if (geoJsonFeature.geometry && geoJsonFeature.geometry.type === 'Point') {
                        return true;
                    }
                    return false;
                }
            }).addTo(map);
        });
    });
}

findPathResultRm = () => {
    for (i in findPathResultLayer) {
        findPathResultLayer[i].remove();
    }
}
