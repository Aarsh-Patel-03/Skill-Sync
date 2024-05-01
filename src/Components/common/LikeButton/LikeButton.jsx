import React, { useMemo ,useState} from "react";
import './LikeButton.scss';
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import {getCurrentTimeStamp} from "../../../helper/useMoment"; 
import { likePost,getLikesByUser,postComment,getComments} from "../../../api/FirestoreAPI";

export default function LikeButton({userID , postID,currentUser,allUsers}){
    const [likesCount, setLikesCount] = useState(0);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const handleLike = () =>{
        likePost(userID,postID,liked);
    }
    const getComment = (event) => {
      setComment(event.target.value);
    };
    const addComment = () => {
      postComment(postID, comment, getCurrentTimeStamp("LLL"), currentUser?.name,currentUser?.id);
      setComment("");
    };
    useMemo(() => {
        getLikesByUser(userID, postID, setLiked, setLikesCount);
        getComments(postID, setComments);
      }, [userID, postID]);
    return (
      <div className="like-container">
      <hr/>
      {/* <div className="hr-line">
        <hr />
      </div> */}
      <div className="like-comment">
        <div className="likes-comment-inner" >
          <span onClick={handleLike}>
          {liked ? (
            <AiFillHeart size={25} color="#FF0000" />
          ) : (
            <AiOutlineHeart size={25} />
          )}
      <p>{likesCount} Likes</p>
          </span>
        </div>
        <div
          className="likes-comment-inner">
          <span onClick={() => setShowCommentBox(!showCommentBox)}>
          {
            <AiOutlineComment
              size={25}
              color={showCommentBox ? "#0a66c2" : "#212121"}
            />
          }
          <p>Comments</p>
          </span>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          /> 
          
          <button className="add-comment-btn" onClick={addComment} disabled ={comment.length>0?false:true}>
            Add Comment
          </button>
          
            <div className="comments-outer">
            <div className="comments-container">
            {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <div className="all-comments">
                  <div className="comment-img-name">
                  <img  alt="profile-image" 
                      className='comment-image'
                        src={
                            allUsers
                            .filter((item)=>item.id===comment.userID)
                            .map((item)=>item.imageLink)[0]
                         } />
                    <p className="name">{comment.name}</p>
                  </div>
                  
                  
                  <p className="comment">{comment.comment}</p>

                  <p className="timestamp">{comment.timeStamp}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
            </div>
            </div>
        </>
      ) : (
        <></>
      )}
    </div>
        
    );
}