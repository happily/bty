/**
 *  Author: jenny.pei
 *  Date: 17/5/6
 *  Description: Created by jenny on 17/5/6.
 */
import React from 'react'
import ResourceTable from './ResourceTable'
import ResourceDetail from './ResourceDetail'

class Resource extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data || {};

        const handleMap = (name)=> {
            if (name) {
                return <ResourceDetail {...data} />
            }
            return <ResourceTable data={data.divisionData}/>
        };

        return <div className="resource">
            <div className="title">
                {data.currentName || '十四师资源情况'}
            </div>
            {handleMap(data.currentName)}
        </div>
    }
}

export default Resource