import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ArrowBack from '../../Components/ArrowBack/ArrowBack'
import './LogInPage.scss'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { myContext } from '../../Contexts/MyContextProvider'

const LogInPage = () => {
  const {context, setContext} = useContext(myContext)
  // setContext('')
  // console.log(context)
  const navigate = useNavigate()
  const {handleSubmit, register, formState:{errors}} = useForm()
  Cookies.remove('userInfo')
  // console.log(Cookies.get())

  const messages = {
    req:"This is required"
  }

 const OnSubmit = (data) => {

  axios.post(process.env.REACT_APP_BACKEND + '/users/login', data)
  .then(response => {
    // console.log(response.data)
    if(response.data.token){
    const userCookie = response.data.user._id

    Cookies.set('userInfo', userCookie)
    setContext(response.data.user)
    // console.log(Cookies.get())

      navigate('/swipe')
    } else {
     }
    // let token = response.data.tokens
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    // document.cookie = 'user' + user
    // console.log(user)
   
  })


 }

  
  
  return (

    <div className='cotainer login-container'>
    <ArrowBack back={'/'}/>

    <form className='form' onSubmit={handleSubmit(OnSubmit)}>
      <label>
        Username or Email
        <input type='email' className='form-control' placeholder='Username or Email' {...register('email',{
          required: messages.req
        })}/>
        {
          errors.mail && <span>{'Email or password is wrong'}</span>
        }
      </label>
      <label>
        Password
        <input type='password' className='form-control' placeholder='Password' {...register('password',{
          required:messages.req
        })}/>
      </label>
      <button className='btn btn-danger'>Log In</button>
    </form>

    </div>
   
  )
}

export default LogInPage