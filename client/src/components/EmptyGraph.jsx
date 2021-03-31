import React from 'react'
import Graph from './Graph'

function EmptyGraph() {
    const x = ['No data', 'No data', 'No data', 'No data', 'No data']
    const y = [0, 0, 0, 0, 0]
    return (
        <div className="empty-graph">
            <div className="stock__info">
                <h2>No data to display</h2>
            </div>
            <Graph xLabels={x} prices={y}/>

        </div>
    )
}

export default EmptyGraph
