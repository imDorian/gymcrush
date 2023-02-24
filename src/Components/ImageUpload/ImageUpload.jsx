import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect, useRef } from 'react'
import Cookies from 'js-cookie';
import { myContext } from '../../Contexts/MyContextProvider';

const ImageUpload = ({editUser}) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const {context, setContext} = useContext(myContext)
  const userCookie = Cookies.get('userInfo')
  // console.log(context)

  const [uploadImage, setUploadImage] = useState("")

  useEffect( () => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: "ddizzpwdw",
      uploadPreset: "gtixgvxn"
    }, function(error, result) {
      if (!error && result && result.event === "success") {
        setUploadImage(result.info.secure_url);
        // console.log(result)
      }
    })
  },[])

  const postImage = async () => {
    let newImages = {
      images: [...context.images, uploadImage]
    }
    // console.log(newImages)
    if(uploadImage){
    await axios.put(process.env.REACT_APP_BACKEND + `/users/put/${userCookie}`, newImages)
    .then((res) => {
      // console.log(res.data)
      setContext(res.data)
      Cookies.remove('userInfo');
      Cookies.set('userInfo', JSON.stringify(res.data));
    })
  }}

  return (<div style={editUser} className='flex-column'>
  <img style={{width:"300px"}} src={uploadImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt='img'/>

    <button onClick={()=> widgetRef.current.open()}>
      Upload
    </button>

    <button onClick={()=> postImage()}>Cargar foto al perfil</button>

    </div>)
}

export default ImageUpload