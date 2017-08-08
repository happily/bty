/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by Jenny on 17/4/17.
 */
import React from 'react'
import echarts from 'echarts'

class Ratio extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const chart = echarts.init(this.refs.pie);

        let option = {
            color: ['#00c9d6', '#56be28', '#ffa800', '#fb6231', '#008dd6'],
            legend: {
                textStyle: {
                    fontSize: 10,
                    color: '#ffffff'
                },
                itemWidth: 15,
                itemHeight: 10,
                data: [
                    {name: '财务局', icon: 'rect'},
                    {name: '发改委', icon: 'rect'},
                    {name: '国土局', icon: 'rect'},
                    {name: '教育局', icon: 'rect'},
                    {name: '十二师', icon: 'rect'},
                    {name: '水利局', icon: 'rect'}
                ]
            },
            series: [
                {
                    name: '虚拟资源使用情况占比',
                    type: 'pie',
                    radius: ['40%', '50%'],
                    center: ['50%', '55%'],
                    label: {
                        normal: {
                            formatter: '{d}%',
                            textStyle: {
                                color: '#ffffff'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#ffffff'
                            }
                        }
                    },
                    hoverAnimation: false,
                    itemStyle: {
                        normal: {}
                    },
                    data: this.props.data
                }
            ]
        };

        chart.setOption(option);

        this.chart = chart;

    }

    componentDidUpdate(obj) {
        if (this.chart) {
            this.chart.setOption({
                series: [{
                    data: obj.data
                }]
            })
        }
    }

    componentWillUnmount() {
    }

    render() {
        return <div className="ratio">
            <div className="title">
                虚拟资源使用情况占比
            </div>
            <div ref="pie" className="chart">
            </div>

        </div>
    }
}

export default Ratio