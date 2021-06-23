import React, { useState } from 'react'
import './MessageSender.css'
import { Avatar } from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import MoodIcon from '@material-ui/icons/Mood'
import { useStateValue } from '../utility/StateProvider'
import firebase from "firebase"
import db from "../utility/firebase"

function MessageSender() {
    const [input, setInput] = useState('')
    const [imageURL, setImageUrl] = useState('')
    const handleSubmit = e =>{
        e.preventDefault()
        db.collection("posts").add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profilePic: user.photoURL,
            username: user.displayName,
            image: imageURL,
            likes: 0,
        })
        setInput("")
        setImageUrl("")
    }

    const [{ user }, dispatch] = useStateValue()
    return (
        <div className="messageSender">
           <div className="messageSender__top">
                <Avatar src={user.photoURL}/>
                <form>
                    <input 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="massegeSender__input" 
                        placeholder={`What's on your mind, ${user.displayName}?`}  />        
                    <input 
                        value={imageURL}
                        onChange={e => setImageUrl(e.target.value)}
                        placeholder={`Image URL (Optional)`} />
                    <button onClick={handleSubmit} type="submit">Hidden submit</button>
                </form>
           </div>
           <div className="messageSender__bottom">
               <div className="massageSander__option">
                    <VideocamIcon style={{color: "red"}}/>
                    <h3>Live Video</h3>
               </div>
               <div className="massageSander__option">
                    <PhotoLibraryIcon style={{color: "green"}}/>
                    <h3>Photo/Video</h3>
                </div>
                <div className="massageSander__option">
                    <MoodIcon style={{color: "orange"}}/>
                    <h3>Feeling/Activity</h3>
               </div>
            </div>
        </div>
    )
}

export default MessageSender
