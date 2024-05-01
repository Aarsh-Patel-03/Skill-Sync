import React,{useState,useMemo} from 'react';
import "./ProfileCard.scss";
import { HiOutlinePencil } from 'react-icons/hi';
import { getSingleStatus,getSingleUser } from '../../../api/FirestoreAPI';
import PostsCard from '../PostsCard/PostsCard';
import { useLocation } from 'react-router-dom';
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import FileUploadModal from '../FileUploadModal/FileUploadModal';
import Logo from '../../../assets/frame.png';

export default function ProfileCard({onEdit,currentUser}) {
  let location=useLocation();
  const [allStatuses , setAllStatus] = useState([]);
  const[currentProfile,setCurrentProfile] =useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };
  useMemo(()=>{
    if(location?.state?.id){
      getSingleStatus(setAllStatus,location?.state?.id);
    }
    if(location?.state?.email){
      getSingleUser(setCurrentProfile,location?.state?.email);
    }
     },[]);

  return (
    <>
    <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="profile-card">
      {/* {currentUser.id === location?.state?.id ? ( */}
          <div className="edit-btn">
          <HiOutlinePencil className="edit-icon" onClick={onEdit} size={25}/>
        </div>
        {/*  ) : (
           <></>
         )} */}
        <div className='profile-info'>
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile"
            /> 
          <h3 className='userName'>{Object.values(currentProfile).length === 0 ? currentUser.name : currentProfile?.name}</h3>
          <p className='heading'>{Object.values(currentProfile).length === 0 ? currentUser.headline : currentProfile?.headline}</p>
          <p className='location'>{Object.values(currentProfile).length === 0 ? `${currentUser.city}, ${currentUser.country} ` : `${currentProfile?.city},${currentProfile?.country}`}</p>

          <a className='website' target="_blank" href={Object.values(currentProfile).length === 0 ? ` ${currentUser.website} ` : currentProfile?.website}>
            {Object.values(currentProfile).length === 0 ? currentUser.website : currentProfile?.website}
          </a>
          </div>
          <div className='right-info'>
          <p className='college'>{Object.values(currentProfile).length === 0 ? currentUser.college : currentProfile?.college}</p>
          <p className='company'>{Object.values(currentProfile).length === 0 ? currentUser.company : currentProfile?.company}</p>
          </div>
        </div>
        <p className='about-me'>
            {Object.values(currentProfile).length === 0 ? currentUser.aboutMe : currentProfile?.aboutMe}
          </p>
          <p className='skills'> <span className='skill-label'>Skills</span> :&nbsp;
            {Object.values(currentProfile).length === 0 ? currentUser.skills : currentProfile?.skills}
          </p>
          </div>
        <div className='posts-container'>
        <div className="profile-status-main">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} />
            </div>
          ); 
        })}
      </div>
        </div>
    </>
  )
}
