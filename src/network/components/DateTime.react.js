/**
 *  Author: harry.lang
 *  Date: 17/4/19
 *  Description: Created by harrylang on 17/4/19.
 */
import React from 'react'

function format(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

class DateTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: format(new Date())
        };
    }

    interval = null;

    componentWillMount() {
    }

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
        return <div className="screen-time">
            {this.state.currentTime}
        </div>
    }
}

export default DateTime