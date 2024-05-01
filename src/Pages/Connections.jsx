import React,{useEffect,useState} from "react";
import ConnectionsComponent from "../Components/ConnectionsComponent";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/common/Loader/Loader";

export default function Connections({currentUser}){
    const [loading,setLoading]=useState(true);
    let navigate=useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth,res =>{
            if(!res?.accessToken){
                navigate('/');
            }
            else{
                setLoading(false);
            }
        });
    },[]);
    return loading ? <Loader/> :<ConnectionsComponent currentUser={currentUser}/>;
}