/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by harrylang on 17/4/17.
 */
import React from 'react'
import echarts from 'echarts'

class Contrast extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const chart = echarts.init(this.refs.chart);

        let option = {
            color: ['#2affff', '#fa676a'],
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
                right: '9%',
                top: 10,
                itemWidth: 10,
                data: [
                    {name: '今年', icon: 'circle'},
                    {name: '去年', icon: 'circle'}
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
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
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
                    name: '今年',
                    type: 'line',
                    symbol: 'none',
                    stack: '总量',
                    areaStyle: {
                        normal: {
                            opacity: 0.2
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    data: this.props.data.data[0]
                }, {
                    name: '去年',
                    type: 'line',
                    symbol: 'none',
                    stack: '总量',
                    areaStyle: {
                        normal: {
                            opacity: 0.2
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    data: this.props.data.data[1]
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
                    data: obj.data.data[0]
                }, {
                    data: obj.data.data[1]
                }]
            })
        }
    }

    componentWillUnmount() {
    }

    changeTab(type) {
        this.props.updateState(type);
    }

    render() {
        return <div className="contrast">
            <div className="ul_pad">
                <ul className="tab_title">
                    <li className={this.props.data.current=='virtual'?'active':''}>
                        <a href="#" onClick={(e)=>{
                            e.preventDefault();
                            this.changeTab('virtual');
                        }
                        }>虚拟化数量</a>
                    </li>
                    <li className={this.props.data.current=='traffic'?'active':''}>
                        <a href="#" onClick={(e)=>{
                            e.preventDefault();
                            this.changeTab('traffic');
                        }
                        }>网络流量</a>
                    </li>
                    <li className={this.props.data.current=='alert'?'active':''}>
                        <a href="#" onClick={(e)=>{
                            e.preventDefault();
                            this.changeTab('alert');
                        }
                        }>告警数量</a>
                    </li>
                </ul>
            </div>

            <div className="tab_content">
                <div className="title">
                    &nbsp;&nbsp;虚拟化数量同期对比
                </div>
                <div className="chart1" ref="chart">

                </div>
            </div>
        </div>
    }
}

export default Contrast