/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by happily on 17/5/6.
 */
import React from 'react'
import echarts from 'echarts'
import Hits from './chart/Hits'

class Overview extends React.Component {
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
        return <div className="right-content">
            <div className="title">点击量最高的系统</div>
            <div className="chart">
                <Hits data={this.props.histData}/>
            </div>
        </div>
    }
}

export default Overview