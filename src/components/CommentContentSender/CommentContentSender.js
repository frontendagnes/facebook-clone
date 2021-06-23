import React, { useState } from 'react'
import './CommentContentSender.css'
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../utility/StateProvider'
import db from "../utility/firebase"
import firebase from "firebase"
function CommentContentSender() {
    const [{ user }, dispatch] = useStateValue()
    const [comment, setComment] = useState('')

    const onSubmit = e => {
        e.preventDefault()
        db.collection("comments").add({
            userName: user.displayName,
            profilePic: user.photoURL,
            content: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        console.log(comment)
        setComment('')
    }
    return (
        <div className="commentContentSender">
            <Avatar src={user.photoURL} />
            <form onSubmit={onSubmit}>
                <input 
                    placeholder="Write a comment (not working)"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <button type="onSubmit">hidden button</button>
            </form>
        </div>
    )
}

export default CommentContentSender
