import React,{useState,useEffect, useDebugValue} from "react";
import Logo from '../../../assets/frame.png';
import user from '../../../assets/user.png';
import './Topbar.scss';
import { AiOutlineHome,AiOutlineUserSwitch,AiOutlineSearch,AiOutlineMessage,AiOutlineBell,AiOutlineUser} from 'react-icons/ai';
import {BsBriefcase} from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import ProfilePopUp from "../ProfilePopUp/ProfilePopUp";
import SearchUsers from "../SearchUsers/SearchUsers";
import { getAllUsers } from "../../../api/FirestoreAPI";

export default function Topbar({currentUser}){

    const [popupVisible, setPopupVisible] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [users,setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    let navigate = useNavigate();
    const goToRoute = (route) => {
        navigate(route);
    };                                                                                           
    const displayPopup = () => {
        setPopupVisible(!popupVisible);
      };

const openUser =(user)=>{
navigate('/profile', {state:{id : user.id, email:user.email,}, })

}

      const handleSearch = () => {
        if(searchInput !==''){
          let searched = users.filter((user) => {
            return Object.values(user).join('').toLowerCase().includes(searchInput.toLowerCase());
        });
        setFilteredUsers(searched);
      }
        else{
          setFilteredUsers(users);
        }
      };

      useEffect( () => {
        let debounced = setTimeout(() => {
          handleSearch();
        },1000);
        return () => clearTimeout(debounced);
      }, [searchInput]);

      useEffect(()=>{
        getAllUsers(setUsers);
      },[])

    return(
        <div className="topbar-main">
            {popupVisible ? (
        <div className="popup-position">
          <ProfilePopUp />  
        </div>
      ) : ( <></> )}

<img className="logo" src={Logo} alt="skill-sync-logo" />

      { isSearch ? ( <SearchUsers setIsSearch={setIsSearch} setSearchInput={setSearchInput}/> ) : (
         <div className="react-icons">
            <AiOutlineHome size={30} className="react-icon" onClick={() => goToRoute("/home")}/>
            <AiOutlineSearch size={30} className="react-icon" onClick={()=> setIsSearch(true)}/>
            <AiOutlineUserSwitch size={30} className="react-icon" onClick={() => goToRoute("/connections")}/>
           
            </div>  )
      }
            <img className="user-logo" src={currentUser.imageLink} alt="user" onClick={displayPopup}/>
            { (searchInput.length === 0) ? (<></>
            ) : (
             <div className="search-results">
              {
              filteredUsers.length === 0 ? (
           <div className="search-inner">No Result Found</div>
           ) 
            :

             (filteredUsers.map((user) => (
                <div className="search-inner" onClick={ ()=>openUser(user) } >
                  <img src={user.imageLink} />
                  <p className="name">{user.name}</p>
                </div>
               )))
               
               }
             </div>
             )}
        </div>
    );
}