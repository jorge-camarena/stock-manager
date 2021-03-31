import React from 'react';
import StockInfo from './StockInfo'
import StockList from './StockList'

function HomeContent() {
    return (
        <div className="container">
            <StockInfo />
            <StockList />
        </div>
    )
}

export default HomeContent
