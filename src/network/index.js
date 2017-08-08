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

import NetworkHealth from './components/NetworkHealth.react'

ReactDOM.render(
    <NetworkHealth/>,
    document.getElementById('root'),
    function () {
        // 自适应屏幕缩放
        const baseWidth = 1280;
        const baseHeight = 724;

        var body = document.querySelector('body');
        var root = document.querySelector('#root');
        var network = document.querySelector('.network-health-screen');

        function adaptiveScreen() {
            var per = body.clientWidth / baseWidth;
            root.style.width = body.clientWidth + 'px';
            root.style.height = baseHeight * per + 'px';
            root.style.overflow = 'hidden';
            network.style.transform = 'scale(' + per + ')';
            network.style.transformOrigin = 'left top';

        }

        adaptiveScreen();
    }
);