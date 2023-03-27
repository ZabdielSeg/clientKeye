import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import AuthService from './components/Auth/auth-service';
import LoginForm from './components/Auth/LoginForm';
import NavBar from './components/NavBar/NavBar';
import { getAllUsers, setToken } from './components/Users/user-service';
import UsersContextProvider from './context/UsersContext';
import MainPage from './pages/MainPage/MainPage';

const App = () => {

  // const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   fetchAllUsers()
  // }, [users.length])

  // const fetchAllUsers = () => {
  //   console.log('Entra función');
  //   setToken()
  //   getAllUsers()
  //   .then(response => setUsers(response))
  //   .catch(error => console.log(error))
  // }

  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    getLoggedInUser()
  }, [])

  const authService = new AuthService()
  const getLoggedInUser = () => {
    if (loggedInUser === null) {
      const userInfo = authService.loggedInUser()
      if (!userInfo) {
        setLoggedInUser(false)
      } else {
        setLoggedInUser(userInfo)
      }
    }
  }

  return (
    <div className="App">
      <UsersContextProvider>
        <NavBar />
        <Routes>
          <Route path='/allUsers' element={<MainPage />} />
          <Route path='/' element={<LoginForm getLoggedInUser={getLoggedInUser} />} />
        </Routes>
      </UsersContextProvider>
    </div>
  );
}

export default App;
