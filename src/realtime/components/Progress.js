/**
 *  Author: harry.lang
 *  Date: 17/4/18
 *  Description: Created by harrylang on 17/4/18.
 */
import React, {PropTypes} from 'react'
import echarts from 'echarts'

// 优秀
import p_green from './img/p_green.png'
import p_green_bg from './img/p_green_bg.png'
// 良好
import p_yellow from './img/p_yellow.png'
import p_yellow_bg from './img/p_yellow_bg.png'
// 一般
import p_red from './img/p_red.png'
import p_red_bg from './img/p_red_bg.png'

class Progress extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const chart = echarts.init(this.refs.chart);

        const {value} =this.props;
        let _value = value || 0;

        let progress = p_green;
        let progress_bg = p_green_bg;
        if (_value <= 85) {
            progress = p_red;
            progress_bg = p_red_bg;
        } else if (_value > 85 && _value <= 95) {
            progress = p_yellow;
            progress_bg = p_yellow_bg;
        }

        let option = {
            backgroundColor: 'transparent',
            xAxis: {
                show: false,
                type: 'value',
                max: 100
            },
            yAxis: {
                show: false,
                type: 'category',
                data: ['网络健康']
            },
            series: [{
                name: '网络健康',
                type: 'pictorialBar',
                symbol: 'image://' + progress,
                symbolSize: [40, 10],
                symbolClip: true,
                symbolBoundingData: 100,
                data: [100],
                z: 10,
                symbolOffset: [7, 0]
            }, {
                name: '网络健康',
                type: 'pictorialBar',
                symbol: 'image://' + progress_bg,
                symbolSize: [54, 24],
                symbolClip: true,
                symbolBoundingData: 100,
                data: [100]
            }]
        };

        chart.setOption(option);
    }

    componentWillUnmount() {
    }

    render() {
        return <div style={{display:'inline-block'}}>
            <div ref="chart" style={{width:64,height:24}}></div>
        </div>
    }
}

export default Progress