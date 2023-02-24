import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import NavBottom from '../../Components/NavBottom/NavBottom'
import TopBar from '../../Components/TopBar/TopBar'
import { myContext } from '../../Contexts/MyContextProvider'
import './ChatListPage.scss'
import { defaultImageUsers } from '../../Components/CardUser/CardUser'
import ChatList from '../../Components/ChatList/ChatList'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ChatListPage = () => {
  const [userCookie] = useState(Cookies.get('userInfo'))
  const {context, setContext} = useContext(myContext)
  const navigate = useNavigate()
  // const [matches, setMatches] = useState(context.iLike.filter(user=> user.find(like=> like._id.includes(userCookie))))
  
  useEffect(()=>{
  
      const getContext = async () => {
        await axios.get(process.env.REACT_APP_BACKEND + `/users/get/${userCookie}`)
        .then(res=>{
          setContext(res.data)
          console.log(res.data)
        })
      }
      getContext()

  },[])

  function onClickMessage(e){
    console.log(e)
    navigate(`/chat/${e._id}`)
  }

  return (<>
  <TopBar title={'Matches & Chats'}/>
     <ul className='match-list'>
        {context && context.match.map( match => 
    
   
        <li onClick={()=>onClickMessage(match)}  key={match._id}>
          <img className='match-list__img' src={match.userOne._id !== userCookie ? match.userOne.imageProfile : match.userTwo.imageProfile} alt=''/>
          <h4 className='match-list__name'>{match.userOne._id !== userCookie ? match.userOne.name : match.userTwo.name}</h4>
        </li>
          )}
     </ul>
     <ChatList/>
     <NavBottom/>
  </>
   
  )
}

export default ChatListPage