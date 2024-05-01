import { firestore } from "../firebaseConfig";
import { addDoc,
        collection,
        onSnapshot,
        serverTimestamp,
        doc,
        updateDoc,
        query,
        where, 
        setDoc,
        deleteDoc} from "firebase/firestore";
import { toast } from "react-toastify";

let postRef = collection(firestore,"posts");
let userRef = collection(firestore , "users");
let likeRef = collection(firestore , "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");

export const postStatus = (object) => {
    
    addDoc(postRef,object)
    .then(()=>{
        toast.success('Post has been added Succesfully!');
    })
    .catch((err)=>{
        console.log(err);
    });
};
export const getStatus = (setAllStatus) =>{
    onSnapshot(postRef,(response) => {
        setAllStatus(response.docs.map((docs)=>{
            return{...docs.data(),id:docs.id};
        }));
    });
};

export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const postUserData = (object) =>{
    addDoc(userRef,object)
    .then(()=>{})
    .catch((err)=>{
        console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser) =>{
    onSnapshot(userRef,(response) => {
        setCurrentUser(
            response.docs.map((docs)=>{
                return{...docs.data(),id:docs.id};
            }).filter((item)=>{
                return item.email===localStorage.getItem('userEmail');
            })[0]
        );
    });
};

export const editProfile  = (userID,payload) =>{
    let userToEdit = doc(userRef,userID);

    updateDoc(userToEdit,payload)
    .then(()=>{
        toast.success('Profile has been updated Succesfully!');
    })
    .catch((err)=>{
        console.log(err);
    });
};
export const getSingleStatus = (setAllStatus, id) => {
    const singlePostQuery = query(postRef, where("userID","==", id));
    onSnapshot(singlePostQuery,(response) => {
        setAllStatus(
            response.docs.map((docs)=>{
                return{...docs.data(),id:docs.id};
            })
        );
    });
};

export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(userRef, where("email","==", email));
    onSnapshot(singleUserQuery,(response) => {
        setCurrentUser(
            response.docs.map((docs)=>{
                return{...docs.data(),id:docs.id};
            })[0]
        );
    });
};

export const likePost = (userID,postID,liked) =>{
    try {
        let docToLike = doc(likeRef,`${userID}_${postID}`);
        if (liked) {
            deleteDoc(docToLike);
          } else {
            setDoc(docToLike, { userID, postID });
          }
    } catch (err) {
        console.log(err);
    }
};

export const getLikesByUser = (userID, postID, setLiked, setLikesCount) => {
    try {
      let likeQuery = query(likeRef, where("postID", "==", postID));
  
      onSnapshot(likeQuery, (response) => {
        let likes = response.docs.map((doc) => doc.data());
        let likesCount = likes?.length;
  
        const isLiked = likes.some((like) => like.userID === userID);
  
        setLikesCount(likesCount);
        setLiked(isLiked);
      });
    } catch (err) { 
      console.log(err);
    }
  };


  export const postComment = (postID, comment, timeStamp, name,userID) => {
    try {
      addDoc(commentsRef, {
        postID,
        comment,
        timeStamp,
        name,
        userID,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getComments = (postId, setComments) => {
    try {
      let singlePostQuery = query(commentsRef, where("postID", "==", postId));
  
      onSnapshot(singlePostQuery, (response) => {
        const comments = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
  
        setComments(comments);
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const updatePost = (id,status, postImage) => {
    let docToUpdate =  doc(postRef,id);

    try{
      updateDoc(docToUpdate, {status, postImage});
      toast.success("Post has been updated!")
    }
    catch(err){
      console.log(err);
    }
  };

  export const deletePost = (id) => {
    let docToDelete =  doc(postRef,id);

    try{
      deleteDoc(docToDelete);
      toast.success("Post has been deleted!");
    }
    catch(err){
      console.log(err);
    }
  };

  export const addConnection = (userID,targetID) =>{
    try {
        let connectionToAdd = doc(connectionRef,`${userID}_${targetID}`);
        setDoc(connectionToAdd, { userID, targetID });
        toast.success("Connection Added!");
    } catch (err) {
        console.log(err);
    }
};

export const getConnections = (userID, targetID,setIsConnected) => {
  try {
    let connectionsQuery = query(connectionRef, where("targetID", "==", targetID));

    onSnapshot(connectionsQuery, (response) => {
      let connections = response.docs.map((doc) => doc.data());

      const isConnected = connections.some((connection) => connection.userID === userID);
      setIsConnected(isConnected);
      
    });
  } catch (err) { 
    console.log(err);
  }
};