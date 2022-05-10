import React, { useState, useEffect } from "react";
import "./Post.css";
import db, {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "../utility/firebase";
import { useStateValue } from "../utility/StateProvider";
import moment from "moment";
//mui
import Avatar from "@mui/material/Avatar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import NearMeIcon from "@mui/icons-material/NearMe";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// components
import CommentSender from "../CommentSender/CommentSender";
import Comment from "../Comment/Comment";

function Post({
  thumb,
  postId,
  profilePic,
  image,
  username,
  timestamp,
  message,
}) {
  const [{ user }] = useStateValue();

  const [like, setLike] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setLike(thumb);
  }, [thumb]);

  useEffect(() => {
    if (postId) {
      const refDoc = doc(db, "posts", postId);
      const ref = collection(refDoc, "comments");
      const refSort = query(ref, orderBy("timestamp", "desc"));
      const unsuscribe = onSnapshot(refSort, (snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
      return () => {
        unsuscribe();
      };
    }
  }, [postId]);

  const onClickAddComment = () => {
    setIsVisible(!isVisible);
  };
  const addLike = async () => {
    let newLike = [...like, user.uid];
    const refDoc = doc(db, "posts", postId);
    await setDoc(
      refDoc,
      {
        likes: newLike,
      },
      { merge: true }
    )
      .then(() => {
        setLike(newLike);
      })
      .catch((error) => {
        console.error("Like Error>>", error.message);
      });
  };

  const removeLike = async () => {
    let filterItem = like.filter((item) => item !== user.uid);
    const refDoc = doc(db, "posts", postId);
    await setDoc(
      refDoc,
      {
        likes: filterItem,
      },
      { merge: true }
    )
      .then(() => {
        setLike(filterItem);
      })
      .catch((error) => {
        console.error("Dislike Error>>", error.message);
      });
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
        {like.includes(user.uid) ? (
          <div className="post__option" onClick={() => removeLike()}>
            <ThumbUpIcon className="post__like" />
            <p>Like {like?.length}</p>
          </div>
        ) : (
          <div className="post__option" onClick={() => addLike()}>
            <ThumbUpIcon />
            <p>Like {like?.length}</p>
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
            <div key={comment.id}>
              <Comment
                content={comment.text}
                profilePic={comment.avatar}
                date={moment(comment.timestamp).format("MMM Do YY, h:mm:ss a")}
                userName={comment.user}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
