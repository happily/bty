/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by harrylang on 17/4/17.
 */
import React from 'react'
import equi1 from './img/equi1.png'
import equi2 from './img/equi2.png'
import equi3 from './img/equi3.png'
import equi4 from './img/equi4.png'
import $ from 'jquery'  //jquery

class Statistics extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        return <div className="statistics">
            <div className="title">
                网络设备统计(<a href={ENV.TOPO_URL}>拓扑</a>)
            </div>

            <table className="statistics_table">
                <thead>
                <tr>
                    <th>设备类别</th>
                    <th>&nbsp;</th>
                    <th>设备名称</th>
                    <th>设备总数</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>网络<br/>设备</td>
                    <td><img src={equi1} alt=""/></td>
                    <td className="font-left">
                        <p>路由器</p>

                        <p>交换机</p>

                        <p>光纤交换机</p>
                    </td>

                    <td>

                        <p>{this.props.route}</p>

                        <p>{this.props.swit}</p>

                        <p>{this.props.fiber}</p>
                    </td>
                </tr>
                <tr>
                    <td>安全<br/>设备</td>
                    <td><img src={equi2} alt=""/></td>
                    <td className="font-left">
                        <p>防火墙</p>

                        <p>入侵检测</p>

                        <p>安全网闸</p>
                    </td>
                    <td>
                        <p>{this.props.firewall}</p>

                        <p>{this.props.detection}</p>

                        <p>{this.props.gatekeeper}</p>
                    </td>
                </tr>
                <tr>
                    <td>存储<br/>设备</td>
                    <td><img src={equi3} alt=""/></td>
                    <td className="font-left">
                        <p>磁盘阵列</p>

                        <p>网络存储器</p>

                        <p>磁带库</p>
                    </td>
                    <td>
                        <p>{this.props.disk}</p>

                        <p>{this.props.memory}</p>

                        <p>{this.props.tape}</p>
                    </td>
                </tr>
                <tr>
                    <td>计算机<br/>设备</td>
                    <td><img src={equi4} alt=""/></td>
                    <td className="font-left">
                        <p>服务器</p>

                        <p>客户机</p>

                        <p>虚拟机</p>
                    </td>
                    <td>
                        <p>{this.props.server}</p>

                        <p>{this.props.client}</p>

                        <p>{this.props.virtual}</p>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    }
}

export default Statistics