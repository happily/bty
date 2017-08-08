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
                data: ['0-1000', '1000-2000', '2000-3000', '3000+'],
                y: 'bottom',
                x: 'left',
                orient: 'vertical',
                itemWidth: 15,
                itemHeight: 12
            },
            series: [{
                type: 'pie',
                roseType: 'radius',
                label: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value: 335, name: '0-1000'},
                    {value: 310, name: '1000-2000'},
                    {value: 274, name: '2000-3000'},
                    {value: 235, name: '3000+'},
                ]
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
        let echartsInstance = echarts.getInstanceByDom(element);
        echartsInstance.setOption({
            series: data
        });
    }

    render() {
        return <div ref="chart" style={{height:'100%'}}></div>
    }
}


export default ClickRatePie