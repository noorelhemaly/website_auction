import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/header.css'
import logo from '../pics web/logo1.png'
import profileIcon from '../pics web/profile.jpg'
import homeIcon from '../pics web/home copy.png'

const Header = () => {
  const [userType, setUserType] = useState('guest') 
  const navigate = useNavigate()

  const fetchUserType = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/validate', {
        method: 'GET',
        credentials: 'include', 
      })
      if (!response.ok) {
        console.error('Failed to validate user type.')
        setUserType('guest')
        return
      }
      const data = await response.json()
      setUserType(data.userType || 'guest') 
    } catch (error) {
      console.error('Error fetching user type:', error)
      setUserType('guest') 
    }
  }
  useEffect(() => {
    fetchUserType() 
  }, []) 

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/logout', {
        method: 'GET',
        credentials: 'include', 
      })

      if (response.ok) {
        setUserType('guest')
        navigate('/') 
      } else {
        console.error('Failed to log out:', await response.text())
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <header className="header">
      <img src={logo} alt="Luxe Auction Logo" className="logo" />

      <nav className="links">
        <a href="/" className="link">
          <img src={homeIcon} alt="Home" />
        </a>
        {userType === 'guest' && (
          <>
            <Link to="/handbags" className="link">Handbags</Link>
            <Link to="/watches" className="link">Watches</Link>
            <Link to="/about" className="link">About us</Link>
            <Link to="/contact" className="link">Contact us</Link>
            <Link to="/login" className="link">
              <img src={profileIcon} alt="Login" className="profile-icon" />
            </Link>
          </>
        )}
        {userType === 'user' && (
          <>
            <Link to="/handbags" className="link">Handbags</Link>
            <Link to="/watches" className="link">Watches</Link>
            <Link to="/mybids" className="link">My Bids</Link>
            <Link to="/about" className="link">About us</Link>
            <Link to="/contact" className="link">Contact us</Link>
            <button onClick={handleLogout} className="link logout">Logout</button>
          </>
        )}
        {userType === 'admin' && (
          <>
            <Link to="/admin/home" className="link">Admin Dashboard</Link>
            <Link to="/admin/create_listing" className="link">Create Listing</Link>
            <Link to="/admin/bids" className="link">Recent Bids</Link>
            <button onClick={handleLogout} className="link logout">Logout</button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
