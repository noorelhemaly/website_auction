import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./styles/App.css"
import Header from "./components/header"
import Home from "./pages/homepage"
import Handbags from "./pages/Handbags"
import Watches from "./pages/Watches"
import Hermes from "./pages/handbags/Hermes" 
import Chanel from "./pages/handbags/Chanel" 
import Rolex from "./pages/watches/Rolex" 
import Audemars from "./pages/watches/Audemars" 
import Patek from "./pages/watches/patek" 
import VanCleef from "./pages/watches/VanCleef" 
import Login from "./pages/login"
import Registeration from "./pages/registration"
import AboutUs from "./components/aboutus"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/handbags" element={<Handbags />} />
        <Route path="/watches" element={<Watches />} />
        <Route path="/handbags/Hermes" element={<Hermes />} />
        <Route path="/handbags/Chanel" element={<Chanel />} />
        <Route path="/watches/Rolex" element={<Rolex />} />
        <Route path="/watches/Audemars" element={<Audemars />} />
        <Route path="/watches/patek" element={<Patek />} />
        <Route path="/watches/VanCleef" element={<VanCleef />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registeration />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
)}

export default App
