import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../redux/user/userSlice'
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const {currentUser} = useSelector(userSelector);
    if(!currentUser){
        return <Outlet/>
    }else{
        return <Navigate to={`/profile/${currentUser._id}`}/>
    }
}

export default PublicRoute