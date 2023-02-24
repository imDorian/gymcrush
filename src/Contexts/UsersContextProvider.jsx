import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const usersContext = createContext()

const UsersContextProvider = ({children}) => {
    const [users, setUsers] = useState('')
    
  return (
    <usersContext.Provider value={{users, setUsers}}>
        {children}
    </usersContext.Provider>
  )
}


export default UsersContextProvider