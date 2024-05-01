import React, { useMemo, useState, useEffect } from 'react';
import './PostsCard.scss';
import {Button, Modal } from "antd";
import { useNavigate } from 'react-router-dom';
import LikeButton from '../LikeButton/LikeButton';
import { getCurrentUser,getAllUsers, deletePost, getConnections } from '../../../api/FirestoreAPI';
import { BsPencil, BsTrash } from 'react-icons/bs';

export default function PostsCard({posts,id,getEditData}) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]); 
  const [isConnected, setIsConnected] = useState(false);
const [imageModal , setImageModal] = useState(false);
  useMemo(()=>{
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  });
 
  useEffect(() => {
    getConnections(currentUser.id,posts.userID,setIsConnected);
  },[currentUser.id,posts.userID]);
  
  
  return isConnected || currentUser.id === posts.userID ? (
    <div className='posts-card' key={id}>
      <div className="post-image-wrapper">
      <img  alt="profile-image" 
      className='profile-image'
      
      src={
        allUsers
        .filter((item)=>item.id===posts.userID)
        .map((item)=>item.imageLink)[0]
      } />
      <div className="name-time">
        <p className='name' 
      onClick={() => 
      navigate("/profile",{ state: {id:posts?.userID, email: posts.userEmail }, })}>
        {allUsers.filter((user)=>user.id=== posts.userID)[0]?.name}</p>
      {/* <p className='headline'>{posts.userName}</p> */}
      <p className="headline">
            {allUsers.filter((user)=>user.id=== posts.userID)[0]?.headline}
      </p>
      <p className="timestamp">
            {posts.timeStamp}
      </p>
      </div>
      {
        currentUser.id === posts.userID 
        ? <div className='action-container'>
        <BsPencil size={40} className='action-icon' onClick={ () => getEditData(posts)}/>
        <BsTrash size={40} className='action-icon' onClick={ () => deletePost(posts.id)}/>
      </div> 
      : <></>
      }
      </div>
        
       { posts.postImage ? (  <img src={posts.postImage} onClick={()=>setImageModal(true)} className='post-image ' alt='post-image'/> ) : ( <> </> )}
        <p className='status' dangerouslySetInnerHTML={{__html: posts.status}}>
            
        </p>
        <LikeButton userID={currentUser?.id} postID={posts.id} currentUser={currentUser} allUsers={allUsers}/>
  <Modal  
  centered 
  open= { imageModal}
  onOk = { ()=> setImageModal(false) }
  onCancel = { ()=> setImageModal(false) }
  footer={[]}
  >
 <img src={posts.postImage} onClick={()=>setImageModal(true)} className='post-image-modal' alt='post-image'/>
    
  </Modal>

    </div>
  ):(
    <></>
  );
}
