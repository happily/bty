/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by harrylang on 17/4/17.
 */
import React from 'react'

import DateTime from '../../components/DateTime' // 时间
import Overview from './Overview' // 应用概览
import System from './System' // 点击量最高的系统
import Trend from './Trend' // 业务系统使用趋势
import Active from './Active' // 部门活跃度
import Distribution from './Distribution' //应用系统点击分布率
import Tablelist from './Tablelist' //应用系统点击分布率

import {system} from  'SRC_PATH/utils/data'

class CloudMonitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.update = this.update.bind(this);
    }

    update() {

        const _system = system();
        this.setState({
            pied: _system.appscalecount,
            number: _system.count,
            histData: _system.clickTopData,
            UseRrend: _system.operationsystemData,
            DepartActive: _system.activesectorData,
            ClickRatePie: _system.activebusinesssystem,
            Tablelist: _system.servicestechnolog
        });
    }

    componentDidMount() {
        this.update();
        setInterval(function () {
            this.update();
        }.bind(this), ENV.intervalTime)
    }


    componentWillUnmount() {
    }

    render() {
        return <div className="cloudMonitor">
            <div className="cloudMonitor-inner">
                <DateTime />

            </div>
            <div className="cloudMonitor_chart">
                <div className="clearfix">
                    <div className="chart-row-one">
                        {/*应用概览*/}
                        <Overview data={{number:this.state.number,pied:this.state.pied}}/>
                        {/*点击量*/}
                        <System histData={this.state.histData}/>
                    </div>
                    <div className="chart-row-two">
                        {/*业务系统使用趋势*/}
                        <Trend UseRrend={this.state.UseRrend}/>
                        {/*部门活跃度*/}
                        <Active DepartActive={this.state.DepartActive}/>

                    </div>
                    <div className="chart-row-thr">
                        <div className="title">业务系统活跃度</div>
                        {/*distribution*/}
                        <Distribution ClickRatePie={this.state.ClickRatePie}/>
                        {/*table*/}
                        <Tablelist data={this.state.Tablelist}/>
                    </div>
                </div>
            </div>
            <div className="sky_bg"></div>
            <div className="sky_bg_static"></div>
            <div className="corner_bg"></div>
            <div className="meteor"></div>
            <div className="meteor1"></div>

        </div>
    }
}

export default CloudMonitor