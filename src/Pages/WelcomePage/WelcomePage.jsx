import React from 'react'
import { Link } from 'react-router-dom'
import './WelcomePage.scss'

const WelcomePage = () => {
  return (
    <div className='welcome-container'>
      
    
    <div className='d-flex justify-content-center flex-column gap-3 align-items-center welcome'>
    <h1>GYM-DER</h1>
    <Link to='/login'><button className='btn btn-outline-primary'>Log In</button></Link>
    <Link to='/signup'><button className='btn btn-primary'>Sign Up</button></Link>
    </div>

    </div>
  )
}

export default WelcomePage