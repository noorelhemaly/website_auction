import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/listingspage.css'

const Handbags = () => {
  const [activeHandbags, setActiveHandbags] = useState([])
  const [expiredHandbags, setExpiredHandbags] = useState([])

  useEffect(() => {
    const fetchHandbags = async () => {
      try {
        const response = await fetch('http://localhost:3001/listings/handbags')
        if (!response.ok) {
          throw new Error('Failed to fetch handbags.')
        }
        const data = await response.json()

        const active = data.filter((bag) => !isExpired(bag.END_AT))
        const expired = data.filter((bag) => isExpired(bag.END_AT))

        setActiveHandbags(
          active.map((bag) => ({
            ...bag,
            remainingTime: calculateRemainingTime(bag.END_AT),
          }))
        )
        setExpiredHandbags(
          expired.map((bag) => ({
            ...bag,
            remainingTime: 'Expired',
          }))
        )
      } catch (error) {
        console.error('Failed to fetch handbags:', error)
      }
    }
    fetchHandbags()
  }, [])

  const isExpired = (endAt) => {
    const endTime = new Date(endAt).getTime()
    const now = Date.now()
    return endTime <= now
  }

  const calculateRemainingTime = (endAt) => {
    const endTime = new Date(endAt).getTime()
    const now = Date.now()
    const timeLeft = endTime - now

    if (timeLeft <= 0) {
      return 'Expired'
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }

  return (
    <div className="listings-page">
      <h1>Handbags Collection</h1>
      <div className="listings-grid">
        {activeHandbags.map((bag) => (
          <Link to={`/product/${bag.ID}`} className="listing-card" key={bag.ID}>
            <img src={`http://localhost:3001${bag.IMAGE_URL}`} alt={bag.NAME} />
            <h3>{bag.NAME}</h3>
            <p>Current Bid</p>
            <p className="price">£{bag.CURRENT_BID.toLocaleString()}</p>
            <p>Time Remaining: {bag.remainingTime}</p>
            <button>View Details</button>
          </Link>
        ))}
      </div>
      {expiredHandbags.length > 0 && (
        <>
          <h1>Expired Handbag Listings</h1>
          <div className="listings-grid expired">
            {expiredHandbags.map((bag) => (
              <Link to={`/product/${bag.ID}`} className="listing-card expired" key={bag.ID}>
                <img src={`http://localhost:3001${bag.IMAGE_URL}`} alt={bag.NAME} />
                <h3>{bag.NAME}</h3>
                <p>Current Bid</p>
                <p className="price">£{bag.CURRENT_BID.toLocaleString()}</p>
                <p>{bag.remainingTime}</p>
                <button>View Details</button>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )}

export default Handbags
