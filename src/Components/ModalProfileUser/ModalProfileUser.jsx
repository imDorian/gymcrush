import React from 'react'
import { GetAge } from '../GetAge/GetAge'
import './ModalProfileUser.scss'

const ModalProfileUser = ({user, isOpen}) => {
 
const {name, aboutMe, gender, imageProfile, myGym, ubication, images, gymExperiences} = user

  return (
    <div className='modal_profile'>
        <img 
          className='modal_profile__heading'
          src='/heading.svg' alt='' onClick={()=>isOpen()} />
        <img
          className='modal_profile__img'
          src={imageProfile} alt='' />

        <ul className='modal_profile__info'>
          <li><h2>{name}, {GetAge(user)}</h2></li>
          <li><h5>About Me:</h5>
          <p>{aboutMe}</p></li>
          <li><h5>Gender:</h5>{gender}</li>
          <li><h5>Gym Experiences:</h5>{gymExperiences}</li>
          <li><h5>GYM:</h5>{myGym}</li>
          <li><h5>Ubication:</h5>{ubication}</li>
        </ul>
        
    </div>
  )
}

export default ModalProfileUser