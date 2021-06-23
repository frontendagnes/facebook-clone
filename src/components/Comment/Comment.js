import React from 'react'
import './Comment.css'
import { Avatar } from '@material-ui/core'

const Comment = ({ content, profilePic, userName }) => {
   
    return (
        <div className="comment">
            <Avatar src={profilePic} />
            <div className="comment__top">
                <div className="comment__user">{userName}</div>
                <span>{content}</span>
            </div>
            
        </div>
    )
}

export default Comment