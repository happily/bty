/**
 *  Author: jenny.pei
 *  Date: 17/5/6
 *  Description: Created by jenny on 17/5/6.
 */
import React from 'react'
import Bar from './chart/Bar'
import Area from './chart/Area'

class ResourceDetail extends React.Component {
    constructor(props) {
        super(props);

        this.filter = this.filter.bind(this);
    }

    filter() {

    }

    render() {
        const {divisionData,currentName} = this.props;
        let _data = [];
        for (var i = 0, l = divisionData.length; i < l; i++) {
            if (divisionData[i].name == currentName) {
                _data = divisionData[i].data;
                break;
            }
        }
        console.log('-------------------')
        console.log(_data)
        console.log('-------------------')

        return <div className="resource-detail">
            <div className="clearfix">
                <div className="detail-5">
                    <div className="detail-title">
                        网络流量总数
                    </div>
                    <div style={{height:'100px'}}>
                        {(function () {
                            let seriesData = [], xAxisData = [];
                            _data.forEach(function (center) {
                                seriesData.push(center.networkdatas);
                                xAxisData.push(center.name);
                            });

                            return <Bar option={{
                            xAxis:{data:xAxisData},
                            yAxis:{axisLabel: {formatter: '{value}TB'}},
                            series:[{
                                data:seriesData
                            }]
                            }}/>
                        }())}
                    </div>
                </div>
                <div className="detail-5">
                    <div className="detail-title">
                        承载总量
                    </div>
                    <div style={{height:'100px'}}>
                        {(function () {
                            let seriesData = [], xAxisData = [];
                            _data.forEach(function (center) {
                                seriesData.push(center.beardatas);
                                xAxisData.push(center.name);
                            });

                            return <Bar option={{
                            xAxis:{data:xAxisData},
                            yAxis:{axisLabel: {formatter: '{value}个'}},
                            series:[{
                                data:seriesData
                            }]
                            }}/>
                        }())}
                    </div>
                </div>
            </div>
            <div className="clearfix">
                <div className="detail-5">
                    <div className="detail-title">
                        虚拟机总数
                    </div>
                    <div style={{height:'100px'}}>
                        {(function () {
                            let seriesData = [], xAxisData = [];
                            _data.forEach(function (center) {
                                seriesData.push(center.virtual);
                                xAxisData.push(center.name);
                            });

                            return <Bar option={{
                            xAxis:{data:xAxisData},
                            yAxis:{axisLabel: {formatter: '{value}台'}},
                            series:[{
                                data:seriesData
                            }]
                            }}/>
                        }())}
                    </div>
                </div>
                <div className="detail-5">
                    <div className="detail-title">
                        网络拦截总数
                    </div>
                    <div style={{height:'100px'}}>
                        {(function () {
                            let seriesData = [], xAxisData = [];
                            _data.forEach(function (center) {
                                seriesData.push(center.networkintercept);
                                xAxisData.push(center.name);
                            });

                            return <Bar option={{
                            xAxis:{data:xAxisData},
                            yAxis:{axisLabel: {formatter: '{value}次'}},
                            series:[{
                                data:seriesData
                            }]
                            }}/>
                        }())}
                    </div>
                </div>
            </div>
            <div className="web-detail">
                <div className="detail-title">
                    网络访问量
                </div>
                <div style={{height:'110px'}}>
                    {(function () {
                        let seriesData = [], legendData = [];
                        _data.forEach(function (center) {
                            seriesData.push({
                                name: center.name,
                                data: center.networktotals
                            });
                            legendData.push({name: center.name, icon: 'rect'});
                        });

                        return <Area option={{
                            legend:{data:legendData},
                            series:seriesData
                            }}/>
                    }())}
                </div>
            </div>

        </div>
    }
}

export default ResourceDetail