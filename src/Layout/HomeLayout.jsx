import React,{useMemo,useState} from "react";
import Home from'../Pages/home';
import Topbar from "../Components/common/topbar/Topbar";
import './HomeLayout.scss';
import { getCurrentUser } from "../api/FirestoreAPI";

export default function HomeLayout(){
    const [currentUser ,setCurrentUser]=useState({});
    useMemo(()=>{
        getCurrentUser(setCurrentUser); 
    },[]);
    return(
        <div className="home-layout">
            <Topbar currentUser={currentUser}/>
            <Home currentUser={currentUser}/>
        </div>
    );
}