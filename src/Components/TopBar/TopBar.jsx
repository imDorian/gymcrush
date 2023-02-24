import React from 'react'
import './TopBar.scss'

const TopBar = ({btn, title}) => {
    return (
    <nav className='topBar'>
        <img src='/logo192.png' alt='brand'/>
        <h2>{title}</h2>
        {btn}
    </nav>
  )
}

export default TopBar