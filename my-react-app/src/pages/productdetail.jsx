import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/productdetails.css";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/listing/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();
        setProduct(data);
        updateRemainingTime(data.END_AT);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Calculate and update remaining time
  const updateRemainingTime = (endAt) => {
    const endTime = new Date(endAt).getTime();
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference <= 0) {
      setRemainingTime("Expired");
      return;
    }

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (product) {
        updateRemainingTime(product.END_AT);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [product]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-details">
      <img src={`http://localhost:3001${product.IMAGE_URL}`} alt={product.NAME} className="product-image" />
      <table className="product-info">
      <h1>{product.NAME}</h1>
            <table>
                <tr>
                    <td><strong>Brand</strong></td>
                    <td>{product.BRAND}</td>
                </tr>
                <tr>
                    <td><strong>Style</strong></td>
                    <td>{product.STYLE}</td>
                </tr>
                <tr>
                    <td><strong>Color</strong></td>
                    <td>{product.COLOR}</td>
                </tr>
                <tr>
                    <td><strong>Material</strong></td>
                    <td>{product.MATERIAL}</td>
                </tr>
                <tr>
                    <td><strong>Hardware</strong></td>
                    <td>{product.HARDWARE}</td>
                </tr>
                <tr>
                    <td><strong>Size</strong></td>
                    <td>{product.SIZE}</td>
                </tr>
                <tr>
                    <td><strong>Current Bid</strong></td>
                    <td>£{product.CURRENT_BID}</td>
                </tr>
            </table>
            <button class="bidding-button">Bid Now</button>
      </table>
    </div>
  );
};

export default ProductDetails;
