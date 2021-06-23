import React, { useState } from 'react'
import db, { storage } from '../utility/firebase'
import './UploadImage.css'
import firebase from 'firebase'
import { useStateValue } from '../utility/StateProvider'

function UploadImage() {
    const [{ user }, dispatch] = useStateValue()

	const [caption, setCaption] = useState('')
	const [image, setImage] = useState(null)
	const [progress, setProgress] = useState(0)
    
    const handleChange = e => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }
  const handleUpload = () =>{
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(progress)
            },
            (error) =>{ //error function...
                console.log(error)
                alert(error.message)
            },
            () => { //complete function...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image insiade db
                        db.collection("posts").add({
                            message: caption,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            profilePic: user.photoURL,
                            username: user.displayName,
                            image: url,
                            likes: 0,
                        })
                        setProgress(0)
                        setCaption("")
                        setImage(null)
                    })
            }
        )
  }

    return (
        <div className="uploadImage">
            <progress value={progress} max="100"/>
            <input type="text" placeholder="Message" value={caption} onChange={e => setCaption(e.target.value)} />
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload photo</button>
        </div>
    )
}

export default UploadImage
