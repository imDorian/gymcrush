import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {useForm} from 'react-hook-form'

const EditUserPage = () => {
    const {register, handleSubmit} = useForm()

    const userCookie = JSON.parse(Cookies.get('userInfo'))
    const [userInfo, setUserInfo] = useState("")
    // console.log(userCookie)

    useEffect( () => {
        const getUserInfo = async () =>{
        await axios.get(process.env.REACT_APP_BACKEND + `/users/get/${userCookie._id}`)
        .then((res) => {
            // setUserInfo(res.data)
            console.log(res.data)
        })
        }
        getUserInfo()
    },[])

    const onSubmit = async (data) => {
        console.log(data)
        let newUserInfo = {
            name: data.name?data.name:userCookie.name
        }
        await axios.put(process.env.REACT_APP_BACKEND + `/users/put/${userCookie._id}`, newUserInfo)
        .then((res) => {
            console.log(res.data);
        })
    }
    
  return (

    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
    <input type='text' placeholder={userCookie.name} {...register('name')} />
    <button>Change</button>
    </form>
    </div>
  )
}

export default EditUserPage