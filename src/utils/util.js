/**
 * Name:
 * Created by authur on 17/3/16.
 */

/**
 * 函数:将拉平数据转为树
 * input: [{id,pid,name},{}....]
 * extra : 如果生成树节点需要带有其他属性,则放到这里
 * output:[{...,children:[...]}]
 */

export function treeMenu(array, options, extra) {
    this.tree = array || [];

    this.id = options.id || 'id';
    this.pid = options.pid || 'pid';
    this.name = options.name || 'name';
    //确保extra为数组类型
    this.extra = extra || [];
    if (_.isString(this.extra)) {
        this.extra = [this.extra];
    }

    this.groups = {};
};

treeMenu.prototype = {
    init: function (rootId) {
        this.group();
        return this.getDom(this.groups[rootId]);
    },
    //数组按照pID分组
    group: function () {
        for (var i = 0; i < this.tree.length; i++) {
            if (this.groups[this.tree[i][this.pid]]) {
                this.groups[this.tree[i][this.pid]].push(this.tree[i]);
            } else {
                this.groups[this.tree[i][this.pid]] = [];
                this.groups[this.tree[i][this.pid]].push(this.tree[i]);
            }
        }
    },

    getDom: function (nodelist) {
        if (!nodelist || nodelist.length <= 0) {
            return [];
        }
        var tree = [];
        for (var i = 0; i < nodelist.length; i++) {

            var nodeid = nodelist[i][this.id];
            var tmpnode = {};
            tmpnode[this.id] = nodeid;
            tmpnode.key = tmpnode.value = '' + nodeid;
            tmpnode.label = tmpnode[this.name] = nodelist[i][this.name];
            tmpnode[this.pid] = nodelist[i][this.pid];
            if (_.isArray(this.extra)) {
                this.extra.map(function (prop) {
                    tmpnode[prop] = nodelist[i][prop];
                })
            }

            tmpnode.children = this.getDom(this.groups[nodeid]);

            tree.push(tmpnode);
        }
        return tree;
    }
}
/*
 var flatData = [
 {
 "deptId": 1,
 "name": "海尔1",
 "parentId": 0
 },
 {
 "deptId": 2,
 "name": "海尔2",
 "parentId": 1
 },
 {
 "deptId": 3,
 "name": "海尔11",
 "parentId": 1
 },
 {
 "deptId": 4,
 "name": "海尔12",
 "parentId": 1
 },
 {
 "deptId": 5,
 "name": "海尔121",
 "parentId": 4
 },
 {
 "deptId": 5,
 "name": "海尔122",
 "parentId": 4
 }
 ];

 var tree = new treeMenu(flatData,{id:"deptId", name:'name', pid:"parentId"});
 console.log(tree.init(0));

 */


/**
 * 判断一个对象的值是否等于另外一个对象的某个字段的值
 * @param item1
 * @param item2
 */
export function isEqualToObject(src, target) {
    if (_.isObject(src) && _.isObject(target)) {
        for (let item in src) {
            if (src[item] != target[item]) return false;
        }
        return true;
    }
    return false;

}

/**
 * 将节点dom树转为拉平的数组
 */
function getChildren(tree) {
    if (_.isNull(tree) || _.isUndefined(tree)) return [];
    let flatdata = [];

    tree.forEach(function (node) {
        if (node.key) {
            flatdata.push(node.key);
            let children = node.props.children;
            flatdata = [...flatdata, ...getChildren(children)];
        }
    })
    return flatdata;
}
export const treeToFlat = (tree) => {
    if (_.isNull(tree)) return [];
    if (!_.isArray(tree)) tree = [tree];
    return getChildren(tree);
}

/**
 * 获取对象keys
 * @param obj
 * @returns {Array}
 */
export const getObjKeys = (obj)=> {
    var data = [];

    if (Object && Object.keys) {
        data = Object.keys(obj);
    } else {
        for (var key in obj) {
            data.push(key);
        }
    }
    return data;
};

/**
 * 获取指定数组指定范围内项目
 * @param array
 * @param start 起始下标
 * @param end   结束下标
 * @returns {Array}
 */
export function arrayRange(array, start, end) {
    let arr = [];
    if (_.isNull(array) || _.isUndefined(array) || array.length < start) return arr;
    //控制结束位置
    if (array.length < end) end = array.length;
    for (let i = start; i < end; i++) {
        arr.push(array[i]);
    }
    return arr;
}


/**
 堆排序分组函数
 按照sortField字段进行分堆排序
 */
export function groupHeap(data, sortField) {
    let groups = [];
    for (let i = 0; i < data.length; i++) {
        //如果判断字段为boolean类型,则转为0 1
        let tmp = data[i][sortField];

        if (_.isBoolean(tmp)) {
            tmp = tmp ? 1 : 0;
        }
        if (groups[tmp]) {
            groups[tmp].push(data[i]);
        } else {
            groups[tmp] = [];
            groups[tmp].push(data[i]);
        }
    }
    let returndata = [];
    groups.forEach((group)=> {
        returndata = returndata.concat(group);
    })
    return returndata;
}

/**
 * 事件管理
 *
 * ------使用方式------
 * 1、添加事件监听：
 *  eventManager.on('timeChange',function(){
 *      alert('Time is change!');
 *  });
 *
 * 2、触发指定事件监听：
 *  eventManager.emit('timeChange',...args);
 *
 * 3、game over!!!!!
 * @type {{events: {}, on: Function, emit: Function, off: Function}}
 */
export const eventManager = {
    /**
     * 存储事件监听信息
     */
    events: {},
    /**
     * 添加监听
     * @param name
     * @param fn
     */
    on: function (name, fn) {
        this.events[name] = this.events[name] || [];
        this.events[name].push(fn);

        return this;
    },
    /**
     * 触发事件
     * @param name
     * @returns {Event}
     */
    emit: function (name) {
        if (name) {
            var fns = this.events[name] || [];
            var params = [].slice.call(arguments, 1);
            for (var i = 0, l = fns.length; i < l; i++) {
                fns[i].apply(this, params);
            }
        }
        return this;
    },
    /**
     * 移除事件监听
     * @param name
     * @returns {eventManager}
     */
    off: function (name, fn) {
        var events = this.events[name];
        if (name && events) {
            if (fn) {
                for (var i = 0, l = events.length; i < l; i++) {
                    if (events[i] == fn) {
                        events.splice(i, 1);
                        break;
                    }
                }
            } else {
                delete this.events[name];
            }
        }
        return this;
    }
};

/**
 * 生成指定范围内随机数
 * @param min
 * @param max
 * @returns {*}
 */
export function randomBoth(min, max) {
    var range = max - min;
    var rand = Math.random();
    var num = min + Math.round(rand * range); //四舍五入
    return num;
}