/**
 *  Author: jenny.pei
 *  Date: 17/5/6
 *  Description: Created by jenny on 17/5/6.
 */
import React from 'react'
import MapChart from './chart/MapChart'

class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="cloud_map">
            <div className="map">
                <MapChart {...this.props} />
            </div>
        </div>


    }
}

export default Map