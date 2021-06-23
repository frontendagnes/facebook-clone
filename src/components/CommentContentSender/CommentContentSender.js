import React, { useState } from 'react'
import './CommentContentSender.css'
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../utility/StateProvider'
import db from "../utility/firebase"
import firebase from "firebase"
function CommentContentSender( {postId} ) {
    const [{ user }, dispatch] = useStateValue()
    const [comment, setComment] = useState('')

    const postComment = e => {
        e.preventDefault()
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            user: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setComment('')
    }
    return (
        <div className="commentContentSender">
            <Avatar src={user.photoURL} />
            <form>
                <input 
                    placeholder="Write a comment (not working)"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <button onClick={postComment} type="button">Post</button>
            </form>
        </div>
    )
}

export default CommentContentSender
