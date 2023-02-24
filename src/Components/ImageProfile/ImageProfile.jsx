import React, { useContext, useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import './ImageProfile.scss'
import { myContext } from '../../Contexts/MyContextProvider'
import IsLoading from '../IsLoading/IsLoading'

const ImageProfile = ({editUser}) => {
    const {context, setContext} = useContext(myContext)
    const userCookie = Cookies.get('userInfo')
    const [isLoading, setIsLoading] = useState(false)

    const styleImage = {
        width: '320px',
        height: '380px',
        borderRadius:'10px',
        objectFit: 'cover',
    }

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [uploadImageP, setUploadImageP] = useState("")

    useEffect( () => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
          cloudName: "ddizzpwdw",
          uploadPreset: "gtixgvxn"
        }, function(error, result) {
          if (!error && result && result.event === "success") {
            setUploadImageP(result.info.secure_url);
            console.log(result)
          }
        })
        
      },[])

      const postImage = async () => {
        let newImage = {
          imageProfile: uploadImageP
        }
        // console.log(newImages)
        if(uploadImageP){
        await axios.put(process.env.REACT_APP_BACKEND + `/users/put/${context._id}`, newImage)
        .then((res) => {
          // console.log(res.data)
          setContext(res.data)
        })
      }}


  return (<>
      <div className='imageProfile'>
      <img style={styleImage} src={context.imageProfile || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt='imageProfile' />

    <div className='imageProfile-btnBox'>
     <button className='btn btn-outline-primary' style={editUser} onClick={()=> widgetRef.current.open()}>
      Select
    </button>
    <button className='btn btn-primary' style={editUser} onClick={postImage}>Change</button>
    </div>
 
 </div> 
 </>)
}

export default ImageProfile