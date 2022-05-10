import React, { useState } from "react";
import "./CommentSender.css";
import { useStateValue } from "../utility/StateProvider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import db, { collection, doc, addDoc } from "../utility/firebase";

function CommentSender({ postId }) {
  const [{ user }] = useStateValue();
  const [comment, setComment] = useState("");

  const postComment = async (e) => {
    e.preventDefault();
    if (comment) {
      const refDoc = doc(db, "posts", postId);
      const ref = collection(refDoc, "comments");

      await addDoc(ref, {
        text: comment,
        user: user.displayName,
        avatar: user.photoURL,
        timestamp: Date.now(),
      })
        .then(() => {
          setComment("");
        })
        .catch((error) => console.error("Error comment>>", error.message));
    }
  };
  return (
    <div className="commentSender">
      <Avatar src={user.photoURL} />
      <form>
        <input
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={postComment} className="commentSender__button">
          Send
        </Button>
      </form>
    </div>
  );
}

export default CommentSender;
