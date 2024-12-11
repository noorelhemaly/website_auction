import React, { useState } from "react";

const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [hardware, setHardware] = useState("");
  const [material, setMaterial] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");

  const createListing = () => {
    const token = localStorage.getItem("adminToken");

    fetch("http://localhost:3001/admin/create_listing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        category,
        imageUrl,
        name,
        brand,
        style,
        size,
        color,
        hardware,
        material,
        startingBid,
        duration,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to create listing. Status code: ${response.status}`);
        }
        setMessage("Listing created successfully!");
        alert("Listing created successfully!");
        // Reset form
        setCategory("");
        setImageUrl("");
        setName("");
        setBrand("");
        setStyle("");
        setSize("");
        setColor("");
        setHardware("");
        setMaterial("");
        setStartingBid("");
        setDuration("");
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
        alert(error.message);
      });
  };

  return (
    <div className="form-section">
      <h3>Create a New Listing</h3>
      <form>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Hardware"
          value={hardware}
          onChange={(e) => setHardware(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Starting Bid"
          value={startingBid}
          onChange={(e) => setStartingBid(e.target.value)}
          required
        />
        <br />
        <input
          type="number"
          placeholder="Duration (days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <br />
        <button type="button" onClick={createListing}>
          Create Listing
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateListing;
