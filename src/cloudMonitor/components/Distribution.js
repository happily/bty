/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by happily on 17/5/6.
 */
import React from 'react'
import echarts from 'echarts'
import ClickRatePie from './chart/ClickRatePie'

class Distribution extends React.Component {
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
            <div className="title">应用系统点击率分布</div>
            <div className="chart-distribution ">
                <ClickRatePie data={this.props.ClickRatePie}/>
            </div>
        </div>
    }
}

export default Distribution