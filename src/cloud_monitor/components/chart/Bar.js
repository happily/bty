/**
 *  Author: harry.lang
 *  Date: 17/5/6
 *  Description: Created by harrylang on 17/5/6.
 */

import React,{PropTypes} from 'react'
import echarts from 'echarts'
import THEME from './theme'
import $ from 'jquery'

class Chart extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        //初始化唯一的一个实例出来
        const element = this.refs.chart;
        const echartsInstance = echarts.init(element, THEME);

        let option = this.props.option || {};

        let _option = {
            color: ['#00c9d6'],
            grid: {
                left: '20%',
                right: '10%',
                top: 20,
                bottom: 20
            },
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    //formatter: '{value}人'
                },
                splitNumber: 4
            },
            series: [
                {
                    name: 'none',
                    type: 'bar',
                    data: []
                }
            ]
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