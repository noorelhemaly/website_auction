import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/productdetails.css'

const ProductDetails = () => {
  const { id } = useParams() 
  const [product, setProduct] = useState(null)
  const [remainingTime, setRemainingTime] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

    fetchProductDetails()
  }, [id])

  const updateRemainingTime = (endAt) => {
    const endTime = new Date(endAt).getTime()
    const now = new Date().getTime()
    const difference = endTime - now

    if (difference <= 0) {
      setRemainingTime('Expired')
      return
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (product) {
        updateRemainingTime(product.END_AT)
      }
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [product])

  if (loading) {
    return <p>Loading product details...</p>
  }

  if (error) {
    return <p className='error'>{error}</p>
  }

  if (!product) {
    return <p>No product details found.</p>
  }

  return (
    <div className='product-details'>
      <img
        src={`http://localhost:3001${product.IMAGE_URL}`}
        alt={product.NAME}
        className='product-image'
      />
      <div className='product-info'>
        <h1>{product.NAME}</h1>
        <table className='product-info'>
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
        <button className='bidding-button' onClick={() => alert('Bid Now clicked!')}>
          Bid Now
        </button>
      </div>
    </div>
  )
}

export default ProductDetails
