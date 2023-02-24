import React, { useContext, useEffect, useState } from 'react'
import GalleryUsers from '../../Components/GalleryUsers/GalleryUsers'
import GetAllLikes from '../../Components/GetAllLikes/GetAllLikes'
import NavBottom from '../../Components/NavBottom/NavBottom'
import TopBar from '../../Components/TopBar/TopBar'
import './LikesPage.scss'


// import axios from 'axios'


const LikesPage = () => {
  return (<>
  <TopBar title={'They Like You'}/>
    <GetAllLikes/>
  <NavBottom/>
    </>
  )
}

export default LikesPage