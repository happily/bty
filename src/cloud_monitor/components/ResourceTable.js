/**
 *  Author: jenny.pei
 *  Date: 17/5/6
 *  Description: Created by jenny on 17/5/6.
 */
import React from 'react'
import SingleRing from 'SRC_PATH/components/SingleRing'
import { Carousel } from 'antd';

class ResourceTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const data = this.props.data || [];

        const score = (data)=> {
            let color = '';
            if (data < 90) {
                color = '#fd5743';
            } else if (data >= 90 && data < 95) {
                color = '#ffd800';
            } else if (data > 95) {
                color = '#49d9fe';
            }
            return <div style={{width:25,height:25,margin:-4}}><SingleRing option={{
                              series:[{
                                data: [{
                                  value: data,
                                  name: '评分',
                                  itemStyle:{normal:{color:color}}
                                }]
                              }]
                            }}/>
            </div>
        };

        const _data = [];
        data.forEach(function (division, index) {
            const i = parseInt(index / 2);
            _data[i] = _data[i] || [];
            _data[i].push(division);
        });

        return <div className="resource_pad">
            <Carousel
                dots={false}
                autoplay={true}
                vertical="true"
                >
                {_data.map(function (group, index) {
                    return <div style={{height:440,overflow:'hidden'}} key={index}>
                        {group.map(function (item, i) {
                            return <table key={i}>
                                <thead>
                                <tr>
                                    <th colSpan="7">{item.name}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>所属中心</td>
                                    <td>网络流量</td>
                                    <td>访问量</td>
                                    <td>拦截数</td>
                                    <td>承载总量</td>
                                    <td>虚拟机</td>
                                    <td>评分</td>
                                </tr>

                                {item.data.map(function (center, i) {
                                    return <tr key={i}>
                                        <td>{center.name}</td>
                                        <td>{center.networkdatas}TB</td>
                                        <td>{center.networkcount}次</td>
                                        <td>{center.networkintercept}次</td>
                                        <td>{center.beardatas}个</td>
                                        <td>{center.virtual}台</td>
                                        <td>
                                            {score(center.score)}
                                        </td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        })}

                    </div>
                })}

            </Carousel>
        </div>
    }
}

export default ResourceTable