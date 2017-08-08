/**
 *  Author: harry.lang
 *  Date: 17/5/6
 *  Description: Created by harrylang on 17/5/6.
 */

import React,{PropTypes} from 'react'
import echarts from 'echarts'
import THEME from './theme'

class Line extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        //初始化唯一的一个实例出来
        const element = this.refs.line;
        const echartsInstance = echarts.init(element, THEME, {});

        let option = {
            color: ['#1391ff', '#6dd93d', '#ffc100', '#d96d3d', '#49d9fe'],
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
                    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}次'
                    }
                }
            ],

            series: []
        };

        echartsInstance.setOption(option);

    }

    componentWillUnmount() {
        const element = this.refs.line;
        let echartsInstance = echarts.getInstanceByDom(element);
        echartsInstance.dispose();
    }

    componentDidUpdate() {

        const element = this.refs.line;

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
        return <div ref="line" style={{height:'100%'}}></div>
    }
}


export default Line