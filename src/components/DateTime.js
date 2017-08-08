/**
 *  Author: harry.lang
 *  Date: 17/4/17
 *  Description: Created by harrylang on 17/4/17.
 */
import React from 'react'

function format(date) {
    let _date = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hour: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    };

    for (let key in _date) {
        let value = _date[key];
        _date[key] = value < 10 ? '0' + value : value;
    }

    return _date;
}

class DateTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: format(new Date())
        };
    }

    interval = null;

    componentDidMount() {
        var self = this;
        this.interval = setInterval(function () {
            self.setState({
                currentTime: format(new Date())
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <div className="datetime">
            <div style={{display: 'inline-block'}} className="clearfix">
                <span style={{float:'left',width:46}}>{this.state.currentTime.year}</span>
                <span style={{float:'left',width:16}}>-</span>
                <span style={{float:'left',width:32}}>{this.state.currentTime.month}</span>
                <span style={{float:'left',width:16}}>-</span>
                <span style={{float:'left',width:24}}>{this.state.currentTime.date}</span>
                <span style={{float:'left',marginLeft: 10}}>
                    {this.state.currentTime.hour + ':' + this.state.currentTime.minutes + ':' + this.state.currentTime.seconds}
                </span>
            </div>
        </div>
    }
}

export default DateTime