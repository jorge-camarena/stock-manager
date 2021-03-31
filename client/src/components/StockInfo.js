import React, { useContext, useEffect, useState } from 'react'
import Graph from './Graph'
import Timeline from './Timeline'
import { CurrentStockContext } from './CurrentStockContext'
import { CurrentTimeContext } from './CurrentTimeContext'
import { CurrentUserContext } from '../components/CurrentUserContext'
import {parseValue} from '../Utils/utils'
import { SyncLoader } from 'react-spinners'
import EmptyGraph from './EmptyGraph'

function StockInfo() {
    //initialized necessary state and context for StockInfo component
    const [data, setData] = useState([]);
    const [emptyStocks, setEmptyStocks] = useState(true)
    const [load, setLoad] = useState(true)
    const [currentStock, setCurrentStock] = useContext(CurrentStockContext)
    const [currentTime, setCurrentTime] = useContext(CurrentTimeContext)
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    useEffect(async () => {
        const response = await fetch(`http://localhost:5000/api/fetch-daily?Email=${currentUser.Email}`);
        const body = await response.json();
        const fixed = JSON.parse(JSON.stringify(body));
        setData(fixed)
        setLoad(false)

        const response2 = await fetch(`http://localhost:5000/api/get-symbols?Email=${currentUser.Email}`)
        .then(res => res.json())
        .then(body => {
            if (body.symbols.length === 0) {
                setEmptyStocks(true)
            } else {
                setEmptyStocks(false)
            }
        })
    }, []);

    //handling rendering components for loading API
    function renderElement(){
        if (load) {
            return (
                <div className='graph-loader'>
                    <p className="loading-paragraph">Loading your stock data. Please wait...</p>
                    <SyncLoader size={36} color={'#00cc44'} />
                </div>                
            )  
        }else if (emptyStocks) {
            return <EmptyGraph />
        } else {
            const selected = data[currentStock]
            console.log(currentStock)
            const selectedTime = selected[currentTime]
            const prices = selectedTime[1]
            const xAxis = []
            const yAxis = []
            //Deep copy to avoid native Chart.js issue/bug that hasn't been fixed
            for (var i = 0; i < prices.length; i++) {
                var x = selectedTime[0][i]
                var y = selectedTime[1][i]
                xAxis.push(x)
                yAxis.push(y)
            }
            const arrAvg = prices => prices.reduce((a,b) => a + b, 0) / prices.length
            const maxVal = prices => Math.max(...prices)
            const minVal = prices => Math.min(...prices) 
            return (
                <div className="info-and-graph">
                    <div className="stock__info">
                        <h2>{currentStock}</h2>
                        <h3>Average: {parseValue(arrAvg(prices))}</h3>
                        <p>Max: {parseValue(maxVal(prices))}</p>
                        <p>Min: {parseValue(minVal(prices))}</p>
                    </div>
                    <Graph xLabels={xAxis} prices={yAxis}/>
                    <Timeline /> 
                </div>
            ) 
        }  
     }
    return (
        <div>
            {renderElement()}                
        </div>
    )
}

export default StockInfo
