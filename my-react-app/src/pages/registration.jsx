import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [idnumber, setIdnumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch('http://localhost:3001/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, idnumber, email, password, isAdmin: false }),
      });

      if (!response.ok) {
        throw new Error(await response.text()); 
      }

      setMessage('Registration successful!');
      alert('Registration successful! Redirecting to login...');
      navigate('/login'); 
    } catch (error) {
      setMessage(error.message);
      alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div className="registration">
      <form className="registration-form" onSubmit={registerUser}>
        <h1>Create Account</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="ID Number"
          value={idnumber}
          onChange={(e) => setIdnumber(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
      {message && <p className="message">{message}</p>} 
    </div>
  );
};

export default Register;
