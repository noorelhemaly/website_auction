import React from 'react'
import './../styles/register.css'

const Register = () => {
  return (
    <div class='registration'>
      <form class='registration-form'>

        <h1>Create Account</h1>

        <input type='text' placeholder='Name' required />

        <input type='idnumber' placeholder='ID Number' required />

        <input type='email' placeholder='Email' required />

        <input type='password' placeholder='Password' required />

        <button type='submit'>Submit</button>

        <p>
          Already have an account? <a href='/user/login'>Login here</a>
        </p>

      </form>
    </div>
)}

export default Register
