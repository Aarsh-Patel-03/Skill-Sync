import React, {useEffect, useState} from "react";
import "../Sass/ConnectionsComponent.scss";
import { getAllUsers, addConnection } from "../api/FirestoreAPI";
import ConnectedUsers from "./common/ConnectedUsers/ConnectedUsers";

export default function ConnectionsComponent({ currentUser}) {
    const [users, setUsers] = useState([]);
    const getCurrentUser = (id) => {
        addConnection(currentUser.id,id);
    };
 
    useEffect(() => {
        getAllUsers(setUsers);
    },[]);
 
   return(
    <div className="connections-main">
        {users.map((user) => {
            return user.id === currentUser.id 
            ? ( <></> ) : ( <ConnectedUsers currentUser={currentUser} user={user} getCurrentUser={getCurrentUser}/> );
        })}
    </div>
   );
}