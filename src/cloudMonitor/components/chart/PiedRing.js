/**
 * Name:
 * Created by authur on 17/4/6.
 */

import React,{PropTypes} from 'react'
import echarts from 'echarts'
import 'echarts/lib/chart/pie'

class PiedRing extends React.Component {
    constructor(props) {
        super(props);

    }

    interval = null;

    componentDidMount() {
        //初始化唯一的一个实例出来
        const element = this.refs.pie;
        const { theme } = this.props;
        const echartsInstance = echarts.init(element, theme, {});

        let pieOption = {
            color: ['#49d9fe', '#ffd800', '#fe2e26'],
            title: {
                text: '',
                x: 'center',
                y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: "#c1dbfd"
                }
            },
            tooltip: {
                show: false,
            },
            toolbox: {
                show: false,
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: ['优秀', '良好', '一般'],
                textStyle: {
                    color: '#ffffff'
                },
                itemWidth: 15,
                itemHeight: 8,

            },
            grid: {
                top: 20,
                bottom: 100
            },
            series: [
                //内环
                {
                    type: 'pie',
                    selectedMode: 'single',
                    hoverAnimation: false,
                    radius: ['50%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [],
                    z: 3,
                },
                //外环
                {
                    type: 'pie',
                    selectedMode: 'single',
                    hoverAnimation: false,
                    selectedOffset: 4,
                    radius: ['40%', '70%'],
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                            opacity: '0.15'
                        }
                    },
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [],
                    z: 2
                },

            ]
        }

        echartsInstance.setOption(pieOption);

    }

    componentWillUnmount() {
        const element = this.refs.pie;
        let echartsInstance = echarts.getInstanceByDom(element);
        echartsInstance.dispose();

        clearInterval(this.interval);
    }

    componentDidUpdate() {

        const element = this.refs.pie;

        let data = this.props.data || [];

        let count = 0;

        let outData = [];
        data.forEach(function (d) {
            let tmp = {
                name: d.name,
                value: d.value
            }
            count += (d.value - 0);
            outData.push(tmp);
        });

        let text = '';
        if (outData && outData.length) {
            text = '' + (outData[0].value / count * 100).toFixed(2) + '%\r\n' + outData[0].name
        }
        clearInterval(this.interval);

        let echartsInstance = echarts.getInstanceByDom(element);

        echartsInstance.setOption({
            title: {
                text: text,
            },
            series: [{
                data: data
            }, {
                data: outData
            }]
        });

        let selectedId = 0;
        let length = outData.length;
        let style = {
            normal: {
                color: '#00c9d6'
            }
        }
        if (outData && outData.length) {
            this.interval = setInterval(function () {
                let i = selectedId % length;
                outData.map(function (d) {
                    if (d.itemStyle) delete d.itemStyle;
                });
                outData[i].itemStyle = style;
                selectedId = selectedId + 1;
                echartsInstance.setOption({
                    title: {
                        text: '' + (outData[i].value / count * 100).toFixed(2) + '%\r\n' + outData[i].name,
                    },
                    series: [{
                        data: data
                    }, {
                        data: outData
                    }]
                });
            }, 1000);
        }
    }

    render() {
        return <div ref="pie" style={{height:'100%'}}></div>
    }
}


export default PiedRing