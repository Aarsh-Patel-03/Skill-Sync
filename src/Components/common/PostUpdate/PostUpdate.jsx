import React,{ useState , useMemo } from 'react';
import "./PostUpdate.scss";
import PostsCard from '../PostsCard/PostsCard';
import { postStatus , getStatus, updatePost } from '../../../api/FirestoreAPI';
import { getCurrentTimeStamp } from '../../../helper/useMoment';
import { getUniqueID } from '../../../helper/getUniqueId';
import ModalComponent from '../Modal/Modal';
import { uploadPostImage } from '../../../api/ImageUpload';

export default function PostUpdate({currentUser}) {

  let userEmail = localStorage.getItem('userEmail');
  const [modalOpen, setModalOpen] = useState(false);
  const [status , setStatus] = useState("");
  const [currentPost, setCurrentPost] = useState({});
  const [allStatuses , setAllStatus] = useState([]);
  const [isEdit,setIsEdit]=useState(false);
  const [postImage,setPostImage]=useState('');


  const sendStatus = async () =>{
    let object ={
      status:status,
      timeStamp : getCurrentTimeStamp("LLL"),
      userEmail : userEmail,
      userName : currentUser.name,
      postID : getUniqueID(),
      userID : currentUser.id,
      postImage : postImage,
    }
   await postStatus(object);
   await setModalOpen(false);
   await setStatus("");
   setIsEdit(false);
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
       updatePost(currentPost.id,status, postImage);
       setModalOpen(false);
  };

  useMemo(()=>{
    getStatus(setAllStatus);
 },[]);

  return (
    <div className='post-update-container'>
 <div className="user-details">
 <img  src= {currentUser.imageLink} alt="imgLink" />
 <p className='name' > {currentUser.name} </p>
 <p className='headline'> {currentUser.headline}</p>
 </div>

      <div className="post-update">
      <img className='post-modal-image' src= {currentUser.imageLink} alt="imgLink" />
        <button className='open-post-modal' onClick={() =>
          {
            setModalOpen(true);
            setIsEdit(false);
          }
          } >Start a post</button>
      </div>
      <ModalComponent   
      setStatus={setStatus} 
      modalOpen={modalOpen} 
      status={status}
      setModalOpen={setModalOpen}
      sendStatus={sendStatus}
      isEdit={isEdit}
      updateStatus={updateStatus}
      uploadPostImage={uploadPostImage}
      postImage={postImage}
      setPostImage={setPostImage}
      currentPost={currentPost}
      setCurrentPost={setCurrentPost}
      />
      <div className='posts'>
      {
        allStatuses.map((posts)=>{
          return(
            <div key={posts.id}>
              <PostsCard posts={posts} getEditData={getEditData}/>
            </div>
          );
        }) 
      }
      </div>
    </div>
  )
}
 