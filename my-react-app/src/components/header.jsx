import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.css'
import logo from '../pics web/logo1.png'
import profileIcon from '../pics web/profile.jpg'
import homeIcon from '../pics web/home copy.png'

const Header = () => {
  return (
    <header className='header'>
      <img src={logo} alt='Luxe Auction Logo' className='logo' />

      <nav className='links'>
        <a href='/' className='link'>
          <img src={homeIcon} alt='Home' />
        </a>
        <Link to='/handbags' className='link'>
          Handbags
        </Link>
        <Link to='/watches' className='link'>
          Watches
        </Link>
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
