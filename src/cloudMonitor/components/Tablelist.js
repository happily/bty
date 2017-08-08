/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by happily on 17/5/6.
 */
import React from 'react';
import SingleRing from 'SRC_PATH/components/SingleRing' //评分组件

import echarts from 'echarts'

class Tablelist extends React.Component {
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

        //servicestechnolog:[],

        /*
         * servicestechnologybak:业务系统名称
         * people:人数
         * liveness:活跃度
         * frequency:频率
         * score:评分*/
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
            return <SingleRing option={{
                              series:[{
                                data: [{
                                  value: data,
                                  name: '评分',
                                  itemStyle:{normal:{color:color}}
                                }]
                              }]
                            }}/>
        };

        return <div className="right-content">
            <div className="div-table">
                <table>
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>业务系统名称</th>
                        <th>人数</th>
                        <th>活跃度</th>
                        <th>频率</th>
                        <th>评分</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(function (item, i) {
                        return <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.servicestechnologybak}</td>
                            <td>{item.people}人</td>
                            <td>{item.liveness}</td>
                            <td>{item.frequency}</td>
                            <td>
                                <div style={{width:26,height:26,margin:-4}}>
                                    {score(item.score)}
                                </div>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    }
}

export default Tablelist