import axios from 'axios'
// import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ArrowBack from '../../Components/ArrowBack/ArrowBack'
import './SignUpPage.scss'
import { useNavigate } from 'react-router-dom'
import { comunidades } from '../MyUserPage/MyUserPage'

const SignUpPage = () => {
  const navigate = useNavigate()

  const messages = {
    req:'This is required'
  }

  const {handleSubmit, register} = useForm()
  // const [newUser, setNewUser] = useState({
  //   name:'',
  //   email:'',
  //   password:'',
  //   birthdate:'',
  //   gender:''

  // })
   

  const onSubmit = (data) => {
    console.log(data)
    const dateNow = new Date()
    const born = new Date(data.birthdate)
    const yearsOld = dateNow.getFullYear() - born.getFullYear()

    axios.post(process.env.REACT_APP_BACKEND + '/users/register' , data).then(res =>{
      console.log('usuario creado')
    })
    navigate('/login')
  }


  return (
    <div className='container signup-container'>
  <ArrowBack back='/'/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name
          <input type="text" placeholder='name' {...register('name',{
            required: messages.req
          })}/>
        </label>
        <label>
          Email
          <input type="email" placeholder='email' {...register('email', {
            required: messages.req
          })}/>
        </label>
        <label>
          Password
          <input type="password" placeholder='password' {...register('password', {
            required:messages.req
          })}/>
        </label>
        <label>
          Birthday
          <input type="date" {...register('birthdate', {
            required:messages.req
          })}/>
        </label>
        <label>
          Gender
          <select type="gender" placeholder="gender" {...register('gender',{
            required:messages.req
          })}>
            <option>Man</option>
            <option>Woman</option>
            <option>Another</option>
          </select>
        </label>
        <label>
          Ubication
          <select
          {...register('ubication',{
          required: messages.req
          })}
          >
            {comunidades.map((comunidad, index)=> 
            <option key={index}>{comunidad}</option>
            )}
          </select>
        </label>

        <button className='btn btn-outline-danger'>Sign Up</button>
      </form>

    </div>
  )
}

export default SignUpPage