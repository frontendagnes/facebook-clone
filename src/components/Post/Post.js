import React, { useState, useEffect } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import NearMeIcon from "@material-ui/icons/NearMe";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CommentSender from "../CommentSender/CommentSender";
import db from "../utility/firebase";
import Comment from "../Comment/Comment";
import { useStateValue } from "../utility/StateProvider";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { getLikeTotal, getLikeElement } from "../utility/reducer";
function Post({ postId, profilePic, image, username, timestamp, message, id }) {
  const [{ user }, dispatch] = useStateValue();

  const [isVisible, setIsVisible] = useState(false);
  const [like, setLike] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let comments;
    let likes;
    if (postId) {
      comments = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    if (postId) {
      likes = db
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLike(snapshot.docs.map(doc =>({
            id: doc.id,
            data: doc.data()
          }) ))
        });
    }

    return () => {
      comments();
      likes();
    };
  }, [postId]);

  const onClickAddComment = () => {
    setIsVisible(!isVisible);
  };

  const addLike = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("likes").add({
      id: user.uid,
      user: user.displayName,
      like: 1,
    });
  };
  const removeLike = () => {
     db.collection("posts")
      .doc(postId)
      .collection("likes")
      .doc(like.id)
      .delete()
        .then(() => console.log("like usunięto"))
        .catch((error) => {
          console.log("Błąd usunięci like", error)
        })
        
  };
  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      <div className="post__bottom">
        <p>{message}</p>
      </div>
      <div className="post__image">
        <img src={image} alt="" />
      </div>
      <div className="post__options">
      {/* {like.map((item) => (
      //  item.data.id === user.uid &&
      //   <div className="post__option" onClick={removeLike(item.id)}>
      //       <ThumbDownIcon />
      //       <p>Like</p> <span className="post__like"></span>
      //       <p>{like.length}</p>
      //     </div>
            
      //     // <div className="post__option" onClick={addLike}>
      //     //   <ThumbUpIcon />
      //     //   <p>Like</p> <span className="post__like"></span>
      //     //   <p>{like.length}</p>
      //     // </div>
  
      ))} */}
        {
        getLikeElement(like, user) ? (
          <div className="post__option" onClick={() =>

              removeLike()
  
          }>
            <ThumbDownIcon />
            <p>Like</p> <span className="post__like"></span>
            <CurrencyFormat
              renderText={(value) => (
                <div className="post__optionLike">{value}</div>
              )}
              decimalScale={2}
              value={getLikeTotal(like)}
              displayType={"text"}
            />
          </div>
        ) : (
          <div className="post__option" onClick={addLike}>
            <ThumbUpIcon />
            <p>Like</p> <span className="post__like"></span>
            <CurrencyFormat
              renderText={(value) => (
                <div className="post__optionLike">{value}</div>
              )}
              decimalScale={2}
              value={getLikeTotal(like)}
              displayType={"text"}
            />
          </div>
        )}

        <div className="post__option" onClick={onClickAddComment}>
          <ModeCommentIcon />
          <p>Comment</p>
        </div>
        <div className="post__option">
          <NearMeIcon />
          <p>Share</p>
        </div>
        <div className="post__option">
          <AccountCircleIcon />
          <ExpandMoreIcon />
        </div>
      </div>
      <div className="post__commentContent">
        {isVisible && <CommentSender postId={postId} />}
        <div className="post__coments">
          {comments.map((comment) => (
            <Comment
              content={comment.text}
              profilePic={comment.avatar}
              date={moment(comment.timestamp).format("MMM Do YY, h:mm:ss a")}
              userName={comment.user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
