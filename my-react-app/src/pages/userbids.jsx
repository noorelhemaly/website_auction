import React, { useState, useEffect } from 'react'

const UserBids = () => {
  const [bids, setBids] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem('userToken')
        const response = await fetch('http://localhost:3001/user/bids', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch bids.')
        }
        const data = await response.json()
        setBids(data)
      } catch (error) {
        console.error('Error fetching bids:', error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBids()
  }, [])

  if (loading) {
    return <div>Loading bids...</div>
  }

  if (bids.length === 0) {
    return <div>No bids placed yet.</div>
  }

  return (
    <div className='user-bids'>
    <h2>Your Bids</h2>
    <div className='bids-header'>
      <strong>Bid Amount (£)</strong>
      <strong>Time</strong>
      <strong>Listing</strong>
    </div>
    <div className='bids-list'>
      {bids.map((bid) => (
        <div key={bid.BID_ID} className='bid-item'>
          £{bid.BID_AMOUNT}
          {new Date(bid.CREATED_AT).toLocaleString()} 
          {bid.LISTING_NAME}
        </div>
      ))}
    </div>
  </div>

)}

export default UserBids
