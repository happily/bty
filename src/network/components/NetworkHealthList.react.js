/**
 *  Author: harry.lang
 *  Date: 17/3/27
 *  Description: Created by harrylang on 17/3/27.
 */
import React from 'react'
import { Tabs, Table, Carousel, Row, Col } from 'antd'
import { arrayRange, groupHeap, eventManager } from 'SRC_PATH/utils/util'
import  SlickCarousel  from 'SRC_PATH/components/SlickCarousel';


const TabPane = Tabs.TabPane;

class List extends React.Component {
    constructor(props) {
        super(props);
        this.adaptive = this.adaptive.bind(this);

    }

    onChange = (activeKey) => {

        //更新掉当前任务编号
        let handleChangeCurTaskTab = this.props.handleChangeCurTaskTab;
        handleChangeCurTaskTab(activeKey);
        //设置当前的轮播标志为true
        let handleSetRotateFlag = this.props.handleSetRotateFlag;
        handleSetRotateFlag(true);
    };

    adaptive() {
        const carouselMonitor = ReactDOM.findDOMNode(this.refs.carouselMonitors);
        $(carouselMonitor).find('.slick-slide').css('width', $(carouselMonitor).width());
    }

    componentDidMount() {
        eventManager.on('app-slider-toggle', this.adaptive);
    }

    componentWillUnmount() {
        eventManager.off('app-slider-toggle', this.adaptive);
    }

    //如果不需要轮播,则befortChange是最合理的触发事件.
    beforeChange = (currentSlide, nextSlide) => {

        const self = this;
        const monitorList = this.props.data || [];
        const curTask = this.props.curTaskTab || '';
        let handleChangeCurTaskTab = this.props.handleChangeCurTaskTab;
        //如果当前id大于或者等于下一个id,则跳转
        if (!_.isNull(currentSlide) && !_.isNull(nextSlide) && (currentSlide >= nextSlide)) {

            let nextTaskIdIndex = 0;
            let nextTaskId = 0;
            monitorList.forEach((item, index) => {
                if (item.taskId == curTask) {
                    //有下一个,则取下一个; 如果到队尾,则调到队列开头.
                    nextTaskIdIndex = (monitorList.length > index + 1 ) ? index + 1 : ((index + 1) == monitorList.length) ? 0 : index;
                }
            });

            nextTaskId = monitorList[nextTaskIdIndex].taskId;

            if (nextTaskId && nextTaskId > 0) {
                //更新掉当前任务编号
                handleChangeCurTaskTab(nextTaskId);
            }
        }
    }

    //如果想实现轮播,则调用afterChange事件,因为必须要change完成以后,才能触发.
    afterChange = (currentSlide)=> {
        const self = this;
        const monitorList = this.props.data || [];
        const curTask = this.props.curTaskTab || '';
        let handleChangeCurTaskTab = this.props.handleChangeCurTaskTab;
        let handleSetRotateFlag = this.props.handleSetRotateFlag;
        if (!this.props.rotateFlag) {
            //如果当前id大于或者等于下一个id,则跳转
            if (!_.isNull(currentSlide) && currentSlide == 0) {

                let nextTaskIdIndex = 0;
                let nextTaskId = 0;
                monitorList.forEach((item, index) => {
                    if (item.taskId == curTask) {
                        //有下一个,则取下一个; 如果到队尾,则调到队列开头.
                        nextTaskIdIndex = (monitorList.length > index + 1 ) ? index + 1 : ((index + 1) == monitorList.length) ? 0 : index;
                    }
                });

                nextTaskId = monitorList[nextTaskIdIndex].taskId;

                if (nextTaskId && nextTaskId > 0) {
                    //更新掉当前任务编号
                    handleChangeCurTaskTab(nextTaskId);
                }
            }
        } else {
            handleSetRotateFlag(false);
        }

    }

    render() {

        const monitorList = this.props.data || [];

        const curMapType = this.props.curMapType || ENV.screen.defaultMapType;
        console.log(this.props)
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, record) => {
                    return <span className={record.availability?'':'text-red'}>{text}</span>
                }
            }, {
                title: '监测点',
                dataIndex: 'monitorName',
                key: 'monitorName',
                render: (text, record) => {
                    return <span className={record.availability?'':'text-red'}>{text}</span>
                }
            }, {
                title: '响应IP',
                dataIndex: 'responseIp',
                key: 'responseIp',
                render: (text, record) => {
                    return <span className={record.availability?'':'text-red'}>{text}</span>
                }
            }, {
                title: '响应时间',
                dataIndex: 'resptime',
                key: 'resptime',
                render: (text, record) => {
                    if (record.availability) {
                        return <span className={record.availability?'':'text-red'}>{record.resptime + 'ms'}</span>
                    } else {
                        return <span className={record.availability?'':'text-red'}>-ms</span>
                    }

                }
            }, {
                title: '可用性',
                dataIndex: 'availability',
                key: 'availability',
                render: (text, record) => {
                    return <span className={text?'':'text-red'}>{text ? '可用' : '不可用'}</span>
                }
            }];
        //获取当前监控项目的监测点列表
        let data = [];
        let taskId = this.props.curTaskTab || '';
        if (parseInt(taskId) > 0) {
            monitorList.forEach((node)=> {
                if (node.taskId == taskId && node.monitors && node.monitors.length) {
                    //先清空一遍data
                    data = [];
                    let monitors = node.monitors;
                    //fix bug 353:如果当前地图为中国地图,则只显示中国的监测点数据
                    if (curMapType == 'china') {
                        monitors = monitors.filter((item) => {
                            return (item.country == '中国') ? true : false;
                        });
                    }
                    //对数据按照可用性进行排序
                    monitors = groupHeap(monitors, 'availability');
                    if (monitors.length && monitors[0].availability) {
                        monitors.reverse();
                    }
                    monitors.forEach((monitor) => {
                        data.push({
                            key: data.length + 1,
                            index: data.length + 1,
                            monitorName: monitor.monitorName,
                            responseIp: monitor.responseIp,
                            resptime: monitor.resptime,
                            availability: monitor.availability
                        });
                    });
                }
            });
        }


        // 渲染项目列表
        let lists = [];
        if (data.length) {
            //重置lists
            lists = [];
            for (let i = 0, len = data.length; i < len; i += 10) {
                //如果当前不足10条,则需要分开处理
                //<=5条时
                if ((i + 5) >= len) {
                    lists.push(<Row key={i}>
                        <Col span={12}>
                            <Table dataSource={arrayRange(data,i,i+5)} columns={columns} pagination={false}/>
                        </Col>
                        <Col span={12}>
                        </Col>
                    </Row>);
                } else {
                    lists.push(<Row key={i}>
                        <Col span={12}>
                            <Table dataSource={arrayRange(data,i,i+5)} columns={columns} pagination={false}/>
                        </Col>
                        <Col span={12}>
                            <Table dataSource={arrayRange(data,i+5,i+10)} columns={columns} pagination={false}/>
                        </Col>
                    </Row>);
                }
            }
        } else {
            //置入一个空行数据

            lists.push(<Row key={1}>
                <Col span={24}>
                    暂无监测点数据
                </Col>
            </Row>);

        }

        let slicksetting = {
            afterChange: this.afterChange
        }
        /*
         //ant的跑马灯不支持自定义next和prev,改用原生react-slick
         let carouselMonitors = (
         <Carousel dots={false}
         vertical={true}
         autoplay={true}
         autoplaySpeed={ENV.screen.flushMonitorInterval}
         pauseOnHover={false}
         beforeChange={this.beforeChange}
         >
         {lists}
         </Carousel>
         )
         */

        let carouselMonitors = '';

        if (lists && lists.length) {
            carouselMonitors = <SlickCarousel setting={slicksetting} lists={lists}></SlickCarousel>
        }

        //有监控项目的时候显示
        if (monitorList.length > 0) {
            return <div className="network-health-list">
                <div className="network-health-list-inner">
                    <Tabs
                        onChange={this.onChange}
                        activeKey={this.props.curTaskTab}
                        type="editable-card"
                        hideAdd
                        pagination={false}
                        >
                        { monitorList.map(pane =>
                                <TabPane tab={pane.taskName} key={pane.taskId+''} closable={false}></TabPane>
                        )}
                    </Tabs>

                    { carouselMonitors }

                </div>
            </div>
        } else {
            return <div></div>
        }

    }
}

export default List