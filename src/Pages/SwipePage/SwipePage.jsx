import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CardUser from '../../Components/CardUser/CardUser'
import IsLoading from '../../Components/IsLoading/IsLoading'
import NavBottom from '../../Components/NavBottom/NavBottom'
import TopBar from '../../Components/TopBar/TopBar'
import { myContext } from '../../Contexts/MyContextProvider'
import { usersContext } from '../../Contexts/UsersContextProvider'
import './SwipePage.scss'

const SwipePage = () => {
  const [users, setUsers] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    
    const getUsers = async () =>{
        setIsLoading(true)
        await axios.get(process.env.REACT_APP_BACKEND + `/users/getall`)
        .then(res=>{
            setUsers(res.data)
            console.log(res.data)
        }) 
        setIsLoading(false)
    }
    getUsers()
  
},[])

  return (<>
  <TopBar/>
    <div className='swipe'>
      {isLoading ? <IsLoading/> :
      <CardUser users={users}/>
    }
    
    </div>
    <NavBottom/>
  </>
    
  )
}

export default SwipePage