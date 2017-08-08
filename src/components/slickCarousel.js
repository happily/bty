/**
 * Name:
 * Created by authur on 17/4/1.
 */

import React from 'react';
import Slider from 'react-slick';

class SlickCarousel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //设置定时
        let self = this;
        if (self.slider) {
            self.timer = setInterval(function () {
                self.slider.slickNext();
            }, ENV.screen.flushMonitorInterval)
        }
    }

    componentWillUpdate() {
        //重置定时器
        clearInterval(this.timer);
        //设置定时
        let self = this;
        if (self.slider) {
            if (self.slider.innerSlider) self.slider.innerSlider.slickGoTo(0);
            self.timer = setInterval(function () {
                self.slider.slickNext();
            }, ENV.screen.flushMonitorInterval)
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let settings = {
            dots: false,
            autoplay: false,
            arrows: false,
            vertical: true,
            pauseOnHover: false
        }

        let setting = this.props.setting || {};

        settings = Object.assign({}, settings, setting);

        let lists = this.props.lists || {};

        return (
            <Slider {...settings} ref={c => this.slider = c }>
                {lists}
            </Slider>
        )
    }
}

export default SlickCarousel;