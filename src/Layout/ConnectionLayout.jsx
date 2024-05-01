import React,{useMemo,useState} from "react";
import Connections from "../Pages/Connections";
import Topbar from "../Components/common/topbar/Topbar";
import './ProfileLayout.scss';
import { getCurrentUser } from "../api/FirestoreAPI";

export default function ConnectionLayout(){
    const [currentUser ,setCurrentUser]=useState({});
    useMemo(()=>{
        getCurrentUser(setCurrentUser);
    },[]);
    return(
        <div className="home-layout">
            <Topbar currentUser={currentUser}/>
            <Connections currentUser={currentUser}/>
        </div>
    );
}