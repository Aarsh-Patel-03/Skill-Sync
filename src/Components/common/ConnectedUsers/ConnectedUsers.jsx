import React, {useEffect, useState} from "react";
import { getConnections } from "../../../api/FirestoreAPI";
import {AiOutlineUsergroupAdd } from 'react-icons/ai';

export default function ConnectedUsers({user , getCurrentUser, currentUser}){
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        getConnections(currentUser.id,user.id,setIsConnected);
      },[currentUser.id,user.id]);

    return isConnected ? ( <> </> ) : (
        <div className="grid-child" >
          <img src={user.imageLink} alt="" />
            <p className="name">{user.name}</p>
            <p className="headline">{user.headline}</p>
        <button onClick={() => getCurrentUser(user.id)}  >
              <AiOutlineUsergroupAdd size={20} />
               Connect</button>
        </div>
    );
}