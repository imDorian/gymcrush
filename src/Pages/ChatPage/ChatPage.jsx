import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState, useRef, useContext } from 'react'
import TopBar from '../../Components/TopBar/TopBar'
import './ChatPage.scss'
import IsLoading from '../../Components/IsLoading/IsLoading'
import io from 'socket.io-client'
import { animateScroll as scroll} from 'react-scroll'
import {myContext} from '../../Contexts/MyContextProvider'

const socket = io.connect(process.env.REACT_APP_BACKEND)

const ChatPage = () => {
    const url = window.location.pathname;
    const partes = url.split('/');
    const url_id = partes[partes.length - 1];

    const bottomRef = useRef(null)

    const {context, setContext} = useContext(myContext)
    const [match, setMatch] = useState('')
    const [userCookie] = useState(Cookies.get('userInfo'))
    const [isLoading, setIsLoading] = useState(false)
    const [userMatch, setUserMatch] = useState('')

    const [room] = useState(url_id)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState('')
    const [userData, setUserData] = useState('')


    useEffect(()=>{
       async function getMatch(){
            setIsLoading(true)
            const myMatch = await axios.get(process.env.REACT_APP_BACKEND + `/matches/get/${url_id}`)
            setMatch(myMatch.data)
            setUserMatch(myMatch.data.userOne._id === userCookie ? myMatch.data.userTwo : myMatch.data.userOne)
            // console.log(myMatch.data)
        }
   
        const getContext = async () => {
            await axios.get(process.env.REACT_APP_BACKEND + `/users/get/${userCookie}`)
            .then(res=>{
              setContext(res.data)
              setUserData({
                name: res.data.name,
                image: res.data.imageProfile,
                id: res.data._id
              })
            //   console.log(res.data)
            })
            setIsLoading(false)
          }

          getMatch()
          getContext()
    },[])


    const joinRoom = () => {
        if (room !== "") {
          socket.emit("join_room", room);
        //   console.log(room)
        }
      };
      joinRoom()

    useEffect(() => {
        socket.on("receive_message", (data) => {
          const newMessage = {
            body: data.message,
            from: data.userData.name,
            id: data.userData.id
          }
          // console.log(messages)
          setMessages([...messages, newMessage]);
          console.log(data)
        });
        scroll.scrollToBottom()
    
      }, [socket]);


    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [messages]);

    useEffect(()=>{
        console.log(messages)
    },[messages])

    useEffect(()=>{
        console.log(userData)
    },[userData])

    useEffect(()=>{
        console.log(userMatch)
    },[userMatch])

    const sendMessage = () => {
        if(message !== ""){

        socket.emit("send_message", {message, room, userData} );
        const newMessage = {
            body: message,
            from: userData.name,
            id: userData.id
        }
        setMessages([...messages, newMessage])
        scroll.scrollToBottom()
        setMessage('')
        // console.log(messages)
        
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
      }

  return (<>
    {isLoading ? <IsLoading/> :
    <div className='chat-page'>
    
    <TopBar title={match && match.userOne._id === userCookie ? match && match.userTwo.name : match && match.userOne.name} />

    <ul className='chat-page__messages'>

    {messages && messages.map( (message, index) =>
        <li className='chat-page__messages__li' key={index}>
            {message.id === userCookie ? 
            
            <>
                <p className='chat-page__messages__li__my-message'> {message.body}</p>
            </>
             :
            <>
                <img className='chat-page__messages__li__img' alt='' 
                    src={userMatch.imageProfile}
                 />
                <p className='chat-page__messages__li__user-message'>{message.body}</p>
            </>
             }
            
        </li>
    )}

    </ul>

    <form className='chat-page__text' onSubmit={handleSubmit}>
        <input className='chat-page__text_input' type='text' placeholder='message...' 
            value={message}
            onChange={e => setMessage(e.target.value)}
        />
        <button onClick={()=> sendMessage()} className='chat-page__text_btn'></button>
    </form>

    </div>}
 </> )
}

export default ChatPage