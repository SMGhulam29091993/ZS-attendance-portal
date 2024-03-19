import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { userSelector } from '../redux/user/userSlice';

const PrivateRoute = () => {
    const {currentUser} = useSelector(userSelector);
    if(currentUser){
        return <Outlet/>
    }else{
        return <Navigate to="/sign-in"/>
    }
}

export default PrivateRoute