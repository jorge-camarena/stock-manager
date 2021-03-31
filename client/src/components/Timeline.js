import React, { useContext } from 'react'
import { CurrentTimeContext } from './CurrentTimeContext'

function Timeline() {
    const [currentTime, setCurrentTime] = useContext(CurrentTimeContext)

    function clickWeek() {
        return setCurrentTime('oneWeek')
    }
    function clickMonth() {
        return setCurrentTime('oneMonth')
    }
    function clickYear() {
        return setCurrentTime('oneYear')
    }

    function toggleWeek() {
        if (currentTime === 'oneWeek') {
            return 'selected-btn'
        } else {
            return 'timeline__btn'
        }
    }
    function toggleMonth() {
        if (currentTime === 'oneMonth') {
            return 'selected-btn'
        } else {
            return 'timeline__btn'
        }
    }
    function toggleYear() {
        if (currentTime === 'oneYear') {
            return 'selected-btn'
        } else {
            return 'timeline__btn'
        }
    }
    return (
        <div className="timeline__container">
            {/* <button className="timeline__btn" id="day" value="oneDay" onClick={clickDay}>1D</button> */}
            <button className={toggleWeek()} id="week" value="oneWeek" onClick={clickWeek}>5D</button>
            <button className={toggleMonth()} id="month"value="oneMonth" onClick={clickMonth}>15D</button>
            <button className={toggleYear()} id="year"value="oneYear" onClick={clickYear}>1Y</button>
        </div>
    )
}

export default Timeline
