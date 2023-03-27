import React, { useContext, useEffect, useState } from 'react'
import UsersList from '../../components/Users/UsersList'
import { UsersContext } from '../../context/UsersContext';
import NoUsersPage from '../NoUsersPage';


const MainPage = () => {
  const [users, setUsers] = useContext(UsersContext)
  return (
    <section className='main-container'>
      {
        users.length > 0
          ? <UsersList />
          : <NoUsersPage />
      }
    </section>
  )
}

export default MainPage