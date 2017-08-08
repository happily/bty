/**
 *  Author: harry.lang
 *  Date: 17/4/19
 *  Description: Created by harrylang on 17/4/19.
 */

import DateTime from './DateTime.react'
import Map from './Map.react'
import NetworkHealthList from './NetworkHealthList.react'

function randomBoth(min, max) {
    var range = max - min;
    var rand = Math.random();
    var num = min + Math.round(rand * range); //四舍五入
    return num;
}

class NetworkHealth extends React.Component {
    constructor(props) {
        super(props);

        let monitors = [
            {
                "availability": false,
                "country": "中国",
                "monitorName": "陕西西安电信",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "辽宁沈阳联通",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "香港",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "上海市联通",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "湖南长沙电信",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "湖北武汉电信",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "上海市电信",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "河南濮阳联通",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "江苏无锡电信",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "重庆市电信",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "黑龙江哈尔滨联通",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "福建莆田电信",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "浙江金华移动",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "浙江金华教育网",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "广东深圳电信",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "上海市移动",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "四川成都电信",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "北京市联通",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "浙江绍兴电信",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "山东济南联通",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "辽宁大连联通",
                "responseIp": "10.0.0.1",
                "resptime": 0
            },
            {
                "availability": false,
                "country": "中国",
                "monitorName": "台湾台北",
                "responseIp": "10.0.0.1",
                "resptime": 0
            }
        ];
        const l = monitors.length;
        let index = randomBoth(1, l - 1),
            index2 = randomBoth(1, l - 1);

        for (let i = 0; i < l; i++) {
            if (i != index && i != index2) {
                monitors[i].availability = true;
                monitors[i].resptime = randomBoth(200, 400);
            }
            monitors[i].responseIp = '10.0.0.' + (i + 1);
        }

        this.state = {
            listsProps: {
                "curMapType": "china",
                "curTaskTab": "6921714",
                "data": [
                    {
                        "monitors": monitors,
                        "taskId": "6921714",
                        "taskName": "兵团云网络健康实时监控"
                    }
                ],
                "rotateFlag": false,
                "screen": {
                    "accountId": "1957",
                    "confJson": "{\"mapType\":1,\"showEnabledMonitor\":1,\"showDisabledMonitor\":1,\"twiceDisable\":1,\"taskList\":[\"6921714\",\"6921717\"]}",
                    "hasPass": false,
                    "id": 97,
                    "name": "兵团云网络健康实时监控",
                    "type": 1
                },
                handleChangeCurTaskTab: function updateCurTaskTab(type) {
                },
                handleGetMapdnsList: function getMapDnsList(screenId) {
                },
                handleGetMonitorList: function getMonitorList(screenId) {
                },
                handleSetRotateFlag: function setRotateFlag(flag) {
                }
            }
        };
    }


    render() {
        return <div className="network-health-screen">
            <DateTime/>

            <div className="network-health-title">兵团云网络健康实时监控</div>
            <div className="network-health-show">
                <div className="network-health-map">
                    <Map />
                </div>
                <NetworkHealthList {...this.state.listsProps}/>
            </div>
        </div>
    }
}

export default NetworkHealth