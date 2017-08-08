/**
 *  Author: harry.lang
 *  Date: 17/4/14
 *  Description: Created by jenny on 17/5/6.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

// 样式操作
import '../resource/index.less';

import CloudMonitor from './components/CloudMonitor.js'

ReactDOM.render(
    <CloudMonitor />,
    document.getElementById('root'),
    function () {
        // 自适应屏幕缩放
        const baseWidth = 1920;
        const baseHeight = 1080;

        var body = document.querySelector('body');
        var root = document.querySelector('#root');
        var realtime = document.querySelector('.cloud_monitor');

        function adaptiveScreen() {
            var per = body.clientWidth / baseWidth;
            root.style.width = body.clientWidth + 'px';
            root.style.height = baseHeight * per + 'px';
            root.style.overflow = 'hidden';
            realtime.style.transform = 'scale(' + per + ')';
            realtime.style.transformOrigin = 'left top';

        }

        let timeout = null;
        window.onresize = function () {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                adaptiveScreen();
            }, 400);
        };

        adaptiveScreen();
    }
);