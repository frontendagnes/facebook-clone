import React, { useState } from "react";
import db, { storage } from "../utility/firebase";
import "./UploadImage.css";
import firebase from "firebase";
import { useStateValue } from "../utility/StateProvider";
import { Avatar, Button } from "@material-ui/core";
import VideocamIcon from '@material-ui/icons/Videocam'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import MoodIcon from '@material-ui/icons/Mood'

function UploadImage() {
  const [{ user }, dispatch] = useStateValue();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //error function...
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image insiade db
            db.collection("posts").add({
              message: caption,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              profilePic: user.photoURL,
              username: user.displayName,
              image: url,
              likes: 0,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="uploadImage">
      <div className="uploadImage__top">
      <Avatar src={user.photoURL} />
      <div className="uploadImage__wrapper">
        <div className="uploadImage__inputs">
          <progress
            className="uploadImage__progress"
            value={progress}
            max="100"
          />
          <input
            className="uploadImage__message"
            type="text"
            placeholder={`What's on your mind, ${user.displayName}?`}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="uploadImage__buttons">
          <input type="file" onChange={handleChange} />
          <Button onClick={handleUpload}>Upload photo</Button>
        </div>
      </div>
      </div>
      <div className="uploadImage__bottom">
               <div className="uploadImage__option">
                    <VideocamIcon style={{color: "red"}}/>
                    <h3>Live Video</h3>
               </div>
               <div className="uploadImage__option">
                    <PhotoLibraryIcon style={{color: "green"}}/>
                    <h3>Photo/Video</h3>
                </div>
                <div className="uploadImage__option">
                    <MoodIcon style={{color: "orange"}}/>
                    <h3>Feeling/Activity</h3>
               </div>
            </div>
    </div>
  );
}

export default UploadImage;
