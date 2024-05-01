import React,{useEffect,useState} from "react";
import LoginComponent from "../Components/LoginComponent";
import {LoginAPI} from "../api/AuthAPI";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/common/Loader/Loader";

export default function Login(){ 
    const [loading,setLoading]=useState(true);
    let navigate=useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth,res =>{
            if(res?.accessToken){
                navigate('/home');
            }
            else{
                setLoading(false);
            }
        });
    },[]);
    return loading ? <Loader/> :<LoginComponent/>;
}
