import React, { useState } from 'react'
import './CommentSender.css'
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../utility/StateProvider'
import { Button } from '@material-ui/core';
import db from '../utility/firebase';

function CommentSender( {postId} ) {
    
    const [{ user }, dispatch] = useStateValue()
    const [comment, setComment] = useState('')

    const postComment = e => {
        e.preventDefault()
        if(comment){
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            user: user.displayName,
            avatar: user.photoURL,
            timestamp: Date.now(),
        })
        }
        setComment('')
    }
    return (
        <div className="commentSender">
            <Avatar src={user.photoURL} />
            <form>
                <input 
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <Button 
                    onClick={postComment} 
                    className="commentSender__button"
                >Send </Button>
            </form>
        </div>
    )
}

export default CommentSender
