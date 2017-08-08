/**
 *  Author: harry.lang
 *  Date: 17/5/6
 *  Description: Created by harrylang on 17/5/6.
 */
let first = true;
function randomBoth(min, max) {
    var range = max - min;
    var rand = Math.random();
    var num = min + Math.round(rand * range); //四舍五入
    return num;
}
let systemData = {
    count: 337,
    appscalecount: [{value: 286, name: "优秀"}, {value: 33, name: "良好"}, {value: 18, name: "一般"}],
    clickTopData: [],
    operationsystemData: [],
    activesectorData: [],
    activebusinesssystem: [{value: 10, name: '0-1000'}, {value: 20, name: '1000-2000'}, {
        value: 30,
        name: '2000-3000'
    }, {value: 40, name: '3000+'},],
    servicestechnolog: [],
};
/*
 * servicestechnologybak:业务系统名称
 * people:人数
 * liveness:活跃度
 * frequency:频率
 *
 * */
/* 地图数据*/
let mapData = {
    mapDatas: [],
    lineDatas: [],
    lineDatas2: []
}
/* 云数据中心*/
let centerData = [];

/* XXX师数据*/
let divisionData = []
/*
 *   networkdatas:网络流量
 *   beardatas:承载总量
 *   networkcount:网络访问总量
 *   networkintercept:网络拦截数
 *   virtual:虚拟机
 *   score:评分
 *   networkPercent:百分比
 *
 *
 * */
/* 点击量最高的系统*/
let clickTop = ['应急指挥系统', '评标系统', '业务备案系统', '电子签章系统', '电子监察系统', 'GIS服务系统', '工作流转系统', '防汛系统', '档案管理系统', '部门预算系统', '核算系统', '信用信息平台', '集中支付系统', '公共卫生系统平台', '电子政务办公系统', '土地整治综合监测', '人口地理信息系统', '人口统筹分析系统', '人口系统管理系统', '校舍管理系统',];
let clickTop5Name = [];
let clickTop5value = [];
let clickTopDatabak = [];
for (let m = 0; m < 5; m++) {
    let k = Math.floor(Math.random() * 20)
    clickTop5Name.push(clickTop[k]);
}
for (let i = 0; i < 5; i++) {
    let top5obj = {};
    clickTop5value = [];
    for (let k = 0; k < 5; k++) {
        let j = 0
        j = Math.ceil(Math.random() * 10000)
        if (j < 5000) {
            j += 5000;
        }
        clickTop5value.push(j)
    }
    let clickMinValue = Math.min.apply(Math, clickTop5value);
    for (let n = 0; n < 2; n++) {
        clickTop5value.push(clickMinValue - Math.ceil(Math.random() * 200))
    }
    top5obj.name = clickTop5Name[i]
    top5obj.data = clickTop5value;
    clickTopDatabak.push(top5obj)
    systemData.clickTopData = clickTopDatabak;
}
/* 业务系统使用趋势*/
let operationsystemdata = [];
let operationsystemdatabak = [{name: "去年", data: []}, {name: "今年", data: []}, {name: "平均", data: []}];
for (let k = 0; k < 2; k++) {
    operationsystemdata = []
    for (let i = 0; i < 12; i++) {
        let operationdata = randomBoth(2000, 3000)
        operationsystemdata.push(operationdata)
    }
    operationsystemdatabak[k].data = operationsystemdata
}
let averageData = [];
for (let j = 0; j < 12; j++) {
    let averagenum = Math.floor((operationsystemdatabak[0].data[j] + operationsystemdatabak[1].data[j]) / 2)
    averageData.push(averagenum)
}
operationsystemdatabak[2].data = averageData;
systemData.operationsystemData = operationsystemdatabak;
export function system() {
    /*部门活跃度*/
    let activesector = {
        deptNames: ['办公厅', '血站', '财务局', '发改委', '国土局', '国资委', '计生委', '计生委1', '信息中心', '水利局',],
        deptNamesData: [2, 3, 12, 6, 9, 4, 14, 17, 35, 12],
        oldYear: [],
        nowYear: []
    }
    for (let i = 0; i < 10; i++) {
        activesector.oldYear.push(activesector.deptNamesData[i] * randomBoth(200, 220))
        activesector.nowYear.push(activesector.deptNamesData[i] * randomBoth(200, 220))
    }
    systemData.activesectorData = activesector;
    /* 业务系统活跃度table*/
    let servicestechnology = ['应急指挥系统', 'GIS服务系统', '纳里健康系统', '血液信息管理系统', '部门预算系统', '信用信息平台', '电子政务办公系统', '企业财务风险预警系统', '人口系统管理系统', '青少年管理系统', '公积金查询系统'];
    let servicestechnologybak = [];
    let servicestechnology5 = [];
    let people = [];
    let liveness = [];
    let frequency = [];
    let score = []
    for (let i = 0; i < 4; i++) {
        servicestechnology5.push(randomBoth(0, 10));
        people.push(randomBoth(200, 250));
        liveness.push(randomBoth(50, 100) / 100);
        frequency.push(randomBoth(10, 50) / 10);
        score.push(randomBoth(85, 100))
    }
    let qc = function (arr) {
        let n = [];
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
            if (!obj[arr[i]]) {
                n.push(arr[i]);
                obj[arr[i]] = 1
            }
        }
        return n
    }
    servicestechnology5 = qc(servicestechnology5)
    while (servicestechnology5.length < 5) {
        servicestechnology5.push(randomBoth(0, 10))
        servicestechnology5 = qc(servicestechnology5)
    }
    servicestechnology5.forEach(function (val) {
        servicestechnologybak.push(servicestechnology[val])
    })
    systemData.servicestechnolog = [];
    for (let i = 0; i < 4; i++) {
        var objs = {};
        objs.servicestechnologybak = servicestechnologybak[i]
        objs.people = people[i]
        objs.liveness = liveness[i]
        objs.frequency = frequency[i]
        objs.score = score[i]
        systemData.servicestechnolog.push(objs)
    }
    if (first) {

    } else {
        /* 应用概览*/
        let perfect = Math.floor(systemData.count * 0.85)
        let good = Math.floor(systemData.count * 0.1)
        let normal = 337 - perfect - good
        if (Math.random() > 0.5) {
            perfect += Math.ceil(Math.random() * 2)
            good += Math.ceil(Math.random() * 2)
            normal = 337 - perfect - good;
            systemData.appscalecount[0].value = perfect;
            systemData.appscalecount[1].value = good;
            systemData.appscalecount[2].value = normal;
        } else {
            perfect -= Math.ceil(Math.random() * 2)
            good -= Math.ceil(Math.random() * 2)
            normal = 337 - perfect - good;
            systemData.appscalecount[0].value = perfect;
            systemData.appscalecount[1].value = good;
            systemData.appscalecount[2].value = normal;
        }
        /* 点击量最高的系统*/
        for (let i = 0; i < 5; i++) {
            let randomtopvalue = randomBoth(50, 100)
            for (let k = 0; k < 7; k++) {
                if (Math.random() > 0.5) {
                    clickTopDatabak[i].data[k] += randomtopvalue
                    if (clickTopDatabak[i].data[k] > 10000) {
                        clickTopDatabak[i].data[k] -= randomtopvalue
                    }
                } else {
                    clickTopDatabak[i].data[k] -= randomtopvalue
                }
            }
        }
        /* 业务系统使用趋势*/
        for (let k = 0; k < 2; k++) {
            for (let i = 0; i < 12; i++) {
                let operationdatab = randomBoth(0, 100)
                if (Math.random() > 0.5) {
                    operationsystemdatabak[k].data[i] += operationdatab;
                    if (operationsystemdatabak[k].data[i] > 3000) {
                        operationsystemdatabak[k].data[i] -= operationdatab
                    }
                } else {
                    operationsystemdatabak[k].data[i] -= operationdatab;
                    if (operationsystemdatabak[k].data[i] < 2000) {
                        operationsystemdatabak[k].data[i] += operationdatab
                    }
                }
            }
        }
        let averageDatabak = [];
        for (let j = 0; j < 12; j++) {
            let averagenum = Math.floor((operationsystemdatabak[0].data[j] + operationsystemdatabak[1].data[j]) / 2);
            averageDatabak.push(averagenum)
        }
        operationsystemdatabak[2].data = averageDatabak;
        systemData.operationsystemData = operationsystemdatabak;
    }
    first = false;
    return systemData;
}
let mapdataname = ['一师阿拉尔', '二师铁门关', '三师图木舒克', '四师可克达拉', '五师双河市', '六师五家渠', '七师奎屯', '八师石河子', '九师额敏', '十师北屯', '十一师乌鲁木齐', '十二师乌鲁木齐', '十三师哈密', '十四师昆玉', '克拉玛依', '五家渠', '乌鲁木齐']
export function monitor() {
    /* 地图数据*/
    let mapdatas = [];
    let linedatas = [];
    mapdataname.forEach(function (val, index) {
        let mapobj = {};
        let lineobj1 = {}
        let lineobj2 = {}
        let lineobj3 = {}
        mapobj.monitorName = val;
        mapobj.availability = true;
        mapdatas.push(mapobj)
        if (index < 14) {
            lineobj1.from = val;
            lineobj1.to = "克拉玛依";
            linedatas.push(lineobj1)
            lineobj2.from = val;
            lineobj2.to = "五家渠";
            linedatas.push(lineobj2)
            lineobj3.from = val;
            lineobj3.to = "乌鲁木齐";
            linedatas.push(lineobj3)
        }
    })
    let linedatas2 = [{
        "from": "克拉玛依", "to": "乌鲁木齐"
    }, {
        "from": "五家渠", "to": "乌鲁木齐"
    }, {
        "from": "克拉玛依", "to": "五家渠"
    }];
    let numb = randomBoth(0, 13)
    mapdatas[numb].availability = false;
    mapData.mapDatas = mapdatas;
    mapData.lineDatas = linedatas;
    mapData.lineDatas2 = linedatas2;
    if (false) {

    } else {
        numb = randomBoth(0, 13)
        mapdatas.forEach(function (val, index) {
            val.availability = true;
        })
        mapdatas[numb].availability = false;
    }
    first = false;
    //console.log(JSON.stringify(mapData))
    return mapData
}

export function monitorResource() {
    centerData = [];
    divisionData = [];
    /* 乌鲁木齐数据*/
    let wlnetworkdatas = randomBoth(10, 80);
    let wlbeardatas = randomBoth(290, 350);
    let wlnetworkcount = wlnetworkdatas * randomBoth(1000, 4000);
    let wlnetworkintercept = Math.round(wlnetworkdatas * (randomBoth(1, 10) / 100));
    let wlvirtual = 827;
    let wlobj = {};
    wlobj.name = "乌鲁木齐数据中心"
    wlobj.networkdatas = wlnetworkdatas
    wlobj.beardatas = wlbeardatas
    wlobj.networkcount = wlnetworkcount
    wlobj.networkintercept = wlnetworkintercept
    wlobj.virtual = wlvirtual
    wlobj.score = randomBoth(90, 99)
    wlobj.networkPercent = wlnetworkdatas * (randomBoth(1, 10) / 100)
    centerData.push(wlobj);
    /* 克拉玛依数据中心*/
    let klobj = {}
    let klnetworkdatas = Math.round(wlnetworkdatas * 0.3);
    let klbeardatas = Math.round(wlbeardatas * 0.3);
    let klnetworkcount = Math.round(wlnetworkcount * 0.3);
    let klnetworkintercept = Math.round(wlnetworkintercept * 0.3);
    let klvirtual = Math.round(wlvirtual * 0.3);
    klobj.name = "克拉玛依数据中心"
    klobj.networkdatas = klnetworkdatas
    klobj.beardatas = klbeardatas
    klobj.networkcount = klnetworkcount
    klobj.networkintercept = klnetworkintercept
    klobj.virtual = klvirtual
    klobj.score = randomBoth(90, 99)
    klobj.networkPercent = wlnetworkdatas * (randomBoth(1, 10) / 100) * 0.3
    centerData.push(klobj)
    /* 五家渠数据中心*/
    let wqjobj = {};
    let wjqnetworkdatas = Math.round(wlnetworkdatas * 0.35);
    let wjqbeardatas = Math.round(wlbeardatas * 0.35);
    let wjqnetworkcount = Math.round(wlnetworkcount * 0.35);
    let wjqnetworkintercept = Math.round(wlnetworkintercept * 0.35);
    let wjqvirtual = Math.round(wlvirtual * 0.35);
    wqjobj.name = "五家渠数据中心"
    wqjobj.networkdatas = wjqnetworkdatas
    wqjobj.beardatas = wjqbeardatas
    wqjobj.networkcount = wjqnetworkcount
    wqjobj.networkintercept = wjqnetworkintercept
    wqjobj.virtual = wjqvirtual
    wqjobj.score = randomBoth(90, 99)
    wqjobj.networkPercent = wlnetworkdatas * (randomBoth(1, 10) / 100) * 0.35
    centerData.push(wqjobj)
    let divisionobj;
    let wlcenter;
    let klcenter;
    let wjcenter;
    let percent = [0.03, 0.17, 0.03, 0.1, 0.03, 0.03, 0.13, 0.04, 0.08, 0.18, 0.03, 0.06, 0.03, 0.06]
    percent.forEach(function (val, index) {
        divisionobj = {};
        divisionobj.data = []
        wlcenter = {};
        klcenter = {};
        wjcenter = {};
        divisionobj.name = mapdataname[index]
        /* 所属乌鲁木齐*/
        wlcenter.networkdatas = Math.round(wlnetworkdatas * val);
        wlcenter.beardatas = Math.round(wlbeardatas * val);
        wlcenter.networkcount = Math.ceil(wlnetworkcount * val);
        wlcenter.networkintercept = Math.ceil(wlnetworkintercept * val);
        wlcenter.virtual = Math.round(wlvirtual * val);
        wlcenter.score = randomBoth(90, 99);
        wlcenter.name = "乌鲁木齐";
        wlcenter.networktotals = []
        let wlnetworktotal = 0;
        /* 所属克拉玛依*/
        klcenter.networkdatas = Math.round(klnetworkdatas * val);
        klcenter.beardatas = Math.round(klbeardatas * val);
        klcenter.networkcount = Math.ceil(klnetworkcount * val);
        klcenter.networkintercept = Math.ceil(klnetworkintercept * val);
        klcenter.virtual = Math.round(klvirtual * val);
        klcenter.score = randomBoth(90, 99);
        klcenter.name = "克拉玛依";
        klcenter.networktotals = [];
        let klnetworktotal = 0;
        /* 所属五家渠*/
        wjcenter.networkdatas = Math.round(wjqnetworkdatas * val);
        wjcenter.beardatas = Math.round(wjqbeardatas * val);
        wjcenter.networkcount = Math.ceil(wjqnetworkcount * val);
        wjcenter.networkintercept = Math.ceil(wjqnetworkintercept * val);
        wjcenter.virtual = Math.round(wjqvirtual * val);
        wjcenter.score = randomBoth(90, 99);
        wjcenter.name = "五家渠";
        wjcenter.networktotals = [];
        let wjnetworktotal = 0;
        for (let i = 0; i < 7; i++) {
            wjnetworktotal = 0;
            wlnetworktotal = 0;
            klnetworktotal = 0;
            if (Math.random() > 0.5) {
                wjnetworktotal += (Math.round(wjqnetworkdatas * val) + randomBoth(0, 50))
                wlnetworktotal += (Math.round(wlnetworkdatas * val) + randomBoth(0, 50))
                klnetworktotal += (Math.round(klnetworkdatas * val) + randomBoth(0, 50))
            } else {
                if ((Math.round(wjqnetworkdatas * val) - randomBoth(0, 100)) < 0 || (Math.round(wlnetworkdatas * val) - randomBoth(0, 100)) < 0 || (Math.round(klnetworkdatas * val) - randomBoth(0, 100)) < 0) {
                    wjnetworktotal += (Math.round(wjqnetworkdatas * val) + randomBoth(0, 50))
                    wlnetworktotal += (Math.round(wlnetworkdatas * val) + randomBoth(0, 50))
                    klnetworktotal += (Math.round(klnetworkdatas * val) + randomBoth(0, 50))
                } else {
                    wjnetworktotal += (Math.round(wjqnetworkdatas * val) - randomBoth(0, 50))
                    wlnetworktotal += (Math.round(wlnetworkdatas * val) - randomBoth(0, 50))
                    klnetworktotal += (Math.round(klnetworkdatas * val) - randomBoth(0, 50))
                }
            }
            wjcenter.networktotals.push(wjnetworktotal)
            wlcenter.networktotals.push(wlnetworktotal)
            klcenter.networktotals.push(klnetworktotal)
        }
        divisionobj.data.push(wlcenter);
        divisionobj.data.push(klcenter);
        divisionobj.data.push(wjcenter);
        divisionData.push(divisionobj);
    })
    if (first) {

    } else {

    }
    first = false;
    console.log(centerData)
    console.log(divisionData)
    return {centerData: centerData, divisionData: divisionData}
}