/**
 *  Author: harry.lang
 *  Date: 17/4/12
 *  Description: Created by harrylang on 17/4/12.
 */

import React,{PropTypes} from 'react'
import echarts from 'echarts'

class SingleRing extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const element = this.refs.chart;
        const { theme, option, total } = this.props;

        let echartsInstance = echarts.getInstanceByDom(element);
        //如果组件上的实例已经销毁 或者没有实例  则新建实例
        if (_.isNull(echartsInstance) || _.isUndefined(echartsInstance) || echartsInstance.isDisposed()) {
            echartsInstance = echarts.init(element, theme, {});
        }

        let _total = total || 100;
        let _option = $.extend(true, {
            series: [{
                type: 'pie',
                radius: ['80%', '100%'],
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter: function (item) {
                                    return item.value;
                                }
                            }

                        }
                    }, {
                        value: _total - option.series[0].data[0].value,
                        name: 'other',
                        itemStyle: {
                            normal: {color: '#ccc'},
                            label: {
                                normal: {
                                    show: false
                                }
                            }
                        }
                    }
                ]
            }]
        }, option);

        echartsInstance.setOption(_option);
    }

    componentDidUpdate() {

    }

    render() {
        return <div ref="chart" style={{height:'25px',width:'25px'}}></div>
    }
}

SingleRing.propTypes = {};

export default SingleRing