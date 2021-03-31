import React, { useContext } from 'react'
import { CurrentStockContext } from './CurrentStockContext'

function Stock({ symbol, name, current, high, low }) {
    const [currentStock, setCurrentStock] = useContext(CurrentStockContext)


    function clickStock() {
        setCurrentStock(symbol)
    }
    function toggleSelected() {
        if (symbol === currentStock) {
            return 'selected-stock'
        } else {
            return 'ind-stock'
        }
    }

    return (
        <div className={toggleSelected()} onClick={clickStock}>
            <p className="column__data">{symbol}</p>
            <p className="column__data">{name}</p>
            <p className="column__data">{current}</p>
            <p className="column__data">{high}</p>
            <p className="column__data">{low}</p>
        </div>
    )
}

export default Stock
