import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./styles/App.css"
import Header from "./components/header"
import Home from "./pages/homepage"
import Login from "./pages/login"
import Registeration from "./pages/registration"
import AboutUs from "./components/aboutus"
import ContactUs from "./components/contactus"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registeration />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
)}

export default App
