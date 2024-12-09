import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/homepage.css'
import bannerImage from '../pics web/hermes.png' 
import handbagsImage from '../pics web/bagscollection.jpg' 
import watchesImage from '../pics web/vccolumn.png' 

const Home = () => {
  return (
    <div className='home-page'>
      <div className='banner'>
        <img src={bannerImage} alt='Banner' className='banner-image' />
      </div>

      <div className='column'>
        <div className='handbags'>
          <img src={handbagsImage} alt='Handbags' className='image'/>
          <div className='description'>
            <h2>Explore Our Exquist Bag Collection</h2>
            <p>
            Hermès bags are the epitome of luxury and craftsmanship, 
            renowned worldwide for their elegance, exclusivity, and impeccable quality. 
            Established in 1837, Hermès has maintained its reputation as a symbol of sophistication.
            Hermès bags to this day are created by skilled artisans, 
            often taking several days to complete, 
            making them not just accessories but works of art.
            </p>
            <Link to='/handbags/Hermes' className='button'>
            Bags Listings
            </Link>
          </div>
        </div>
      </div>

      <div className='column'>
        <div className='watches'>
          <img src={watchesImage} alt='Watches' className='image'/>
          <div className='description'>
            <h2>Explore Our HandPicked Watch Collection</h2>
            <p>
            Hermès bags are the epitome of luxury and craftsmanship, 
            renowned worldwide for their elegance, exclusivity, and impeccable quality. 
            Established in 1837, Hermès has maintained its reputation as a symbol of sophistication.
            Hermès bags to this day are created by skilled artisans, 
            often taking several days to complete, 
            making them not just accessories but works of art.
            </p>
            <Link to='/handbags/Hermes' className='button'>
            Watches Listings
            </Link>
          </div>
        </div>
      </div>
    </div>
)}

export default Home
