/**
 *  Author: jenny.pei
 *  Date: 17/5/6
 *  Description: Created by jenny on 17/5/6.
 */
import React from 'react'

import DateTime from '../../components/DateTime' // 时间
import Map from './Map' // 地图
import DataCenter from './DataCenter' // 兵团云数据中心
import Resource from './Resource' // 十二师资源情况
import ResourceDetail from './ResourceDetail' // 十二师资源情况详情
import $ from 'jquery'  //jquery

import {monitor,monitorResource} from  'SRC_PATH/utils/data'

class CloudMonitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentName: '',
            mapData: {
                mapData: [],
                lineData: [],
                lineData2: [],
            }
        };
        this.update = this.update.bind(this);
        this.selectMap = this.selectMap.bind(this);
    }

    update() {
        const _monitor = monitor();
        //const {wjqData,klmyData,wlData,} = monitorResource();
        this.setState({
            mapData: {
                mapData: _monitor.mapDatas,
                lineData: _monitor.lineDatas,
                lineData2: _monitor.lineDatas2,
            },
            dataCenter: monitorResource()
        });
    }


    componentWillMount() {
        this.update();
    }

    componentDidMount() {
        this.update();
        setInterval(function () {
            this.update();
        }.bind(this), ENV.intervalTime)
    }

    selectMap(name) {
        const centers = ['乌鲁木齐', '克拉玛依', '五家渠'];
        if (centers.indexOf(name) > -1) {
            name = '';
        }

        this.setState({
            currentName: name
        });
        console.log(name)
    }

    render() {
        return <div className="cloud_monitor">
            <div className="cloud-inner">
                <DateTime />
            </div>

            <Map selectMap={this.selectMap} {...this.state.mapData}/>

            <DataCenter data={this.state.dataCenter.centerData}/>
            <Resource data={{divisionData:this.state.dataCenter.divisionData,currentName:this.state.currentName}}/>

            <div className="corner_bg"></div>
            <div className="meteor"></div>
            <div className="meteor1"></div>

        </div>
    }
}

export default CloudMonitor