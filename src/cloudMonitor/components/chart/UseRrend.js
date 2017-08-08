/**
 *  Author: harry.lang
 *  Date: 17/5/6
 *  Description: Created by harrylang on 17/5/6.
 */

import React,{PropTypes} from 'react'
import echarts from 'echarts'
import THEME from './theme'

class UseRrend extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        //初始化唯一的一个实例出来
        const element = this.refs.chart;
        const echartsInstance = echarts.init(element, THEME, {});

        let option = {
            color: ['#fd5743', '#37a0c6', '#ffc100'],
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                top: 20
            },
            legend: {
                data: [],
                y: 'bottom'
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}人'
                    }
                }
            ],
            series: [
                {
                    name: '',
                    type: 'line',
                    symbol: 'none',
                    areaStyle: {normal: {opacity: 0.2}},
                    data: []
                },
                {
                    name: '',
                    type: 'line',
                    symbol: 'none',
                    areaStyle: {normal: {opacity: 0.2}},
                    data: []
                },
                {
                    name: '',
                    type: 'line',
                    symbol: 'none',
                    data: []
                }
            ]
        };

        echartsInstance.setOption(option);

    }

    componentWillUnmount() {
        const element = this.refs.chart;
        let echartsInstance = echarts.getInstanceByDom(element);
        echartsInstance.dispose();
    }

    componentDidUpdate() {

        const element = this.refs.chart;

        let data = this.props.data || [];

        let legendData = [];
        data.forEach(function (item) {
            item.type = 'line';
            item.symbol = 'circle';
            item.symbolSize = 7;
            legendData.push(item.name)
        });

        let echartsInstance = echarts.getInstanceByDom(element);
        echartsInstance.setOption({
            legend: {
                data: legendData,
            },
            series: data
        });
    }

    render() {
        return <div ref="chart" style={{height:'100%'}}></div>
    }
}


export default UseRrend