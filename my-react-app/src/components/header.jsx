import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import logo from "../pics web/logo1.png";
import profileIcon from "../pics web/profile.jpg";
import homeIcon from "../pics web/home copy.png";

const Header = () => {
  const [userType, setUserType] = useState("guest");
  const navigate = useNavigate();

  // Check tokens and update `userType`
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");

    if (adminToken) {
      setUserType("admin");
    } else if (userToken) {
      setUserType("user");
    } else {
      setUserType("guest");
    }
  }, [localStorage.getItem("adminToken"), localStorage.getItem("userToken")]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userToken");
    setUserType("guest");
    navigate("/");
  };

  return (
    <header className="header">
      <img src={logo} alt="Luxe Auction Logo" className="logo" />

      <nav className="links">
        <a href="/" className="link">
          <img src={homeIcon} alt="Home" />
        </a>

        {userType === "user" && (
          <>
            <Link to="/handbags" className="link">
              Handbags
            </Link>
            <Link to="/watches" className="link">
              Watches
            </Link>
            <Link to="/about" className="link">
              About us
            </Link>
            <Link to="/contact" className="link">
              Contact us
            </Link>
          </>
        )}

        {userType === "admin" && (
          <>
            <Link to="/admin/home" className="link">
              Admin Dashboard
            </Link>
            <Link to="/admin/create_listing" className="link">
              Create Listing
            </Link>
          </>
        )}

        {userType === "guest" && (
          <>
            <Link to="/about" className="link">
              About us
            </Link>
            <Link to="/contact" className="link">
              Contact us
            </Link>
            <Link to="/login" className="link">
              <img src={profileIcon} alt="Login" className="profile-icon" />
            </Link>
          </>
        )}

        {userType !== "guest" && (
          <button onClick={handleLogout} className="link logout">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
