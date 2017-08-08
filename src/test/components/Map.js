/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by harrylang on 17/4/17.
 */
import React from 'react'
import echarts from 'echarts'
import 'GEO_PATH/xinjiang'
//import geoCoordMap from 'GEO_PATH/xinjiang_geo'
import { randomBoth } from 'SRC_PATH/utils/util'

const geoCoordMap = XINJIAN_GEO;

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.handleData = this.handleData.bind(this);
    }

    handleData(props) {
        // effectScatter
        let cacheMonitor = {};

        let data1 = props.mapData.map(function (item) {

            let value = 0;
            if (item.availability) {
                value = 100;
            }
            cacheMonitor[item.monitorName] = value;
            return {
                monitorName: item.monitorName,
                value: value
            }
        });

        let scatterData = this.convertScatter(data1, geoCoordMap);

        // lines
        let data2 = props.lineData.map(function (item) {
            return [{"name": item.from, "value": cacheMonitor[item.from]}, {"name": item.to}];
        });

        let linesData = this.convertLines(data2, geoCoordMap);

        return {
            scatterData: scatterData,
            linesData: linesData
        }
    }

    componentDidMount() {

        // effectScatter
        let data1 = [];
        for (let name in geoCoordMap) {
            data1.push({monitorName: name, value: 99});
        }

        let index = randomBoth(0, data1.length - 1);
        let index2 = randomBoth(0, data1.length - 1);
        data1[index].value = 90;
        data1[index2].value = 40;

        let scatterData = this.convertScatter(data1, geoCoordMap);

        // lines
        let data2 = [];
        for (let name in geoCoordMap) {
            data2.push([{name: name, value: 99}, {name: '新疆兵团云数据中心'}]);
        }

        data2[index][0].value = 90;
        data2[index2][0].value = 40;

        let linesData = this.convertLines(data2, geoCoordMap);

        const chart = echarts.init(this.refs.map);

        const colors = ['#56be28', '#fdd82c', '#f93f3c'];
        let option = {
            color: colors,
            geo: {
                map: '新疆',
                zoom: 1.2,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: "#ffffff"
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#092757',
                        borderColor: '#135594'
                    },
                    emphasis: {
                        areaColor: '#092757',
                        borderColor: '#ffffff'
                    }
                }
            },
            visualMap: {
                show: false,
                type: 'piecewise',
                pieces: [
                    {min: 0, max: 85, label: '一般', color: colors[2]},
                    {min: 85, max: 95, label: '良好', color: colors[1]},
                    {min: 95, max: 100, label: '优秀', color: colors[0]}
                ]
            },

            series: [{
                name: '兵团云网络健康状况',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                symbolSize: 8,
                data: scatterData,
                label: {
                    normal: {
                        show: true,
                        position: 'bottom',
                        formatter: function (param) {
                            return param.name;
                        },
                        textStyle: {
                            color: '#ffffff',
                        }
                    }
                }
            }, {
                name: '兵团云网络流动情况',
                type: 'lines',
                zlevel: 1,
                data: linesData,
                effect: {
                    show: true,
                    trailLength: 0,
                    //trailLength: 0.1,
                    symbol: 'arrow',
                    symbolSize: 6
                },
                lineStyle: {
                    normal: {
                        color: function (param) {
                            let color = colors[0];
                            if (param.value <= 85) {
                                color = colors[2];
                            } else if (param.value > 85 && param.value <= 95) {
                                color = colors[1];
                            } else {
                                color = colors[0];
                            }
                            return color;
                        },
                        curveness: 0.2,
                        type: 'dotted'
                    }
                }
            }, {
                name: '兵团云网络流动情况111',
                type: 'lines',
                zlevel: 2,
                data: linesData,
                effect: {
                    show: true,
                    trailLength: 0,
                    //trailLength: 0.1,
                    symbol: 'arrow',
                    symbolSize: 6
                },
                lineStyle: {
                    normal: {
                        color: function (param) {
                            let color = colors[0];
                            if (param.value <= 85) {
                                color = colors[2];
                            } else if (param.value > 85 && param.value <= 95) {
                                color = colors[1];
                            } else {
                                color = colors[0];
                            }
                            return color;
                        },
                        curveness: 0.,
                    }
                }
            }]
        };

        chart.setOption(option);

        this.chart = chart;

    }

    timer = null;

    componentDidUpdate() {
        /*clearTimeout(this.timer);
         this.timer = setTimeout(function () {
         const baseData = this.handleData(this.props);
         const scatterData = baseData.scatterData;
         const linesData = baseData.linesData;
         this.chart.setOption({
         series: [{
         data: scatterData
         }, {
         data: linesData
         }]
         })
         }.bind(this), 400);*/
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

    componentWillUnmount() {
    }

    render() {
        return <div className="map" ref="map" style={{height:'100%'}}>
        </div>
    }
}

export default Map