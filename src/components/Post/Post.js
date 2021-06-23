import React, { useState, useEffect } from 'react'
import './Post.css'
import { Avatar } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommentContentSender from '../CommentContentSender/CommentContentSender'
import db from '../utility/firebase'
// import { useStateValue } from '../utility/StateProvider'

function Post({postId, profilePic, image, username, timestamp, message, id, thumb}) {

    // const [{ user }, dispatch] = useStateValue()
    const [isVisible, setIsVisible] = useState(false)
    const [like, setLike] = useState(thumb)
    const [boolLike, setBoolLike] = useState(false)
    const [comments, setComments] = useState([])

    useEffect(() => {
        let unsubscribe
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }
        return () => {
            unsubscribe()
        }
    }, [postId])

    const onClickAdd = () => {
        setIsVisible(!isVisible)
    }
    const incrementLike = async () =>{    
        setLike(like + 1)
        await db.collection("posts").doc(id).update({
            likes: like + 1
        }) 
        setBoolLike(true)
    }
    const decrementLike = async () => {
        setLike(like - 1)
        await db.collection("posts").doc(id).update({
            likes: like - 1
        })
        setBoolLike(false)
    }
    return (
        <div className="post">   
            <div className="post__top">
                <Avatar src={profilePic}
                    className="post__avatar" />
                <div className = "post__topInfo">
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
            {boolLike ? 
                <div className="post__option" onClick={decrementLike}>
                    <ThumbDownIcon />
                    <p>Like</p> <span className="post__like">{like}</span>
                </div>
                 : 
                 <div className="post__option" onClick={incrementLike}>
                    <ThumbUpIcon />
                    <p>Like</p> <span className="post__like">{like}</span>
                </div>
             } 
                <div className="post__option" onClick={onClickAdd}>
                    <ModeCommentIcon />
                    <p>Comment</p>
                </div>
                <div className="post__option">
                    <NearMeIcon />
                    <p>Share</p>
                </div>
                <div className="post__option">
                    <AccountCircleIcon  />
                    <ExpandMoreIcon />
                </div>  
            </div> 
            <div className="post__commentContent">
                { isVisible && <CommentContentSender postId={postId} /> }
                <div className="post__coments">
                    {comments.map((comment) => (
                        <p>
                            <span>{ comment.timestamp }</span>
                            <b>{comment.user}</b> {comment.text}
                        </p>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default Post
