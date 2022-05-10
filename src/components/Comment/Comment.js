import React from "react";
import "./Comment.css";
import Avatar from '@mui/material/Avatar'

const Comment = ({ content, profilePic, userName, date }) => {
  return (
    <div className="comment">
      <Avatar src={profilePic} />
      <div className="comment__conntent">
        <div className="comment__top">
          <small className="comment__small">{date}</small>
          <div className="comment__user">{userName}</div>
        </div>
        <div className="comment__bottom">
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
