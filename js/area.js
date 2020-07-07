// var host = "http://localhost:8090"
// var map;
// url_map = host + "/iserver/services/map-EmergWS/rest/maps/EmergMap";     //地图地址
// url = host + "/iserver/services/data-EmergWS/rest/data";                 //数据地址

let url_sa = host + "/iserver/services/spatialAnalysis-EmergWS/restjsr/spatialanalyst";    // 空间分析服务地址 spatial analysis


let dsBufferAnalystService = L.supermap.spatialAnalystService(url_sa);
let dsBufferAnalystParameters;
var bufferAnalystResultLayer = new Array();


bufferAnalystProcess = (rad, bufferColor, i) => {

    dsBufferAnalystParameters = new SuperMap.DatasetBufferAnalystParameters({
        // 用来做缓冲区分析的数据源中数据集名称
        dataset: "Chemical_Factory_R@EmergDS",
        // 设置数据集中集合对象的过滤条件
        // filterQueryParameter: new SuperMap.FilterParameter({
        //     attributeFilter: "NAME='团结路'"
        // }),
        bufferSetting: new SuperMap.BufferSetting({
            endType: SuperMap.BufferEndType.ROUND,
            leftDistance: { value: rad },
            rightDistance: { value: rad },
            // 圆头缓冲圆弧处线段的个数
            semicircleLineSegment: 10
        })
    });
    dsBufferAnalystService.bufferAnalysis(dsBufferAnalystParameters, function (serviceResult) {
        var result = serviceResult.result;
        console.log(result);
        bufferAnalystResultLayer[i] = L.geoJSON(result.recordset.features, { color: bufferColor }).addTo(map);
    });
}

deadArea = () => {  //致死区域
    bufferAnalystProcess(150, "red", 0);
}

severeArea = () => {    //重伤区域
    bufferAnalystProcess(400, "orange", 1);
}

minorArea = () => {     //轻伤区域
    bufferAnalystProcess(800, "yellow", 2);
}

reactionArea = () => {     // 吸入反应区域
    bufferAnalystProcess(1500, "grey", 3);
}

areaRm = () => {
    for (i in bufferAnalystResultLayer) {
        if (bufferAnalystResultLayer[i] !== undefined) {
            bufferAnalystResultLayer[i].remove();
        }
    }
}
