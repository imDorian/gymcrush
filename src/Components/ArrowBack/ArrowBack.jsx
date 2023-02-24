import React from 'react'
import { Link } from 'react-router-dom'
import './ArrowBack.scss'


const ArrowBack = ({back}) => {

  return (
    <Link to={back}><img className='arrow-back' src='/arrow-back.svg' alt='back' /></Link>
  )
}

export default ArrowBack