import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { CurrentUserContext } from '../components/CurrentUserContext'
import background from '../img/stripes2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Graph from '../components/Graph'
import StockCard from '../components/StockCard'
import fetch from 'node-fetch'
import { SyncLoader } from 'react-spinners'
import {parseValue} from '../Utils/utils'


function Explore() {
    const [cardData, setCardData] = useState({})
    const [cardGraph, setCardGraph] = useState([])
    const [loadCard, setLoadCard] = useState(false)
    const [loadGraph, setLoadGraph] = useState(false)
    const [firstVisited, setFirstVisited] = useState(true)
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    async function searchSymbol() {
        const symbol = document.getElementById('input-search').value
        setFirstVisited(false)
        setLoadGraph(true)
        setLoadCard(true)
        await fetch(`http://localhost:5000/api/search-symbol-graph?symbol=${symbol}`)
        .then(res => res.json())
        .then(body => {
            setLoadGraph(false)
            setCardGraph(body)
            console.log(body)
        })
        await fetch(`http://localhost:5000/api/search-symbol?symbol=${symbol}&Email=${currentUser.Email}`)
        .then(res => res.json())
        .then(body => {
            setLoadCard(false)
            setCardData(body)
        }) 
    }

    async function addSymbol() {
        const symbol = document.getElementById('input-search').value;
        const payload = {
            Email: currentUser.Email,
            Symbol: symbol.toUpperCase()
        }
        await fetch('http://localhost:5000/api/add-symbol', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(body => {
            console.log(body)
        })
    }

    function renderCard() {
        if (firstVisited) {
            return (
                <p className="card-container">Please search for a symbol. The information for the symbol you searched will appear here</p>
            )
        }else if (loadCard) {
            return (
                <div className="card-container">
                    <SyncLoader size={36} color={'#00cc44'} />
                </div>
            )
        } else if (!cardData.exists) {
            return (
                <p className="card-container">{cardData.message}</p>
            )
        } else {
            return (
                <StockCard name={cardData.name} ticker={cardData.symbol} open={cardData.adjOpen} high={cardData.adjHigh} low={cardData.adjLow}>
                    <button className="add-btn" onClick={addSymbol} disabled={cardData.alreadyAdded}>Add Stock +</button>
                </StockCard>
            )
        }
    }

    function renderGraph() {
        if (firstVisited) {
            return <p className="info-and-graph">Please search for a symbol. The information chard will appear here</p>
        } else if (loadGraph) {
            <div className="info-and-graph">
                <SyncLoader size={36} color={'#00cc44'} />
            </div>
        }
        else if (!cardData.exists) {
            return (
                <p className="info-and-graph">{cardData.message}</p>
            ) 
        } else {
            const arrAvg = prices => prices.reduce((a,b) => a + b, 0) / prices.length
            const maxVal = prices => Math.max(...prices)
            const minVal = prices => Math.min(...prices) 
            return (
                <div className="info-and-graph">
                <div className="stock__info">
                    
                    <h2>{cardData.name}</h2>
                    <h3>Average: {parseValue(arrAvg(cardGraph[1]))}</h3>
                    <p>Min: {parseValue(minVal(cardGraph[1]))}</p>
                    <p>Max: {parseValue(maxVal(cardGraph[1]))}</p>
                </div>
                <Graph xLabels={cardGraph[0]} prices={cardGraph[1]} />
                <div className="desc__par">
                    <h3>Description</h3>
                    <p id="desc__p">{cardData.desc}</p>
                </div>   
            </div>
            )
        }
    }

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            overflow: 'hidden'
        }} className="explore-container">
            <Navbar>
            <div class="wrapper">
                <div class="search_box">
                    <input type="text" class="input_search" id="input-search" placeholder="What are you looking for?" />
                    <div class="search_btn"  id="search-btn" onClick={searchSymbol}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>
            </Navbar>
            <div className="graph-card-container">
            {renderGraph()}    
            {renderCard()}
            </div>
        </div>
    )
}

export default Explore
