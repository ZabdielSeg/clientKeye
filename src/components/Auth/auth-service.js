import axios from 'axios';

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/auth`,
            withCredentials: false,
        });
        this.service = service;
    }

    login = ({username, password}) => {
        return this.service.post('/login', {username, password}).then(response => response.data)
    }

    loggedInUser = () => {
        const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        return userInfo;
    }
}

export default AuthService;