/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by Jenny on 17/4/17.
 */
import React from 'react';
//var Slider = require('react-slick');
import {Carousel} from 'antd'

import Progress from './Progress'

class MapTable extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prePrps) {

    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    /*shouldComponentUpdate(nextProps) {
     return false;
     }*/

    render() {
        const limit = 5;
        let _list = [],
            list = this.props.data;

        list.forEach(function (item, index) {
            item.monitors.forEach(function (monitor) {
                _list.push({
                    health: monitor.availability,
                    name: item.taskName,
                    resptime: monitor.resptime,
                    monitorName: monitor.monitorName,
                    availability: monitor.availability
                });
            })
        });

        let tableResult = [];
        _list.forEach(function (item, index) {
            let i = parseInt(index / limit);
            tableResult[i] = tableResult[i] || [];
            tableResult[i].push(item);
        });

        const drawRow = (item, i)=> {
            let _class = 'green';

            if (!item.availability) {
                _class = 'red';
            }
            return <tr className={_class} key={i}>
                <td>
                    <div style={{position:'relative',top:5}}><Progress value={item.health?100:0}/></div>
                </td>
                <td className="white">{item.name}</td>
                <td>{item.resptime}ms</td>
                <td>{item.monitorName}</td>
            </tr>
        };


        return <div className="map-table">
            <div className="table">
                {(function () {
                    if (tableResult && tableResult.length > 0) {
                        return <Carousel
                            dots={false}
                            autoplay={true}
                            vertical="true"
                            >

                            {tableResult.map(function (items, index) {
                                return <div key={index} style={{height:220}}>
                                    <table className="map-table-slide">
                                        <thead>
                                        <tr>
                                            <th>健康度</th>
                                            <th>业务名称</th>
                                            <th>响应时间</th>
                                            <th>监测点</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {items.map(function (item, i) {
                                            return drawRow(item, i);
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            })}
                        </Carousel>
                    }
                }())}

            </div>
        </div>
    }
}

export default MapTable