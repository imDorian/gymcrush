import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { useAsyncError } from 'react-router-dom'
import { myContext } from '../../Contexts/MyContextProvider'
import Heading from '../Heading/Heading'
import './GalleryUsers.scss'


const GalleryUsers = () => {
    const {context, setContext} = useContext(myContext)
    console.log(context)
    const userCookie = Cookies.get('userInfo')
    const [userSelected, setUserSelected] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [matches, setMatches] = useState('')

    const handleOpen = (e) => {
      setIsOpen(true)
      setUserSelected(e._id)
      console.log(e._id)
    };

    const handleClose = () => setIsOpen(false);

    useEffect(()=>{
      console.log(matches)
    },[matches])


   useEffect(()=>{
    const getNewMatches = async () => {
      axios.get()
      const newMatches = context.iLike.filter(user=> user.iLike.find(like => like._id.includes(userCookie)))
      // const newMatches = iLikes.filter(user => user.iLike.find( like => like._id.includes(userCookie)))
      setMatches(newMatches)
    }
    getNewMatches()
   },[])

    const getAgeUsers = (e) => {

        let birthdate = new Date(e.birthdate)
        let nowDate = new Date()

        let diffInMilliseconds = nowDate - birthdate
        let age = (diffInMilliseconds / (1000 * 60 * 60 * 24 * 365)).toFixed(0)
        
        return age
    }

    const deleteMatch = async () => {
        let newMatchList = context.iLike.filter(user => user._id !== userSelected)
        console.log(newMatchList)
        console.log(userSelected)
        let newDataUser = {
            matches: newMatchList
        }
        await axios.put(process.env.REACT_APP_BACKEND + `/users/put/${userCookie}`, newDataUser)
        .then((res)=>{
            // console.log(res.data)
            setContext(res.data)
            setIsOpen(false)
        })
      
    }

    

    

  return (
    <ul className='container__gallery'>
        {
           matches && matches.map( user => 
                <li key={user._id}>
                    <img className='container__gallery__img' src={user.imageProfile || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='' />
                    <h2 className='gallery__name'>{user.name}, {getAgeUsers(user)}</h2>
                    <img className='chat_btn' src='/chat-dots-fill.svg' alt=''/>
                    <Heading close={()=>handleOpen(user)}/>
                    {isOpen&&(
            <div style={{
              background: 'white',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 0 10px #ccc',
              zIndex:'1000'
            }}>
              <h2>Are you sure?</h2>
              <p>You are about to delete the match </p>
              <div style={{
                display:'flex',
                flexDirection:'row',
                gap:'10px',
                alignItems:'center',
                justifyContent:'center'
              }}>
                <button className='btn__delete_match' onClick={()=>deleteMatch()}>Delete</button>
                <button className='btn__close' onClick={()=>handleClose()}>Close</button>
              </div>
            </div>
          )}
                </li>
                )
        }
        
    </ul>
  )
}

export default GalleryUsers