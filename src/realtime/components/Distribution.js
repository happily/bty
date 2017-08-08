/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by harrylang on 17/4/17.
 */
import React from 'react'
import echarts from 'echarts'

class Distribution extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const chart = echarts.init(this.refs.bar);

        let option = {
            color: ['#00c9d6', '#f6810e', '#fe5844'],
            grid: {
                left: '13%',
                top: 40,
                bottom: 40,
                right: '15%'
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
                data: [
                    {name: 'cpu', icon: 'rect'},
                    {name: 'mem', icon: 'rect'},
                    {name: 'disk', icon: 'rect'}
                ]
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
                triggerEvent: true,
                data: ['财务局', '发改委', '国土局', '教育局', '十二师', '水利局']
            },
            yAxis: [{
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
            }, {
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
            }],
            series: [
                {
                    type: 'bar',
                    name: 'cpu',
                    barWidth: 8,
                    data: this.props.data.cpu
                }, {
                    type: 'bar',
                    name: 'mem',
                    barWidth: 8,
                    data: this.props.data.mem
                }, {
                    type: 'bar',
                    name: 'disk',
                    barWidth: 8,
                    yAxisIndex: 1,
                    data: this.props.data.disk
                }
            ]
        };

        chart.setOption(option);

        chart.on('click', function (obj) {
            console.log(obj)
            if ((obj.componentType == 'series' && obj.name == '财务局') || (obj.componentType == 'xAxis' && obj.value == '财务局')) {
                window.location.href = ENV.PEOPLE_URL;
            }
        });

        this.chart = chart;
    }

    componentDidUpdate(obj) {
        if (this.chart) {
            this.chart.setOption({
                series: [{
                    data: obj.data.cpu
                }, {
                    data: obj.data.mem
                }, {
                    data: obj.data.disk
                }]
            })
        }
    }

    componentWillUnmount() {
    }

    render() {
        return <div className="distribution">
            <div className="title">
                各机构资源分配情况
            </div>
            <div ref="bar" className="chart" style={{border:'none'}}>

            </div>
        </div>
    }
}

export default Distribution