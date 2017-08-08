/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by happily on 17/5/6.
 */
import React from 'react'
import echarts from 'echarts'
import UseRrend from './chart/UseRrend'

class Trend extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentDidUpdate(obj) {
    }

    componentWillUnmount() {
    }

    render() {
        return <div className="left-content">
            <div className="title">业务系统使用趋势</div>
            <div className="chart-trend">
                <UseRrend data={this.props.UseRrend}/>
            </div>
        </div>
    }
}

export default Trend