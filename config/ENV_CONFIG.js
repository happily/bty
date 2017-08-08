/**
 全局配置文件  应用过程中不要进行修改.
 */
var ENV = (function () {

    return {
        // 数据频率,默认1分钟
        intervalTime: 200000,
        //intervalTime: 60 * 1000,
        // 接口地址
        STATISTICS: 'http://10.0.1.178:7700/v1/dataModel/model/query?_random=0.8060691302402536&shareCode=yqEzMn',//网络设备统计
        MAP_LOGIN: 'http://10.0.1.178:8080/api/login/login',//地图登录
        MAP_TASK_LIST: 'http://10.0.1.178:8080/api/v1/dataModel/jkb/taskList',//任务列表获取
        MAP_TASKS: 'http://10.0.1.178:8080/api/v1/dataModel/jkb/datas',//任务详情获取
        PEOPLE_URL: 'http://43.250.238.249:7700/static/screen/index.html?id=4&sc=FN3Av2', //人民网大屏url
        TOPO_URL: 'https://www.baidu.com', // 网络设备拓扑图外链
        MAP_LOGIN_INFO: {   // 获取地图以及健康度列表数据的登录账号密码
            USERNAME: 'manager@admin.com',
            PASSWORD: '123456'
        },
        STATISTICS_ID: '5',

        /**
         * 大屏参数设置
         */
        screen: {
            scrollTime: 5,    //定时滚动监测点列表的时间
            queryDataTime: 300, //请求新监测点数据的时间
            model: [
                {
                    id: 1,
                    title: '网络健康大屏',
                    className: 'network-health-template',    //模板组件名称
                }
            ],
            flushInteval: 20 * 1000, //大屏任务列表刷新时间
            flushMonitorInterval: 3000, //大屏监测点翻页间隔
            defaultMapType: 'china', //默认地图类型
            mapTypes: [              //地图类型枚举
                {id: 0, name: 'china'},
                {id: 1, name: 'world'}
            ],
            shareUrl: window.location.origin + '/#/share/', //大屏分享地址
        },
        exceptmodules: ['share'],    //权限校验例外模块.
    }
})();
