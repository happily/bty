/**
 *  Author: harry.lang
 *  Date: 17/4/19
 *  Description: Created by harrylang on 17/4/19.
 */

import PiedRing from './PiedRing'
import NumberCard from './NumberCard'
import Hits from './Hits'
import UseRrend from './UseRrend'
import DepartActive from './DepartActive'
import ClickRatePie from './ClickRatePie'
import SingleRing from './SingleRing'
import Map from './Map'

import {system} from  'SRC_PATH/utils/data'

class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pied: []
        };
    }

    componentDidMount() {
        this.setState({
            pied: system().appscalecount,
            number: (+new Date),
            histData: system().clickTopData,
            UseRrend: system().operationsystemData,
        });

        setInterval(function () {
            this.setState({
                pied: system().appscalecount,
                number: (+new Date),
                histData: system().clickTopData,
                UseRrend: system().operationsystemData,
                DepartActive: system().activesectorData
            })
        }.bind(this), 1000)
    }

    render() {
        const data = 98;
        let color = '';
        if (data < 90) {
            color = '#fd5743';
        } else if (data >= 90 && data < 95) {
            color = '#ffd800';
        } else if (data > 95) {
            color = '#49d9fe';
        }

        return <div style={{height:'100%',background:'#0e1a35'}}>
            <NumberCard number={this.state.number}></NumberCard>

            <div style={{height:240,width:240}}>
                <PiedRing data={this.state.pied}/>
            </div>
            <div style={{height:240,width:1100}}>
                <Hits data={this.state.histData}/>
            </div>
            <div style={{height:270,width:880}}>
                <UseRrend data={this.state.UseRrend}/>
            </div>
            <div style={{height:270,width:880}}>
                <DepartActive data={this.state.DepartActive}/>
            </div>
            <div style={{height:160,width:300}}>
                <ClickRatePie/>
            </div>
            <div style={{height:26,width:26}}>
                <SingleRing option={{
                        series:[{
                            data: [{
                                value: data,
                                name: '得分',
                                itemStyle:{normal:{color:color}}
                            }]
                        }]
                    }}/>
            </div>

            <div style={{height:960,width:1000}}>
                <Map/>
            </div>

        </div>
    }
}

export default Test