import React from 'react'
import UploadDocumentForm from '../components/UploadDocumentForm/UploadDocumentForm'

const NoUsersPage = ({fetchAllUsers}) => {
    const fetchUsers = () => {
        fetchAllUsers()
    }
    return (
        <>
            <h2 className='text-center'>There are no users registered yet. Please select a file to start the process</h2>
            <UploadDocumentForm fetchAllUsers={fetchUsers}/>
        </>
    )
}

export default NoUsersPage