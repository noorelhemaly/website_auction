import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminhomepage.css";

const AdminHomePage = () => {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState({ users: true, listings: true });
  const navigate = useNavigate();

  // Fetch Users
  const fetchUsers = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      console.error("Admin token not found.");
      return;
    }

    fetch("http://localhost:3001/admin/view_users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error.message))
      .finally(() => setLoading((prev) => ({ ...prev, users: false })));
  };

  // Fetch Listings
  const fetchListings = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      console.error("Admin token not found.");
      return;
    }

    fetch("http://localhost:3001/admin/all_listings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch listings.");
        }
        return response.json();
      })
      .then((data) => setListings(data))
      .catch((error) => console.error("Error fetching listings:", error.message))
      .finally(() => setLoading((prev) => ({ ...prev, listings: false })));
  };

  useEffect(() => {
    fetchUsers();
    fetchListings();
  }, []);

  const handleAddListing = () => navigate("/admin/create_listing");

  return (
    <div className="admin-home">
      <h1>Welcome, Admin</h1>

      {/* Users Section */}
      <div className="admin-section">
        <h2>Registered Users</h2>
        {loading.users ? (
          <p>Loading users...</p>
        ) : users.length > 0 ? (
          <ul className="list">
            {users.map((user) => (
              <li key={user.ID}>
                <strong>Name:</strong> {user.NAME} <br />
                <strong>Email:</strong> {user.EMAIL} <br />
                <strong>ID Number:</strong> {user.IDNUMBER}
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
        {loading.listings ? (
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
