import React, { useState, useEffect } from "react";

const Handbags = () => {
  const [handbags, setHandbags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHandbags = async () => {
      try {
        const response = await fetch("http://localhost:3001/listings/handbags");
        const data = await response.json();
        setHandbags(data);
      } catch (error) {
        console.error("Failed to fetch handbags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHandbags();
  }, []); 
  
  if (loading) {
    return <div>Loading handbags...</div>;
  }

  if (handbags.length === 0) {
    return <div>No handbags available.</div>;
  }

  return (
    <div>
      <h1>Handbags Listings</h1>
      {handbags.map((handbag) => (
        <div key={handbag.ID}>
          <img src={handbag.IMAGE_URL} alt={handbag.NAME} />
          <h3>{handbag.NAME}</h3>
          <p>Brand: {handbag.BRAND}</p>
          <p>Starting Bid: ${handbag.STARTING_BID}</p>
        </div>
      ))}
    </div>
  );
};

export default Handbags;
