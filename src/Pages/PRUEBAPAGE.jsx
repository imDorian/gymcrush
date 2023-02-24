import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'


const PRUEBAPAGE = () => {
    const [userCookie] = useState(Cookies.get('userInfo'))
    const [user, setUser] = useState('')
    
  

    useEffect(()=>{
        const getUser = async () => {
            await axios.get(process.env.REACT_APP_BACKEND + `/users/get/${userCookie}`)
            .then(res=>{
                setUser(res.data)
                console.log(res.data)
            })
        }
        getUser()
    },[])

    const createMatch = async () => {
        const newMatch = {
            userOne:user._id,
            userTwo:'63d0e74624d1f0b309863d81'
        }
        await axios.post(process.env.REACT_APP_BACKEND + `/matches/post`, newMatch)
        .then(res=>{
            console.log(res.data)
        })
    }
  return (
    
    <div>
        Prueba Page
       
        <button onClick={()=>createMatch()}>crear un match</button>
    </div>
  )
}

export default PRUEBAPAGE