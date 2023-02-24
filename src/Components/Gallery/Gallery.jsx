import React from 'react'
import './Gallery.scss'

const Gallery = ({images}) => {

    const completeImage = () => {
        
    }

  return (
    <div className='container-gallery'>
        <ul className='gallery'>
            {images?images.map((image, index) => <img onClick={()=>completeImage()} key={index} className='gallery-images' src={image} alt=''/>):'arent images'}
        </ul>
        
    </div>
  )
}

export default Gallery