import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export const myContext = createContext()

const MyContextProvider = ({children}) => {
  const [context, setContext] = useState('')

  return (
    
    <myContext.Provider value={{context, setContext}}>
        {children}
    </myContext.Provider>
    
    
  )
}

export default MyContextProvider