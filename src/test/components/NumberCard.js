/**
 *  Author: harry.lang
 *  Date: 17/4/24
 *  Description: Created by harrylang on 17/4/24.
 */
import React from 'react'

class NumberCard extends React.Component {
    constructor(props) {
        super(props);
    }

    pre = [];
    time = true;

    componentDidUpdate(preProps) {
    }

    componentDidMount() {
    }

    render() {
        const { number } = this.props;
        const list = ((number || '') + '').split('');

        let items = [], change = [];
        for (let i = 0, l = list.length; i < l; i++) {
            if (list[i] != this.pre[i]) {
                change.push(i);
            }
            items.push(
                <div className="number-card-item" key={'number-card'+i}>
                    <div className="number-card-up">{list[i]}</div>
                    <div className="number-card-down">{this.pre[i] || ''}</div>
                    <div className="number-card-hide">{list[i]}</div>
                </div>
            );
        }
        this.pre = list;

        const animate = $(this.refs.cards).find('.number-card-hide');
        change.forEach(function (index) {
            animate.eq(index).addClass('number-card-animate');
            setTimeout(function () {
                animate.eq(index).removeClass('number-card-animate');
            }, 600);
        });


        return <div ref="cards" className="number-card">
            {items}
        </div>
    }
}

export default NumberCard