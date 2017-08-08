/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by happily on 17/5/6.
 */
import React from 'react'
import echarts from 'echarts'
import DepartActive from './chart/DepartActive'

class Active extends React.Component {
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
            <div className="title">部门活跃度</div>
            <div className="chart-active ">
                <DepartActive data={this.props.DepartActive}/>
            </div>
        </div>
    }
}

export default Active