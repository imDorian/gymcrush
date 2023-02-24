import React, { useContext, useEffect, useState } from 'react'
import NavBottom from '../../Components/NavBottom/NavBottom'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import './MyUserPage.scss'
import ImageUpload from '../../Components/ImageUpload/ImageUpload'
import ImageProfile from '../../Components/ImageProfile/ImageProfile'
import TopBar from '../../Components/TopBar/TopBar'
import Gallery from '../../Components/Gallery/Gallery'
import { myContext } from '../../Contexts/MyContextProvider'
import { usersContext } from '../../Contexts/UsersContextProvider'
import FormProfile from '../../Components/FormProfile/FormProfile'
import axios from 'axios'
import IsLoading from '../../Components/IsLoading/IsLoading'

export const comunidades = [
  "Andalucía",
  "Aragón",
  "Principado de Asturias",
  'Illes Balears',
  'Canarias',
  'Cantabria',
  'Castilla y León',
  'Castilla-La Mancha',
  'Cataluña',
  'Comunitat Valenciana',
  'Extremadura',
  'Galicia',
  'Comunidad de Madrid',
  'Región de Murcia',
  'Comunidad Foral de Navarra',
  'País Vasco',
  'La Rioja',
  'Ciudad Autónoma de Ceuta',
  'Ciudad Autónoma de Melilla'
  ]

const MyUserPage = () => {
  const {context, setContext} = useContext(myContext)
  const {setUsers} = useContext(usersContext)
  const [editUser, setEditUser] = useState(true)
  const [userCookie] = useState(Cookies.get('userInfo'))
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(()=>{
    if(!context){
      const getMyProfile = async () =>{
        setIsLoading(true)
        await axios.get(process.env.REACT_APP_BACKEND + `/users/get/${userCookie}`)
        .then(res=>{
          setContext(res.data)
          console.log(res.data)
        })
        setIsLoading(false)
      }
      getMyProfile()
    }
    
  },[])



  const changeUserInfo = () => {
    if(editUser){
    setEditUser(false)
    } else {
      setEditUser(true)
    }
  }

 

  const deleteCookies = () => {
   Cookies.remove('userInfo')
   setContext('')
   setUsers('')
   navigate('/login')
  }

  


 const btnChange = {
  display: !editUser?"flex":"none"
 }

 const btnEdit = <button onClick={()=> changeUserInfo()} className='btn btn-outline-primary'>Edit</button>
 



  return (<>
  <TopBar btn={btnEdit}/>
 
    <div className='myProfile'>
    {isLoading?<IsLoading/>:<>
      <ImageProfile editUser={btnChange} />
      <ImageUpload editUser={btnChange} />
      <Gallery images={context.images}/>
      <FormProfile editUser={editUser} setEditUser={setEditUser} btnChange={btnChange} />
      <button onClick={()=>deleteCookies()} className='btn btn-danger mt-5'>Log Out</button>
    
</>}
    </div>
<NavBottom/>
</>
  )
}

export default MyUserPage