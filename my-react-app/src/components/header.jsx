import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.css'
import logo from '../pics web/logo1.png'
import profileIcon from '../pics web/profile.jpg'
import homeIcon from '../pics web/home copy.png'

const Header = () => {
  const [showHandbagCategories, setShowHandbagCategories] = useState(false)
  const [showWatchCategories, setShowWatchCategories] = useState(false)

  return (
    <header className='header'>
      <img src={logo} alt='Luxe Auction Logo' className='logo' />

      <nav className='links'>
        <a href='/' className='link'>
          <img src={homeIcon} alt='Home' />
        </a>

        <div
          className='items'
          onMouseEnter={() => setShowHandbagCategories(true)}
          onMouseLeave={() => setShowHandbagCategories(false)}
        >
        <Link to='/handbags' className='link'>
          Handbags
        </Link>
          {showHandbagCategories && (
            <div className='menu'>
              <Link to='/handbags/Hermes' className='menu-link'>
                Hermes
              </Link>
              <Link to='/handbags/Chanel' className='menu-link'>
                Chanel
              </Link>
            </div>
          )}
        </div>

        <div
          className='items'
          onMouseEnter={() => setShowWatchCategories(true)}
          onMouseLeave={() => setShowWatchCategories(false)}
        >
        <Link to='/watches' className='link'>
          Watches
        </Link>
          {showWatchCategories && (
            <div className='menu'>
              <Link to='/watches/Rolex' className='menu-link'>
                Rolex
              </Link>
              <Link to='/watches/patek' className='menu-link'>
                Patek Philippe
              </Link>
              <Link to='/watches/Audemars' className='menu-link'>
                Audemars Piguet
              </Link>
              <Link to='/watches/VanCleef' className='menu-link'>
                VanCleef
              </Link>
            </div>
          )}
        </div>

        <Link to='/about' className='link'>
          About us
        </Link>
        <Link to='/contact' className='link'>
          Contact us
        </Link>

        <Link to='/register' className='link'>
          <img src={profileIcon} alt='Profile' />
        </Link>
      </nav>
    </header>
  )
}

export default Header
