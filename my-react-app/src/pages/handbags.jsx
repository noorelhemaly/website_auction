import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import '../styles/handbags.css'

const Handbags = () => {
  const [handbags, setHandbags] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHandbags = async () => {
      try {
        const response = await fetch("http://localhost:3001/listings/handbags")
        const data = await response.json()
        setHandbags(
          data.map((bag) => ({
            ...bag,
            remainingTime: calculateRemainingTime(bag.END_AT),
          }))
        )
      } catch (error) {
        console.error("Failed to fetch handbags:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHandbags()
  }, []) 

  const calculateRemainingTime = (endAt) => {
    const endTime = new Date(endAt).getTime()
    const now = new Date().getTime()
    const difference = endTime - now
    if (difference <= 0) return "Expired"
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)
    return `${hours}h ${minutes}m ${seconds}s`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setHandbags((prevHandbags) =>
        prevHandbags.map((bag) => ({
          ...bag,
          remainingTime: calculateRemainingTime(bag.END_AT),
        }))
      )
    }, 1000) 

    return () => clearInterval(interval) 
  }, [handbags])
  if (loading) {
    return <div>Loading handbags...</div>
  }

  if (handbags.length === 0) {
    return <div>No handbags available.</div>
  }

  return (
    <div className="listings-page">
      <h1>Handbags Collection</h1>
      <div className="listings-grid">
      {handbags.map((bag) => (
      <Link to={`/product/${bag.ID}`} className="listing-card">
      <img src={`http://localhost:3001${bag.IMAGE_URL}`} alt={bag.NAME} />
      <h3>{bag.NAME}</h3>
      <p>Starting Bid</p>
      <p className="price">£{bag.STARTING_BID.toLocaleString()}</p>
      <p className="timer">Time Remaining: {bag.remainingTime}</p>
      <button>View Details</button>
    </Link>
))}
    </div>
    </div>
  )}
export default Handbags
