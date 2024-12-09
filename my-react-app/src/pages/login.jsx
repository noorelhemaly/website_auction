import React from 'react'
import './../styles/login.css'

const Login = () => {
  return (
    <div className='login'>
      <form className='login-form'>

        <h1>Login</h1>

        <input type='email' placeholder='Email' required />
        
        <input type='password' placeholder='Password' required />
        
        <button type='submit'>Login</button>
        
        <p>
          Don't have an account? <a href='/register'>Create your account here</a>
        </p>
      
      </form>
    </div>
)}

export default Login
