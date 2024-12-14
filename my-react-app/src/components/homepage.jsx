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
            <h2>Explore Our Exquist Handbag Collection</h2>
            <p>
            Our collection of designer handbags is a celebration of impeccable craftsmanship and timeless elegance. 
            HandPicked from the world's most iconic brands, each piece tells a story of heritage, exclusivity, and sophistication. 
            Whether it's the classic allure of Hermès or the bold style of Chanel we bring you only the finest. 
            At Luxe Auction, authenticity is guaranteed, 
            and every handbag is more than an accessory it's a masterpiece waiting to be yours.
            </p>
            <Link to='/handbags' className='button'>
            Bags Listings
            </Link>
          </div>
        </div>
      </div>

      <div className='column'>
        <div className='watches'>
          <img src={watchesImage} alt='Watches' className='image'/>
          <div className='description'>
            <h2>Elevate Every Moment With Our Watch Collection</h2>
            <p>
            At Luxe Auction, we believe that luxury watches are more than timepieces
            they are symbols of precision, prestige, and personal style. 
            Our curated collection features legendary names like Rolex, Patek Philippe, Audemars Piguet, and VanCleef and Arples,
            renowned for their unmatched craftsmanship and heritage. 
            Whether you're seeking a statement piece or an investment in timeless elegance, 
            Luxe Auction offers you guaranteed authenticity and unparalleled quality.
            </p>
            <Link to='/watches' className='button'>
            Watches Listings
            </Link>
          </div>
        </div>
      </div>
    </div>
)}

export default Home
