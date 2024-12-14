import React, { useState, useEffect } from 'react'
import '../styles/bids.css'

const AdminBids = () => {
  const [bids, setBids] = useState([])

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await fetch('http://localhost:3001/admin/bids', {
          method: "GET",
          credentials: "include",
        })
        if (!response.ok) {
          throw new Error('Failed to fetch bids.')
        }
        const data = await response.json()
        setBids(data)
      } catch (error) {
        console.error('Error fetching bids:', error.message)
      }
    }
    fetchBids()
  }, [])

  return (
    <div className='bids'>
      <h2>Bidding History</h2>
      <table className='bids-table'>
          <tr>
            <th>Listing</th>
            <th>Bid Amount (£)</th>
            <th>Time</th>
            <th>User</th>
          </tr>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.BID_ID}>
              <td>{bid.LISTING_NAME}</td>
              <td>£{bid.BID_AMOUNT}</td>
              <td>{new Date(bid.CREATED_AT).toLocaleString()}</td>
              <td>{bid.USER_NAME}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminBids
