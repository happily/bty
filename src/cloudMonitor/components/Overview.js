/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by happily on 17/5/6.
 */
import React from 'react'
import echarts from 'echarts'
import NumberCard from './NumberCard'
import PiedRing from './chart/PiedRing'

class Overview extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        return <div className="left-content">
            <div className="title">应用概览</div>
            <ul>
                <li>
                    <div className="total">
                        <NumberCard number={this.props.data.number}></NumberCard>
                        <div className="total-text">应用总数</div>

                    </div>
                </li>
                <li>
                    <div className="pie">
                        <PiedRing data={this.props.data.pied}/>
                    </div>
                </li>
            </ul>
        </div>
    }
}

export default Overview