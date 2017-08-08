/**
 *  Author: harry.lang
 *  Date: 17/5/6
 *  Description: Created by harrylang on 17/5/6.
 */

import React,{PropTypes} from 'react'
import echarts from 'echarts'
import THEME from './theme'

class ClickRatePie extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        //初始化唯一的一个实例出来
        const element = this.refs.chart;
        const echartsInstance = echarts.init(element, THEME, {});

        let option = {
            color: ['#49d9fe', '#ffd800', '#fd8d43', '#fd5743'],
            legend: {
                data: [],
                y: 'bottom',
                x: 'left',
                orient: 'vertical',
                itemWidth: 15,
                itemHeight: 12
            },
            series: [{
                type: 'pie',
                center:['60%', '50%'],
                roseType: 'radius',
                radius:['0','90%'],
                label: {
                    normal: {
                        show: false
                    }
                },
                data: []
            }]
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
                data: legendData
            },
            series: [{
                data: data
            }]
        });
    }

    render() {
        return <div ref="chart" style={{height:'100%'}}></div>
    }
}


export default ClickRatePie