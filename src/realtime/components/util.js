/**
 *  Author: harry.lang
 *  Date: 17/4/20
 *  Description: Created by harrylang on 17/4/20.
 */
export function randomBoth(min, max) {
    var range = max - min;
    var rand = Math.random();
    var num = min + Math.round(rand * range); //四舍五入
    return num;
}