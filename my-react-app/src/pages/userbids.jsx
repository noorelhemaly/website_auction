import React, { useState, useEffect } from 'react';
import '../styles/bids.css'

const UserBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('http://localhost:3001/user/bids', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch bids.');
        }
        const data = await response.json();
        setBids(data);
      } catch (error) {
        console.error('Error fetching bids:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  if (loading) {
    return <div>Loading bids...</div>;
  }

  if (bids.length === 0) {
    return <div>No bids placed yet.</div>;
  }

  return (
    <div className="bids">
      <h2>Your Bids</h2>
      <table className="bids-table">
        <thead>
          <tr>
            <th>Bid Amount (£)</th>
            <th>Time</th>
            <th>Listing</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.BID_ID}>
              <td>£{bid.BID_AMOUNT}</td>
              <td>{new Date(bid.CREATED_AT).toLocaleString()}</td>
              <td>{bid.LISTING_NAME}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBids;
