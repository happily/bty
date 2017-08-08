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
            color: ['#1ebec8', '#fd5743'],
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                top: 20
            },
            legend: {
                data: [{name: '去年', icon: 'rect'}, {name: '今年', icon: 'rect'}],
                y: 'bottom',
                itemWidth: 8,
                itemHeight: 8
            },
            xAxis: [
                {
                    type: 'category',
                    data: ["部门0", "部门1", "部门2", "部门3", "部门4", "部门5", "部门6", "部门7", "部门8", "部门9"]
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
                    name: '去年',
                    type: 'bar',
                    data: [2564, 1004, 3891, 2860, 2554, 3118, 3828, 2282, 2105, 1237]
                },
                {
                    name: '今年',
                    type: 'bar',
                    data: [2145, 3671, 3530, 3922, 3104, 3829, 2896, 3209, 1032, 1337]
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

        let data = this.props.data || {};

        let echartsInstance = echarts.getInstanceByDom(element);
        echartsInstance.setOption({
            xAxis: {
                data: data.deptNames
            },
            series: [{
                data: data.oldYear
            }, {
                data: data.nowYear
            }]
        });
    }

    render() {
        return <div ref="chart" style={{height:'100%'}}></div>
    }
}


export default UseRrend