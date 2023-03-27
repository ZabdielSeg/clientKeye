import axios from 'axios';

let token = '';

const service = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/user`,
    withCredentials: true,
})

const getAllUsers = () => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    return service.get('/all-users', config).then(response => {
        const onlyUsers = response.data.filter(user => user.role === 'User');
        return onlyUsers
    })
}

const createUser = ({username, password, internalID, date, punchInHour, punchOutHour, role}) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    return service.post('/create-user', {username, password, internalID, date, punchInHour, punchOutHour, role}, config).then(response => response.data)
}

const setToken = () => {
    const userToken = JSON.parse(window.localStorage.getItem('userInfo'))
    if(!userToken) return 
    token = `bearer ${userToken.token}`;
}

const deleteUser = userID => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    return service.delete(`/delete-user/${userID}`, config).then(response => response.data)
}

const editUser = (userID, {username, password, internalID, date, punchInHour, punchOutHour, role}) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    return service.put(`/update-user/${userID}`,{username, password, internalID, date, punchInHour, punchOutHour, role}, config).then(response => response.data)

}

const uplodaDocument = fileData => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    return service.post('/upload-file', fileData, config).then(response => response.data)
}

export { getAllUsers, setToken, createUser, deleteUser, editUser, uplodaDocument }