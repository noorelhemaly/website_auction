import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles/App.css'
import Header from './components/header'
import Home from './pages/homepage'
import Login from './pages/login'
import Handbags from './pages/handbags'
import Registeration from './pages/registration'
import AboutUs from './components/aboutus'
import ContactUs from './components/contactus'
import AddListing from './pages/addlisting'
import AdminHomePage from './pages/adminhomepage'
import ProductDetails from './pages/productdetail'
import Watches from './pages/watches'
import ListingBids from './pages/listingbids'
import UserBids from './pages/userbids'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Registeration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/handbags' element={<Handbags />} />
        <Route path='/watches' element={<Watches />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/admin/create_listing' element={<AddListing />} />
        <Route path='/admin/home' element={ <AdminHomePage />}/>
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/admin/bids' element={<ListingBids />} />
        <Route path='/user/bids' element={<UserBids />} />

      </Routes>
    </Router>
)}

export default App
