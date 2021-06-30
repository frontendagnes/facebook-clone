import React from "react";
import "./Like.css";
import db from "../utility/firebase";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { useStateValue } from "../utility/StateProvider";
import { getLikeTotal, getLikeElement } from "../utility/reducer";

function Like({likes, postId, likeId, id }) {
    const [{ user }, dispatch] = useStateValue();

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
      .doc(likeId)
      .delete()
      .then(() => console.log("like usunięto"))
      .catch((error) => {
        console.log("Błąd usunięci like", error);
      });
  };
  return (
    <div className="like">
        { id === user.uid ?
        <div onClick={() => removeLike(likeId)}>
        <ThumbDownIcon />
        <p>Like</p> <span className="post__like">{likes.length}</span>
        </div>
        :
        <div onClick={addLike}>
        <ThumbUpIcon />
        <p>Like</p> <span className="post__like">{likes.length}</span>
        </div>
        }
      </div>
  );
}

export default Like;
