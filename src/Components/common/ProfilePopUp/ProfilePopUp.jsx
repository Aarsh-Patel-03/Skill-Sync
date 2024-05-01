import React, {useMemo, useState} from 'react';
import './ProfilePopUp.scss';
import { onLogout } from '../../../api/AuthAPI';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../api/FirestoreAPI';
import Button from '../Button/Button';

export default function ProfilePopUp() {
  let navigate=useNavigate();

  const [currentUser, setCurrentUser]=useState({});

  useMemo(()=>{
    getCurrentUser(setCurrentUser);
  },[]);
  

  return (
    <div className='popup-card'>
      <p className='name'>{currentUser.name}</p>
      <p className='headline'>{currentUser.headline}</p>
      <Button title="View Profile" 
      onClick={()=> navigate("/profile",{state:{id:currentUser?.id,},})}/> 
    <Button title="Logout" onClick={onLogout}/> 
    </div>
  );
}
