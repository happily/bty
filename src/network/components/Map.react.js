/**
 *  Author: harry.lang
 *  Date: 17/4/19
 *  Description: Created by harrylang on 17/4/19.
 */
import React,{PropTypes} from 'react'
import echarts from 'echarts'
import 'GEO_PATH/china'
import chinaGeo from 'GEO_PATH/china_geo'

function randomBoth(min, max) {
    var range = max - min;
    var rand = Math.random();
    var num = min + Math.round(rand * range); //四舍五入
    return num;
}

chinaGeo['新疆兵团云数据中心'] = chinaGeo['乌鲁木齐'];

class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
        const province = ["北京", "天津", "上海", "重庆", "河北", "河南", "云南", "辽宁", "黑龙江", "湖南", "福建", "贵州", "广东", "青海", "西藏", "四川", "宁夏"];

        const l = province.length;
        let index = randomBoth(1, l - 1),
            index2 = randomBoth(1, l - 1);

        // effectScatter
        let data1 = [];
        data1.push({monitorName: "新疆兵团云数据中心", value: 1});
        for (let i = 0; i < l; i++) {
            data1.push({monitorName: province[i], value: 1});
        }
        data1[index].value = 0;
        data1[index2].value = 0;

        let scatterData = this.convertScatter(data1, chinaGeo);

        // lines
        let data2 = [];
        data2.push([{name: '新疆兵团云数据中心', value: 1}, {name: "新疆兵团云数据中心"}]);
        for (let i = 0; i < l; i++) {
            if (i < 5) {
                data2.push([{name: "新疆兵团云数据中心", value: 1}, {name: province[i]}]);
            } else {
                data2.push([{name: province[i], value: 1}, {name: "新疆兵团云数据中心"}]);
            }

        }
        data2[index][0].value = 0;
        data2[index2][0].value = 0;

        let linesData = this.convertLines(data2, chinaGeo);

        const chart = echarts.init(this.refs.map);

        const colors = ['#79c95d', '#f64143'];

        let option = {
            color: colors,
            tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },
            geo: {
                map: 'china',
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: 'rgba(100,201,255,1)'
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            color: "#ffffff",
                            fontWeight: "bold"
                        },
                        areaStyle: {
                            color: 'transparent'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#092757',
                        borderColor: '#135594',
                        borderWidth: 1
                    },
                    emphasis: {
                        areaColor: '#092757',
                        borderColor: '#ffffff'
                    }
                }
            },
            visualMap: [
                {
                    type: 'piecewise',
                    pieces: [
                        {min: 0, max: 0, label: '不可用', color: colors[1], symbol: 'circle'},
                        {min: 1, max: 1, label: '可用', color: colors[0], symbol: 'circle'}
                    ],
                    min: 0,
                    max: 1,
                    seriesIndex: [0, 1],
                    left: 15,
                    top: '74%',
                    itemHeight: 12,
                    itemWidth: 12,
                    textGap: 5,
                    textStyle: {
                        color: "#fff"
                    }
                }
            ],
            series: [
                {
                    name: 'markPoint',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    itemStyle: {
                        normal: {
                            color: function (param) {
                                if (param.value && param.value[2]) {
                                    return colors[0];
                                } else {
                                    return colors[1];
                                }
                            },
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    data: scatterData
                }, {
                    name: 'markLine',
                    type: 'lines',
                    zlevel: 1,
                    animation: false,
                    symbolSize: 4,
                    effect: {
                        show: true,
                        period: 8,
                        trailLength: 0.4,
                        symbol: 'circle',
                        symbolSize: 5,
                        color: "rgba(255,255,255,0.8)"
                    },
                    lineStyle: {
                        normal: {
                            color: function (param) {
                                if (param.value == 1) {
                                    return colors[0];
                                } else {
                                    return colors[1];
                                }
                            },
                            width: 1,
                            opacity: 1,
                            curveness: 0.2
                        }
                    },
                    data: linesData
                }

            ]
        };

        chart.setOption(option);

        // 地图点击事件
        chart.on('click', function (obj) {
            if (obj.name == '新疆') {
                window.location.href = './realtime.html';
            }
        });

    }

    componentDidUpdate() {

    }

    convertScatter(data, geoCoordMap) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
            let geoCoord = geoCoordMap[data[i].monitorName];
            if (geoCoord) {
                res.push({
                    name: data[i].monitorName,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;

    }

    convertLines(data, geoCoordMap) {
        let res = [];

        for (var i = 0; i < data.length; i++) {
            const dataItem = data[i];
            const fromCoord = geoCoordMap[dataItem[0].name];
            const toCoord = geoCoordMap[dataItem[1].name];
            // 判断开始和结束节点都存在
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord],
                    value: dataItem[0].value
                });
            }
        }
        return res;
    }

    render() {
        return <div ref="map" style={{height:'100%'}}></div>
    }
}

export default Map