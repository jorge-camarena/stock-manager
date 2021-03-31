import React from 'react'

function StockCard({ name, ticker, open, high, low, children }) {
    return (
        <div className="card-container">
            <h2 id="card__name">{name}</h2>
            <div className="card__info">
                <h3 id="card__symbol">Symbol: {ticker}</h3>
                <p id="card__open">Market Price(Open): {open}</p>
                <p id="card__high">High: {high}</p>
                <p id ="card__low">Low: {low}</p>
            </div>
            <div>{children}</div>
        </div>
    )
}

export default StockCard
