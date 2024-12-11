import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminhomepage.css";

const AdminHomePage = () => {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingListings, setLoadingListings] = useState(true);
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch("http://localhost:3001/admin/view_users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch users.");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch("http://localhost:3001/admin/all_listings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch listings.");
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingListings(false);
      }
    };
    fetchListings();
  }, []);

  // Handle Add Listing Navigation
  const handleAddListing = () => {
    navigate("/admin/create_listing");
  };

  return (
    <div className="admin-home">
      <h1>Welcome, Admin</h1>

      {/* Users Section */}
      <div className="admin-section">
        <h2>Registered Users</h2>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : users.length > 0 ? (
          <ul className="list">
            {users.map((user) => (
              <li key={user.ID}>
                {user.NAME} - {user.EMAIL}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Listings Section */}
      <div className="admin-section">
        <h2>Listings</h2>
        {loadingListings ? (
          <p>Loading listings...</p>
        ) : listings.length > 0 ? (
          <ul className="list">
            {listings.map((listing) => (
              <li key={listing.ID}>
                {listing.NAME} - {listing.CATEGORY} - ${listing.STARTING_BID}
              </li>
            ))}
          </ul>
        ) : (
          <p>No listings found.</p>
        )}
      </div>

      {/* Add Listing Button */}
      <div className="admin-actions">
        <button onClick={handleAddListing} className="button">
          Add New Listing
        </button>
      </div>
    </div>
  );
};

export default AdminHomePage;
