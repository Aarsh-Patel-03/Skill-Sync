import React, { useState } from "react";
import './SearchUsers.scss';
import { AiOutlineCloseCircle } from "react-icons/ai";
// import{ Topbar} from "../topbar/Topbar";

// const [searchInput , setSearchInput] = useState( {name:''})

export default function SearchUsers({setIsSearch,setSearchInput}){
   
    return (
        <div className="search-users">
            <input  placeholder="Search Users.." onChange={(event) => setSearchInput(event.target.value)}/>
            <AiOutlineCloseCircle className="close-icon" size={20} 
            onClick={() => 
                {setIsSearch(false); 
            setSearchInput("");}}/>
        </div>
    );
}