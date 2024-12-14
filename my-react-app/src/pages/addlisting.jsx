import React, { useState } from 'react'
import '../styles/addlisting.css'

const CreateListing = () => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    brand: '',
    style: '',
    size: '',
    color: '',
    hardware: '',
    material: '',
    startingBid: '',
    duration: '',
    image: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key])
    })

    try {
      const response = await fetch('http://localhost:3001/admin/create_listing', {
        method: 'POST',
        credentials: "include", 
        body: data,
      })
      if (response.ok) {
        alert('Listing created successfully!')
        setFormData({
          category: '',
          name: '',
          brand: '',
          style: '',
          size: '',
          color: '',
          hardware: '',
          material: '',
          startingBid: '',
          duration: '',
          image: null,
        })
      } else {
        alert('Failed to create listing.')
      }
    } catch (error) {
      console.error('Error creating listing:', error.message)
    }
  }

  return (
    <div className='create-listing'>
      <h1>Create New Listing</h1>
      <form onSubmit={handleSubmit} className='listing-form'>
        <label>
          Category:
          <input
            type='text'
            name='category'
            value={formData.category}
            onChange={handleChange}
            required />
        </label>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required />
        </label>
        <label>
          Brand:
          <input
            type='text'
            name='brand'
            value={formData.brand}
            onChange={handleChange}
            required
            />
        </label>
        <label>
          Style:
          <input 
          type='text' 
          name='style' 
          value={formData.style} 
          onChange={handleChange} 
          />
        </label>
        <label>
          Size:
          <input 
          type='text' 
          name='size' 
          value={formData.size} 
          onChange={handleChange} 
          />
        </label>
        <label>
          Color:
          <input 
          type='text' 
          name='color' 
          value={formData.color} 
          onChange={handleChange} 
          />
        </label>
        <label>
          Hardware:
          <input 
          type='text' 
          name='hardware' 
          value={formData.hardware} 
          onChange={handleChange} 
          />
        </label>
        <label>
          Material:
          <input 
          type='text' 
          name='material' 
          value={formData.material} 
          onChange={handleChange} 
          />
        </label>
        <label>
          Starting Bid (£):
          <input
            type='number'
            name='startingBid'
            value={formData.startingBid}
            onChange={handleChange}
            required 
            />
        </label>
        <label>
          Duration (Days):
          <input
            type='number'
            name='duration'
            value={formData.duration}
            onChange={handleChange}
            required 
            />
        </label>
        <label>
          Image:
          <input 
          type='file' 
          name='image' 
          accept='image/*' 
          onChange={handleImageChange} 
          required />
        </label>
        <button type='submit'>Create Listing</button>
      </form>
    </div>
  )
}

export default CreateListing
