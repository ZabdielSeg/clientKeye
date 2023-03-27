import React, { createContext, useEffect, useState } from 'react';
import { getAllUsers, setToken } from '../components/Users/user-service';

export const UsersContext = createContext();

const UsersContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetchAllUsers()
    }, [users.length])

    const fetchAllUsers = () => {
        setToken()
        getAllUsers()
            .then(response => setUsers(response))
            .catch(error => console.log(error))
    }

    return (
        <UsersContext.Provider value={[users, fetchAllUsers]}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersContextProvider;