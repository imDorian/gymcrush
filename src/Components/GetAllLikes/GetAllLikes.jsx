import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../../Contexts/MyContextProvider'
import { usersContext } from '../../Contexts/UsersContextProvider'
import './GetAllLikes.scss'
import { defaultImageUsers } from '../CardUser/CardUser'
import ModalProfileUser from '../ModalProfileUser/ModalProfileUser'
import { GetAge } from '../GetAge/GetAge'
import IsLoading from '../IsLoading/IsLoading'


const GetAllLikes = () => {

    const [userCookie] = useState(Cookies.get('userInfo'))
    const [usersFiltered, setUserFiltred] = useState('')
    const {context, setContext} = useContext(myContext)
    const [userSelected, setUserSelected] = useState('')
    const [isUserModal, setIsUserModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [matchID, setMatchID] = useState('')
  
   
 useEffect(()=>{
    console.log(usersFiltered)
 },[usersFiltered])
    

    const getUser = (e) => {
        setUserSelected(e)
        setIsUserModal(true)
    }


    useEffect(()=>{

    async function getData(){
        setIsLoading(true)

       const getContext =
            await axios.get(process.env.REACT_APP_BACKEND + `/users/get/${userCookie}`)
            setContext(getContext.data)
            console.log(getContext.data)
      
        
       const getUsers = await axios.get(process.env.REACT_APP_BACKEND + `/users/getall`)
            console.log(getUsers.data);
            setUserFiltred(getUsers.data.filter(user => user.iLike.find( like => like._id.includes(userCookie))))
        
        setIsLoading(false)
    }
        getData()
      

    },[])
      

    async function iLike(e) {
           
        const newMatch = {
                userOne: userCookie,
                userTwo: e._id
            }

        const postMatch = await axios.post(process.env.REACT_APP_BACKEND + `/matches/post`, newMatch)

        const newLike = [...context.iLike, e._id]
        const newMatches = [...context.match, postMatch.data._id ]

        const newMyUser = {
            iLike: newLike,
            match: newMatches,
            iDontLike: context.iDontLike
        }

        const putMyUserData = await axios.put(process.env.REACT_APP_BACKEND + `/users/put/${userCookie}`, newMyUser)
            setContext(putMyUserData.data)
            console.log(putMyUserData.data)

        const newUserDataMatch = {
            iLike: e.iLike,
            match: [...e.match, postMatch.data._id],
            iDontLike: e.iDontLike
        }

        const putUserDataMatch = await axios.put(process.env.REACT_APP_BACKEND + `/users/put/${e._id}`, newUserDataMatch)
        console.log(putUserDataMatch.data)
        }
    
    async function iDontLike(e){
        const newDislike = [...context.iDontLike, e._id];
        const newUser = {
            iDontLike: newDislike,
            iLike: context.iLike,
            match: context.match
        }
        const putUser = await axios.put(process.env.REACT_APP_BACKEND + `/users/put/${userCookie}`, newUser)
        setContext(putUser.data)
        console.log(putUser.data)
    }

                       
    



  return (
    <>
    <ul className='container_gallery'>
        {isLoading ? 
        <IsLoading/> : 

                (usersFiltered && usersFiltered.map(user =>
                !context.match.filter(match => match._id === user._id).length &&
                !context.iDontLike.filter(idont => idont._id === user._id).length &&
                !context.iLike.filter(like => like._id === user._id).length 
                 ? 
                <li key={user._id} className='container_gallery__li'>
                <img onClick={()=> getUser(user)} className='container_gallery__li__img' src={user.imageProfile || defaultImageUsers } alt='' />
                <h3 className='container_gallery__li__name'>{user.name}, {GetAge(user)}</h3>

                <div className='container_gallery__li__box_btn'>
                    <button className='container_gallery__li__box_btn__accept' onClick={()=> iLike(user)}>Accept</button>
                    <button className='container_gallery__li__box_btn__cancel' onClick={()=> iDontLike(user)}>Cancel</button>
                </div>
                
            </li>:''
            ))}
    </ul>
    {isUserModal && userSelected && (
        <ModalProfileUser user={userSelected} isOpen={()=>setIsUserModal(false)}/>
    )}
    </>
  )
}

export default GetAllLikes