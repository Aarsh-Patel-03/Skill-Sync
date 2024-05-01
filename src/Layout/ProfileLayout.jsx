import React,{useState,useMemo} from 'react';
import { getCurrentUser } from '../api/FirestoreAPI';
import Topbar from '../Components/common/topbar/Topbar';
import Profile from '../Pages/Profile';
import './ProfileLayout.scss';

export default function ProfileLayout() {
    const [currentUser,setCurrentUser]=useState({});

    useMemo(()=>{
        getCurrentUser(setCurrentUser);
    },[]);
  return (
    <div className='profile-layout'>
      <Topbar currentUser={currentUser}/>
      <Profile currentUser={currentUser}/>
    </div>
  )
}

