import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/productdetails.css'

const ProductDetails = () => {
  const { id } = useParams() // Get the product ID from the URL
  const [product, setProduct] = useState(null)
  const [bidHistory, setBidHistory] = useState([])
  const [remainingTime, setRemainingTime] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [bidAmount, setBidAmount] = useState('')
  const [message, setMessage] = useState('')

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/listing/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch product details.')
        }
        const data = await response.json()
        setProduct(data)
        updateRemainingTime(data.END_AT)
      } catch (error) {
        console.error('Error fetching product details:', error.message)
        setError('Failed to load product details.')
      } finally {
        setLoading(false)
      }
    }

    const fetchBidHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3001/listing/${id}/bids`)
        if (!response.ok) {
          throw new Error('Failed to fetch bid history.')
        }
        const data = await response.json()
        setBidHistory(data)
      } catch (error) {
        console.error('Error fetching bid history:', error.message)
      }
    }

    fetchProductDetails()
    fetchBidHistory()
  }, [id])

  // Calculate and update remaining time
  const updateRemainingTime = (endAt) => {
    const endTime = new Date(endAt).getTime(); 
    const now = new Date().getTime(); 
    const difference = endTime - now;
  
    if (difference <= 0) {
      setRemainingTime("Expired");
      return;
    }
  
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
    setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };
  

  // Update remaining time every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (product) {
        updateRemainingTime(product.END_AT)
      }
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [product])

  // Place a Bid
  const placeBid = async () => {
    setMessage('') // Clear previous messages
    if (!bidAmount || parseFloat(bidAmount) <= product.CURRENT_BID) {
      setMessage(`Your bid must be higher than the current bid of £${product.CURRENT_BID}`)
      return
    }

    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch('http://localhost:3001/bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listingId: product.ID,
          bidAmount: parseFloat(bidAmount),
        }),
      })

      if (response.ok) {
        const updatedProduct = await fetch(`http://localhost:3001/listing/${id}`).then((res) => res.json()) // Refresh product data
        const updatedBids = await fetch(`http://localhost:3001/listing/${id}/bids`).then((res) => res.json()) // Refresh bid history
        setProduct(updatedProduct)
        setBidHistory(updatedBids)
        setMessage('Bid placed successfully!')
        setBidAmount('') // Clear input
      } else {
        const errorText = await response.text()
        setMessage(`Error: ${errorText}`)
      }
    } catch (error) {
      console.error('Error placing bid:', error.message)
      setMessage('Failed to place bid. Please try again.')
    }
  }

  if (loading) {
    return <p>Loading product details...</p>
  }

  if (error) {
    return <p className="error">{error}</p>
  }

  if (!product) {
    return <p>No product details found.</p>
  }

  return (
    <div className="product-details">
  <div className="product-main">
    <img
      src={`http://localhost:3001${product.IMAGE_URL}`}
      alt={product.NAME}
      className="product-image"
    />
    <div className="product-info">
      <h1>{product.NAME}</h1>
      <table>
        <tbody>
          <tr>
            <td>Brand</td>
            <td>{product.BRAND}</td>
          </tr>
          <tr>
            <td>Style</td>
            <td>{product.STYLE}</td>
          </tr>
          <tr>
            <td>Color</td>
            <td>{product.COLOR}</td>
          </tr>
          <tr>
            <td>Material</td>
            <td>{product.MATERIAL}</td>
          </tr>
          <tr>
            <td>Hardware</td>
            <td>{product.HARDWARE}</td>
          </tr>
          <tr>
            <td>Size</td>
            <td>{product.SIZE}</td>
          </tr>
          <tr>
            <td>Current Bid</td>
            <td>£{product.CURRENT_BID}</td>
          </tr>
          <tr>
            <td>Remaining Time</td>
            <td>{remainingTime}</td>
          </tr>
        </tbody>
      </table>
      <div className="bid-section">
        <input
          className="bid-input"
          type="number"
          placeholder="Enter your bid"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />
        <button onClick={placeBid} className="bid-button">
          Place Bid
        </button>
        {message && <p className="bid-message">{message}</p>}
      </div>
    </div>
  </div>
  <div className="bid-history">
    <h2>Bid History</h2>
    {bidHistory.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Bid Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {bidHistory.map((bid, index) => (
            <tr key={index}>
              <td>£{bid.BID_AMOUNT}</td>
              <td>{new Date(bid.CREATED_AT).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No bids placed yet.</p>
    )}
  </div>
  </div>
  )
}

export default ProductDetails
