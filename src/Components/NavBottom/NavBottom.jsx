import React from 'react'
import './NavBottom.scss'
import { Link } from 'react-router-dom'

const NavBottom = () => {
  return (
    <nav className='nav-bottom'>
        <ul>
            <li><Link to={'/swipe'}><img src='/boxheart-swipe.svg' alt='swipe'/></Link><span>Swipe</span></li>
            <li><Link to={'/likes'}><img src='/heart-likes.svg' alt='likes'/></Link><span>Likes</span></li>
            <li><Link to={'/chat'}><img src='/heart-chat.svg' alt='chat'/></Link><span>Chat</span></li>
            <li><Link to={'/myprofile'}><img src='/person-myprofile.svg' alt='profile'/></Link><span>Profile</span></li>
        </ul>
    </nav>
  )
}

export default NavBottom