import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/adminhomepage.css'

const AdminHomePage = () => {
  const [listings, setListings] = useState([])
  const [users, setUsers] = useState([])
  const [loadingListings, setLoadingListings] = useState(true)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const navigate = useNavigate()

  const fetchListings = async () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      alert('Unauthorized access. Please log in as admin.')
      navigate('/login') 
      return
    }
    try {
      const response = await fetch('http://localhost:3001/admin/all_listings', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) 
      throw new Error('Failed to fetch listings.')
      const data = await response.json()
      setListings(data)
    } catch (error) {
      console.error('Error fetching listings:', error.message)
    } finally {
      setLoadingListings(false)
    }
  }

  const fetchUsers = async () => {
    const token = localStorage.getItem('adminToken')
    try {
      const response = await fetch('http://localhost:3001/admin/view_users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) 
      throw new Error('Failed to fetch users.')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error.message)
    } finally {
      setLoadingUsers(false)
    }
  }

  const handleEditDuration = async (id) => {
    const newDuration = prompt('Enter the additional days to extend:')
    if (!newDuration || isNaN(newDuration)) {
      alert('Invalid input. Please enter a valid number.')
      return
    }
    const token = localStorage.getItem('adminToken')
    try {
      const response = await fetch(`http://localhost:3001/admin/edit_duration/${id}/${newDuration}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        alert('Duration updated successfully!')
        fetchListings()
      } else {
        alert(`Error updating duration: ${await response.text()}`)
      }
    } catch (error) {
      console.error('Error updating duration:', error.message)
    }
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken')
    try {
      const response = await fetch(`http://localhost:3001/admin/delete_listing/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        alert('Listing deleted successfully!')
        fetchListings()
      } else {
        alert(`Error deleting listing: ${await response.text()}`)
      }
    } catch (error) {
      console.error('Error deleting listing:', error.message)
    }
  }

  useEffect(() => {
    fetchListings()
    fetchUsers()
  }, [])

  return (
    <div className='admin-home'>
      <h1>Welcome, Admin</h1>
  
      <div className='admin-section'>
        <h2>Registered Users</h2>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : users.length > 0 ? (
          <div className='users'>
            {users.map((user) => (
              <div key={user.ID} className='user-card'>
                <p>Name: {user.NAME}</p>
                <p>Email: {user.EMAIL}</p>
                <p>ID Number: {user.IDNUMBER}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </div>
  
      <div className='admin-section'>
        <h2>Listings</h2>
        {loadingListings ? (
          <p>Loading listings...</p>
        ) : listings.length > 0 ? (
          <div className='listings'>
            {listings.map((listing) => (
              <div key={listing.ID} className='listing-card'>
                <img src={`http://localhost:3001${listing.IMAGE_URL}`} alt={listing.NAME} className='listing-image' />
                <div className='listing-info'>
                  <h3>{listing.NAME}</h3>
                  <p>Category: {listing.CATEGORY}</p>
                  <p>Duration: {listing.DURATION} day/s</p>
                  <p>Ends At: {new Date(listing.END_AT).toLocaleString()}</p>
                  <p>Starting Bid: £{listing.STARTING_BID}</p>
                  <p>Current Bid: £{listing.CURRENT_BID}</p>
                  <button className='extend-duration' onClick={() => handleEditDuration(listing.ID)}>
                    Extend Duration
                  </button>
                  <button className='delete' onClick={() => handleDelete(listing.ID)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  )
}

export default AdminHomePage
