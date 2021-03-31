import React, { useState, useEffect, useContext } from 'react'
import Stock from './Stock'
import EmptyPortfolio from './EmptyPortfolio'
import { parseValue } from '../Utils/utils'
import fetch from 'node-fetch'
import { SyncLoader } from 'react-spinners'
import { CurrentUserContext } from '../components/CurrentUserContext'


function StockList() {
    //initializing necessary state for StockList component
    const [data, setData] = useState([])
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [load, setLoad] = useState(true)
    const [emptyStocks, setEmptyStocks] = useState(false)

    useEffect(async () => {
        const response = await fetch(`http://localhost:5000/api/fetch-day-stats?Email=${currentUser.Email}`)
        .then(res => res.json())
        .then(body => {
            setData(body)
            setLoad(false)
        })
        const response2 = await fetch(`http://localhost:5000/api/get-symbols?Email=${currentUser.Email}`)
        .then(res => res.json())
        .then(body => {
            //console.log(body)
            if (body.symbols.length === 0) {
                setEmptyStocks(true)
            } else {
                setEmptyStocks(false)
            }
        })
    }, [])
    
    //parsing fetched data
    const daily = []
    for (var i = 0; i < data.length; i++) {
        var stock = data[i]
        var newObj = {
            name: stock.name,
            open: parseValue(stock.info.dayStats.adjOpen),
            high: parseValue(stock.info.dayStats.adjHigh),
            low: parseValue(stock.info.dayStats.adjLow)
        }
        daily.push(newObj)
    }

    function renderElement() {
        if (load) {
            return (
                <div className='stock-loader'>
                    <p className="stock-paragraph">Loading your stock data. Please wait...</p>
                    <SyncLoader size={24} color={'#00cc44'} />
                </div>
            )
        } else if(emptyStocks) {
            return <EmptyPortfolio />

        } else {
            return (daily.map(stock => (
                <Stock symbol={stock.name} name={stock.name} current={stock.open} high={stock.high} low={stock.low}/>
            )))

        }
    }

    return (
        <div className="stock-list">
            <h2>Your Stocks</h2>
            <div className="stock__column">
                <p className="column__label">Symbol</p>
                <p className="column__label">Name</p>
                <p className="column__label">Open</p>
                <p className="column__label">High</p>
                <p className="column__label">Low</p>
            </div>
            {renderElement(emptyStocks)}
        </div>
    )
}

export default StockList
