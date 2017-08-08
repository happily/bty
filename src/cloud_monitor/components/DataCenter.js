/**
 *  Author: jenny.pei
 *  Date: 17/5/6
 *  Description: Created by jenny on 17/5/6.
 */
import React from 'react'
class DataCenter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data || [];

        const progress = (value, range)=> {
            let _class = 'green-gradient';
            if (value >= range[0] && value <= range[1]) {
                _class = 'green-gradient';
            } else if (value > range[1] && value <= range[2]) {
                _class = 'yellow-gradient';
            } else if (value > range[2]) {
                _class = 'red-gradient';
            }

            return <span style={{width:'60px'}} className={_class}></span>;
        };

        return <div className="data-center">
            <div className="title">
                兵团云数据中心
            </div>
            <div className="data-pad">
                {data.map(function (item, index) {
                    return <span key={index}>
                        <div className="data_title">{item.name}</div>
                        <div className="border-bottom">
                            <div className="data_chart">
                                <div className="charts_img">
                                </div>
                                <div className="charts_text">
                                    <span>{item.score}</span>分
                                </div>
                            </div>
                            <div className="connecting">
                                <div>
                                    流量总数：&nbsp;&nbsp;
                                    {progress(item.networkdatas, [10, 25, 50])}
                                    <span className="gradient-text">{item.networkdatas} TB</span>
                                </div>
                                <div>
                                    网络访问量：
                                    {progress(item.networkcount, [1000, 2000, 3000])}
                                    <span className="gradient-text">{item.networkcount} 次</span>
                                </div>
                                <div>
                                    网络拦截数：
                                    {progress(item.networkPercent, [1, 3, 6])}
                                    <span className="gradient-text">{item.networkintercept} 次</span>
                                </div>
                            </div>
                            <div className="connecting1">
                                <div>
                                    承载总量：&nbsp;&nbsp;
                                    {progress(item.beardatas, [1, 100, 300])}
                                    <span className="gradient-text">{item.beardatas} 个</span>
                                </div>
                                <div>
                                    虚拟机总数：
                                    {progress(item.virtual, [1, 400, 700])}
                                    <span className="gradient-text">{item.virtual} 台</span>
                                </div>
                            </div>
                        </div>
                        </span>
                })}

            </div>

        </div>;

    }
}

export default DataCenter