/**
 *  Author: harry.lang
 *  Date: 17/4/14
 *  Description: Created by harrylang on 17/4/14.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

// 样式操作
import '../resource/index.less';

import {system,monitor,monitorResource} from  '../utils/data'

// system();
monitor();
monitorResource();

ReactDOM.render(
  <div>test</div>,
    document.getElementById('root'),
    function () {

    }
);