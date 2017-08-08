/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by harrylang on 17/4/17.
 */
import React from 'react'

import DateTime from './DateTime' // 时间
import Ratio from './Ratio' // 虚拟资源使用情况占比
import Use from './Use' // 各机构虚拟机使用情况
import Distribution from './Distribution' // 各机构资源分配情况
import Map from './Map' // 地图
import MapTable from './MapTable' // 地图下面表格
import Contrast from './Contrast' // 虚拟化数量同期对比
import Statistics from './Statistics' // 网络设备统计
import $ from 'jquery'  //jquery

import { randomBoth } from './util'

const base = 800;
const baseDept = ['财务局', '发改委', '国土局', '教育局', '十二师', '水利局'];

class RealTime extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Ratio: [
                {name: '财务局', value: 135},
                {name: '发改委', value: 133},
                {name: '国土局', value: 133},
                {name: '教育局', value: 133},
                {name: '十二师', value: 133},
                {name: '水利局', value: 133}
            ],
            Use: {
                use: [120, 120, 120, 120, 120, 120],
                u1nuse: [15, 13, 13, 13, 13, 13]
            },
            Distribution: {
                cpu: [],
                mem: [],
                disk: []
            },
            Statistics: {
                "route": 0,
                "swit": 0,
                "fiber": 0,
                "firewall": 0,
                "detection": 0,
                "gatekeeper": 0,
                "disk": 0,
                "memory": 0,
                "tape": 0,
                "server": 0,
                "client": 0,
                "virtual": 0
            },
            Contrast: {
                current: 'virtual', // virtual traffic alert
                data: [[], []]
            },
            Map: {
                lineData: [],
                mapData: []
            },
            MapTable: []
        };

        this.updateState = this.updateState.bind(this);
    }

    baseArry = [135, 133, 133, 133, 133, 133];

    componentWillMount() {
        let i = 5;
        while (i > 0) {
            this.randomResourceBase();
            i--;
        }

        this.setState((preState)=> {
            const resource = this.randomResource();
            return {
                Contrast: this.randomContrast(null, preState),
                Distribution: resource.Distribution
            }
        });

        this.updateState();

    }

    // 左侧资源使用信息图表
    randomResource() {
        this.randomResourceBase();

        let Ratio = [],
            Use = {use: [], unuse: []},
            Distribution = {
                cpu: [],
                mem: [],
                disk: []
            };
        for (let i = 0, len = baseDept.length; i < len; i++) {
            const value = this.baseArry[i];
            //虚拟资源使用情况占比
            Ratio.push({name: baseDept[i], value: value});

            //各机构虚拟机使用情况
            var use = parseInt(value * randomBoth(90, 100) / 100);
            Use.use.push(use);
            Use.unuse.push(value - use);

            //各机构资源分配情况
            Distribution.cpu.push(value * randomBoth(2, 6));
            Distribution.mem.push(value * randomBoth(4, 8));
            Distribution.disk.push(value * randomBoth(2, 5) * 100);

        }

        return {
            Ratio: Ratio,
            Use: Use,
            Distribution: Distribution
        }
    }

    randomResourceBase() {

        let minus = randomBoth(0, 5),
            plus = randomBoth(0, 5),
            num = parseInt(base * (randomBoth(0, 100) / 10000));

        // 保证各个部门均大于90
        if (this.baseArry[minus] > 90) {
            this.baseArry[minus] -= num;
            this.baseArry[plus] += num;
        }
    }

    // 网络设备统计
    networkEquipment() {
        var defer = $.Deferred();
        $.ajax({
            "url": ENV.STATISTICS,
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "data": "{\"id\":" + ENV.STATISTICS_ID + "}",
            success: function (data) {
                defer.resolve(data);
            }
        });
        return defer;
    }

    // 虚拟化数量同期对比
    randomContrast(type, preState) {

        let _type = type || preState.Contrast.current || 'virtual';
        let data = [[], []];

        for (let i = 0; i < 12; i++) {
            const per = randomBoth(80, 105) / 100;
            //virtual traffic alert
            if (_type == 'virtual') {

                const num = randomBoth(700, 900);
                data[0].push(num);
                data[1].push(parseInt(num * per));

            } else if (_type == 'traffic') {

                const num = randomBoth(45, 75);
                data[0].push(num);
                data[1].push(parseInt(num * per));

            } else if (_type == 'alert') {

                const num = randomBoth(9, 20);
                data[0].push(num);
                data[1].push(parseInt(num * per));

            }
        }

        return {
            current: _type,
            data: data
        };
    }

    //健康度列表
    randomMapTable() {
        var defer = $.Deferred();

        let token = '';
        $.ajax({
            "url": ENV.MAP_LOGIN,
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "data": JSON.stringify({"email": ENV.MAP_LOGIN_INFO.USERNAME, "password": ENV.MAP_LOGIN_INFO.PASSWORD, "isKeepLogin": "1", "isEncrypt": "0"})
        }).then(function (data) {

            data = JSON.parse(data);
            token = data.data.jwtToken;

            var settings = {
                "url": ENV.MAP_TASK_LIST,
                "method": "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: 'Bearer ' + token
                }
            };

            return $.ajax(settings);

        }).then(function (data) {

            var ids = '';
            data.data.forEach(function (task) {
                ids += task.taskId + ',';
            });
            ids = ids.substring(0, ids.length - 1);

            return $.ajax({
                "url": ENV.MAP_TASKS + "?taskIdList=" + ids,
                "method": "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: 'Bearer ' + token
                },
                success: function (data) {
                    defer.resolve(data);
                }
            });
        });

        return defer;
    }

    updateState(isContrast) {

        if (isContrast) {
            this.setState((preState)=> {
                return {
                    Contrast: this.randomContrast(isContrast, preState),
                }
            });
        } else {
            const self = this;
            $.when(self.networkEquipment(), self.randomMapTable()).done(function (network, map) {
                //console.log(JSON.stringify(map));
                let _network = {};
                if (network && network.data instanceof Array) {
                    network.data.forEach(function (item) {
                        _network[item['NAME']] = item['CNT'];
                    });
                }

                self.setState((preState)=> {
                    const resource = self.randomResource();
                    return {
                        Contrast: self.randomContrast(null, preState),
                        Ratio: resource.Ratio,
                        Use: resource.Use,
                        Distribution: resource.Distribution,
                        Statistics: _network,
                        MapTable: map.data.monitors,
                        Map: {
                            lineData: map.data.lineData,
                            mapData: map.data.mapData
                        }
                    }
                });

            });
        }

    }

    componentDidMount() {
        setInterval((function (self) {
            return function () {
                self.updateState();
            }
        }(this)), ENV.intervalTime)
    }


    componentWillUnmount() {
    }

    render() {
        return <div className="realtime">
            <div className="realtime-inner">
                <DateTime />

                <div className="clearfix">
                    <div className="chart_detail">
                        <Ratio data={this.state.Ratio}/>
                        <Use data={this.state.Use}/>
                        <Distribution data={this.state.Distribution}/>
                    </div>
                    <div className="map_detail">
                        <Map {...this.state.Map} />
                        <MapTable data={this.state.MapTable}/>
                    </div>
                    <div className="contrast_detail">
                        <Contrast updateState={this.updateState} data={this.state.Contrast}/>
                        <Statistics {...this.state.Statistics}/>
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

export default RealTime