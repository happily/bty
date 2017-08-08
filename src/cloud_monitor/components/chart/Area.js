/**
 *  Author: harry.lang
 *  Date: 17/5/6
 *  Description: Created by harrylang on 17/5/6.
 */

import React,{PropTypes} from 'react'
import echarts from 'echarts'
import THEME from './theme'

class Chart extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        //初始化唯一的一个实例出来
        const element = this.refs.chart;
        const echartsInstance = echarts.init(element, THEME, {});

        let option = this.props.option || {
                series: []
            };

        option.series.forEach(function (serie) {
            serie.type = 'line';
            serie.stack = '总量';
            serie.symbol = 'none';
            serie.areaStyle = {normal: {}};
        });

        let _option = {
            color: ['#00c9d6', '#f6810e', '#fe5844'],
            legend: {
                data: [],
                right: 45
            },
            grid: {
                top: 30,
                left: 30,
                bottom: '0',
                right: 45,
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitNumber: 4
                }
            ],
            series: []
        };

        echartsInstance.setOption($.extend(true, _option, option));

    }

    componentWillUnmount() {
        const element = this.refs.chart;
        let echartsInstance = echarts.getInstanceByDom(element);
        echartsInstance.dispose();
    }

    componentDidUpdate() {

        const element = this.refs.chart;

        let option = this.props.option || {};

        let echartsInstance = echarts.getInstanceByDom(element);
        echartsInstance.setOption(option);
    }

    render() {
        return <div ref="chart" style={{height:'100%'}}></div>
    }
}


export default Chart