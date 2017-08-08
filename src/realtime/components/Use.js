/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by harrylang on 17/4/17.
 */
import React from 'react'
import echarts from 'echarts'

import icon from './img/icon.png'

class Use extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const chart = echarts.init(this.refs.bar);

        let option = {
            color: ['#00c9d6', 'rgba(0,201,214,0.1)'],
            grid: {
                left: '13%',
                top: 40,
                bottom: 40
            },
            legend: {
                textStyle: {
                    fontSize: 10,
                    color: '#ffffff'
                },
                itemWidth: 15,
                itemHeight: 10,
                right: '9%',
                top: 10,
                data: [{name: '使用', icon: 'rect'}, {name: '未使用', icon: 'image://' + icon}]
            },
            xAxis: {
                type: 'category',
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {
                    textStyle: {
                        color: '#a4a9ab'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#273851'
                    }
                },
                //triggerEvent: true,
                data: ['财务局', '发改委', '国土局', '教育局', '十二师', '水利局']
            },
            yAxis: {
                type: 'value',
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {
                    textStyle: {
                        color: '#a4a9ab'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#273851'
                    }
                }
            },
            series: [
                {
                    type: 'bar',
                    name: '使用',
                    stack: '总量',
                    barWidth: 15,
                    itemStyle: {
                        normal: {
                            borderColor: '#00c9d6'
                        }
                    },
                    data: this.props.data.use
                }, {
                    type: 'bar',
                    name: '未使用',
                    stack: '总量',
                    barWidth: 15,
                    itemStyle: {
                        normal: {
                            borderColor: '#00c9d6'
                        }
                    },
                    data: this.props.data.unuse
                }
            ]
        };

        chart.setOption(option);

        /*chart.on('click', function (obj) {
         if ((obj.componentType == 'series' && obj.name == '财政局') || (obj.componentType == 'xAxis' && obj.value == '财政局')) {
         window.location.href = 'http://43.250.238.249:7700/static/screen/index.html?id=4&sc=FN3Av2';
         }
         });*/
        this.chart = chart;
    }

    componentDidUpdate(obj) {
        if (this.chart) {
            this.chart.setOption({
                series: [{
                    data: obj.data.use
                }, {
                    data: obj.data.unuse
                }]
            })
        }
    }

    componentWillUnmount() {
    }

    render() {
        return <div className="use">
            <div className="title">
                各机构虚拟机使用情况
            </div>
            <div ref="bar" className="chart">

            </div>
        </div>
    }
}

export default Use