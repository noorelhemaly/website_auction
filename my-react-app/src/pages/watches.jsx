import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/listingspage.css'

const Watches = () => {
  const [activeWatches, setActiveWatches] = useState([])
  const [expiredWatches, setExpiredWatches] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (!token) {
      if (!sessionStorage.getItem('alertShown')) {
        alert('You must log in to access this page.')
        sessionStorage.setItem('alertShown', true)
      }
      navigate('/register')
    }
  }, [navigate])

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const response = await fetch('http://localhost:3001/listings/watches', {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch watches.')
        }
        const data = await response.json()

        const active = data.filter((watch) => !isExpired(watch.END_AT))
        const expired = data.filter((watch) => isExpired(watch.END_AT))

        setActiveWatches(
          active.map((watch) => ({
            ...watch,
            remainingTime: calculateRemainingTime(watch.END_AT),
          }))
        )
        setExpiredWatches(
          expired.map((watch) => ({
            ...watch,
            remainingTime: 'Expired',
          }))
        )
      } catch (error) {
        console.error('Failed to fetch watches:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchWatches()
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWatches((prevWatches) =>
        prevWatches.map((watch) => ({
          ...watch,
          remainingTime: calculateRemainingTime(watch.END_AT),
        }))
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [activeWatches])

  if (loading) {
    return <div>Loading watches...</div>
  }

  if (activeWatches.length === 0 && expiredWatches.length === 0) {
    return <div>No watches available.</div>
  }

  return (
    <div className="listings-page">
      <h1>Watches Collection</h1>

      <div className="listings-grid">
        {activeWatches.map((watch) => (
          <Link to={`/product/${watch.ID}`} className="listing-card" key={watch.ID}>
            <img src={`http://localhost:3001${watch.IMAGE_URL}`} alt={watch.NAME} />
            <h3>{watch.NAME}</h3>
            <p>Current Bid</p>
            <p className="price">£{watch.CURRENT_BID.toLocaleString()}</p>
            <p className="timer">Time Remaining: {watch.remainingTime}</p>
            <button>View Details</button>
          </Link>
        ))}
      </div>
      {expiredWatches.length > 0 && (
        <>
          <h2>Expired Watch Listings</h2>
          <div className="listings-grid expired">
            {expiredWatches.map((watch) => (
              <Link to={`/product/${watch.ID}`} className="listing-card expired" key={watch.ID}>
                <img src={`http://localhost:3001${watch.IMAGE_URL}`} alt={watch.NAME} />
                <h3>{watch.NAME}</h3>
                <p>Current Bid</p>
                <p className="price">£{watch.CURRENT_BID.toLocaleString()}</p>
                <p className="expired-timer">{watch.remainingTime}</p>
                <button>View Details</button>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )}

export default Watches
