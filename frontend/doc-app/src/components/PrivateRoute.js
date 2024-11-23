import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../Redux/features/userSlice";

export default function PrivateRoute(props){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchUser())
    },[])
    
    if(localStorage.getItem('token')){
        return props.children
    }else{
        return <Navigate to='/login' />
    }
}