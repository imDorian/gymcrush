import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { myContext } from '../../Contexts/MyContextProvider'
import axios from 'axios'
import { comunidades } from '../../Pages/MyUserPage/MyUserPage'
import { GetAge } from '../GetAge/GetAge'


const FormProfile = ({editUser, setEditUser, btnChange}) => {
    const {context, setContext} = useContext(myContext)
    
    const {register, handleSubmit} = useForm()

    const comOptions = comunidades.map((comunidad, index) => (
    <option key={index}>{comunidad}</option>
    ))
  
   const styleNoEdit = {
    color: "black",
    border: "transparent",
    backgroundColor: "transparent",
    }
   
   const styleEdit = {
    color: "black",
    border: 'black 1px solid'
   }

    const onSubmit = async (data) => {
        // console.log(data)
        let newUserInfo = {
            name: data.name?data.name:context.name,
            gender: data.gender?data.gender:context.gender,
            aboutMe: data.aboutMe?data.aboutMe:context.aboutMe,
            myGym: data.myGym?data.myGym:context.myGym,
            ubication: data.ubication?data.ubication:context.ubication,
            gymExperiences: data.gymExperiences?data.gymExperiences:context.gymExperiences,
            images: context.images
        }
        await axios.put(process.env.REACT_APP_BACKEND + `/users/put/${context._id}`, newUserInfo)
        .then((res) => {
            setContext(res.data)
        })
        setEditUser(true)
    }



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="myProfile-form">
<label>
    <h1>
    <input
    type='text'
    style={{
      display: editUser?'none':'flex'
    }} 
    disabled={editUser} 
    placeholder={context.name}
    {...register('name')}
    /></h1>

    <h1 style={{
      display: editUser?'flex':'none'
    }}>{context.name}, {GetAge(context)}</h1>
</label>

<label>
  <h3>About Me</h3>
  <textarea rows="10" cols="50" 
  style={editUser===true?{display:'none'}:styleEdit} 
  disabled={editUser} 
  placeholder='Tell us about yourself'
  {...register('aboutMe')}
  />
  <p style={{
    display: editUser?'flex':'none'
  }}>{context.aboutMe}</p>
</label>

<label>
<h3>Gender</h3>
  <select  
  disabled={editUser} 
  style={{
    display: editUser?'none':'flex'
  }}
  // value={context.gender}
  {...register('gender')}
  >
    <option>Man</option>
    <option>Women</option>
    <option>Another</option>
  </select>

  <span style={{
    display: editUser?'flex':'none'
  }}>{context.gender}</span>
</label>

<label>
  <h3>My GYM</h3>
  <input 
  type="text" 
  placeholder={context.myGym?context.myGym:'Your name GYM'} 
  style={editUser===true?styleNoEdit:styleEdit} 
  disabled={editUser}
  {...register('myGym')}
  />
</label>

<label>
  <h3>GYM Experiences</h3>
  <select 
  disabled={editUser} 
  style={{
    display: editUser?'none':'flex'
  }}
  // value={context.gymExperiences}
  {...register('gymExperiences')}
  >
    <option>Less than year</option>
    <option>More than year</option>
    <option>More than 2 years</option>
    <option>More than 3 years</option>
    <option>More than 4 years</option>
  </select>

  <span style={{
    display: editUser?'flex':'none'
  }}>{context.gymExperiences?context.gymExperiences:
  'Please, complete the information'
  }</span>
</label>

<label>
  <h3>Ubication</h3>
  <select
  disabled={editUser} 
  style={{
    display: editUser?'none':'flex'
  }}
  {...register('ubication')}
  >
       {comOptions}
  </select>
  <span style={{
    display: editUser?'flex':'none'
  }}>{context.ubication}</span>
</label>

  <button style={btnChange} className='btn btn-outline-primary'>Aplicar Cambios</button>

</form>
  )
}

export default FormProfile