import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/adminhomepage.css'

const AdminHomePage = () => {
  const [users, setUsers] = useState([])
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState({ users: true, listings: true })
  const navigate = useNavigate()

  // Fetch Users
  const fetchUsers = async () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      alert('Session expired. Please log in again.')
      navigate('/login')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/admin/view_users', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage || 'Failed to fetch users.')
      }

      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error.message)
    } finally {
      setLoading((prev) => ({ ...prev, users: false }))
    }
  }

  // Fetch Listings
  const fetchListings = async () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      alert('Session expired. Please log in again.')
      navigate('/login')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/admin/all_listings', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage || 'Failed to fetch listings.')
      }

      const data = await response.json()
      setListings(data)
    } catch (error) {
      console.error('Error fetching listings:', error.message)
    } finally {
      setLoading((prev) => ({ ...prev, listings: false }))
    }
  }

  // Refresh Users and Listings
  const handleRefresh = () => {
    setLoading({ users: true, listings: true })
    fetchUsers()
    fetchListings()
  }

  // Add Listing Button
  const handleAddListing = () => {
    navigate('/admin/create_listing')
  }

  useEffect(() => {
    fetchUsers()
    fetchListings()
  }, [])

  return (
    <div className='admin-home'>
      <h1>Welcome, Admin</h1>

      {/* Refresh Button */}
      <div className='refresh-button'>
        <button onClick={handleRefresh}>Refresh Data</button>
      </div>

      {/* Users Section */}
      <div className='admin-section'>
        <h2>Registered Users</h2>
        {loading.users ? (
          <p>Loading users...</p>
        ) : users.length > 0 ? (
          <ul className='list'>
            {users.map((user) => (
              <li key={user.ID}>
                <strong>Name:</strong> {user.NAME} <br />
                <strong>Email:</strong> {user.EMAIL} <br />
                <strong>ID Number:</strong> {user.IDNUMBER}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Listings Section */}
      <div className='admin-section'>
        <h2>Listings</h2>
        {loading.listings ? (
          <p>Loading listings...</p>
        ) : listings.length > 0 ? (
          <ul className='list'>
            {listings.map((listing) => (
              <li key={listing.ID}>
                <strong>Name:</strong> {listing.NAME} <br />
                <strong>Category:</strong> {listing.CATEGORY} <br />
                <strong>Starting Bid:</strong> ${listing.STARTING_BID} <br />
                <strong>Duration:</strong> {listing.DURATION} <br />
                <strong>End Time:</strong> {listing.END_AT} <br />
              </li>
            ))}
          </ul>
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  )
}

export default AdminHomePage
