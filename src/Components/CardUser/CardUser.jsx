import React, { useContext, useEffect, useState } from 'react'
import './CardUser.scss'
import axios from 'axios'
import Cookies from 'js-cookie'
import { myContext } from '../../Contexts/MyContextProvider'
import { useNavigate } from 'react-router-dom'
import ModalProfileUser from '../ModalProfileUser/ModalProfileUser'
import { GetAge } from '../GetAge/GetAge'



export const defaultImageUsers= 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'


const CardUser = ({users}) => {
    const {context, setContext} = useContext(myContext)
    const userCookie = Cookies.get('userInfo')
    const [matches, setMatches] = useState(context.matches)
    const [isMatch, setIsMatch] = useState(false)
    const [match, setMatch] = useState('')
    const navigate = useNavigate()
    const [userSelected, setUserSelected] = useState('')
    const [isUserModal, setIsUserModal] = useState(false)


    const getUser = (e) => {
        setUserSelected(e)
        setIsUserModal(true)
    }
    
    if(!context){
                  
        const getContext = async () => {
            await axios.get(process.env.REACT_APP_BACKEND + `/users/get/${userCookie}`)
            .then(res=> {
                setContext(res.data)
            })
        }
        getContext()
}

async function iDontLike(e){
    const newDislike = [...context.iDontLike, e._id];
    const newUser = {
        iDontLike: newDislike,
        match: context.match,
        iLike: context.iLike
    }
    const putUser = await axios.put(process.env.REACT_APP_BACKEND + `/users/put/${userCookie}`, newUser)
    setContext(putUser.data)
    console.log(putUser.data)
}
  

const like = (user) => {
       
        let likeYet = false
        for (const like of context.iLike) {
            if(user._id === like._id){
                likeYet = true
            }
        }
        if(!likeYet){
            const putUser = () => {

                const isMatchNow = user.iLike.find(user => user._id === userCookie)
                
                if(isMatchNow){
                    
                    async function match(){
                        setIsMatch(true)
                        setMatch(user)

                        const newMatch = {
                        userOne: userCookie,
                        userTwo: user._id
                        }

                        const postMatch = await axios.post(process.env.REACT_APP_BACKEND + `/matches/post`, newMatch)
                        const resMatch = postMatch.data
                        console.log(resMatch)
                    
                        const newLike = [...context.iLike, user._id]
                        const newMatches = [...context.match, resMatch._id]

                        const newUser = {
                            iLike : newLike,
                            match: newMatches,
                            iDontLike: context.iDontLike
                        }

                        const putUser = await axios.put(process.env.REACT_APP_BACKEND + `/users/put/${userCookie}`, newUser)
                  
                            console.log(putUser.data)
                            setMatches(putUser.data.matches)
                            setContext(putUser.data)

                            const newUserDataMatch = {
                                iLike: user.iLike,
                                match: [...user.match, resMatch._id],
                                iDontLike: user.iDontLike
                            }
                    
                            const putUserDataMatch = await axios.put(process.env.REACT_APP_BACKEND + `/users/put/${user._id}`, newUserDataMatch)
                            console.log(putUserDataMatch.data)
                  }

                    match()
                    
                } else {
                    const newLike = [...context.iLike, user._id]

                    const newUser = {
                    iLike: newLike,
                    match: context.match,
                    iDontLike: context.iDontLike
                }
            
                const putLike = async () => {
                    await axios.put(process.env.REACT_APP_BACKEND + `/users/put/${userCookie}`, newUser)
                .then((res)=> {
                    setContext(res.data)
                    console.log(res.data)
                })
                }
                putLike()
            }}
            putUser() 
        }}
    

    const deleteLikes = async () => {
        const deleteLikes = {
            iLike: [''],
            match:[''],
            iDontLike:['']
        }
        await axios.put(process.env.REACT_APP_BACKEND + `/users/put/${userCookie}`, deleteLikes)
        .then((res) => {
            console.log(res.data)
            setContext(res.data)
            
        })
    }

    const openModal = () =>{
        return(
    <ModalProfileUser user={match} isOpen={()=>setIsUserModal(true)}/>
        )
    
    }

    const modalIsMatch = () => 
       isMatch && (<div className='modal_match' style={{
                    position:'fixed',
                    top: '50%',
                    left:'50%',
                    backgroundColor:'pink',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px #ccc',
                    zIndex:'1000',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent:'center',
                    gap:'10px'

                }}>
                    <h2>¡You have a Match with {match.name}!</h2>
                    <img onClick={()=> setIsMatch(false)}
                    style={{
                        width:'35px',
                        fill:'#ff0000',
                        position: 'fixed',
                        top:'0',
                        right:'10px'
                    }}
                    src='/heading.svg' alt='close'/>

                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                        gap:'10px'
                    }}>
                    <button onClick={()=> openModal()} className='btn__see-profile'>See Profile</button>
                    <button className='btn__send-message'>Send a Message</button>
                    </div>

                    </div>)
                
                
            
        
    
    

  return (
    <>
    {isUserModal && userSelected && (
        <ModalProfileUser user={userSelected} isOpen={()=>setIsUserModal(false)}/>
    )}
    <button onClick={()=> deleteLikes()}>delete all likes</button>
        {users && users.map( user =>
                user._id !== userCookie &&
                !context.match.filter(match => match._id === user._id).length &&
                !context.iDontLike.filter(idont => idont._id === user._id).length &&
                !context.iLike.filter(like => like._id === user._id).length &&
                
                <div key={user._id} className='cardUser'>
                    <img src={user.imageProfile || defaultImageUsers} alt=''
                    onClick={()=> getUser(user)}  
                    className='cardUser__image'
                    /> 
                    
                    <div className='cardUser__info'>
                        <h2>{user.name}, {GetAge(user)}</h2>
                    </div>
                    <div className='cardUser__box_heartLike' onClick={()=>like(user)}>
                        <img className='heartLike' src='/heart.svg' alt=''/>
                    </div>
                    <div className='cardUser__box_heartbreack' onClick={()=> iDontLike(user)}>
                        <img className='heartbreack' src='/heartbreack.svg' alt=''/>
                    </div>
                    
                </div>
                 )}     
                 {modalIsMatch()}

    </>
  )
}

export default CardUser