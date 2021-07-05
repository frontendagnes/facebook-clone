import React, { useState } from "react";
import "./MessageSender.css";
import { Avatar } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import MoodIcon from "@material-ui/icons/Mood";
import { useStateValue } from "../utility/StateProvider";
import firebase from "firebase";
import db, { storage } from "../utility/firebase";
import { Button } from "@material-ui/core";
function MessageSender() {
  const [input, setInput] = useState("");
  const [imageURL, setImageUrl] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
      image: imageURL,
      likes: [],
    });
    setInput("");
    setImageUrl("");
  };
  const handleClick = () => {
    setIsUpload(!isUpload);
  };

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (image) {
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
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                profilePic: user.photoURL,
                username: user.displayName,
                image: url,
                likes: [],
              });
              setProgress(0);
              setInput("");
              setImage(null);
            });
        }
      );
    } else {
      alert("Photo has not been selected!");
    }
  };
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={user.photoURL} />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="massegeSender__input"
            placeholder={`What's on your mind, ${user.displayName}?`}
          />
          <input
            value={imageURL}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder={`Image URL (Optional)`}
          />
          <button onClick={handleSubmit} type="submit">
            Hidden submit
          </button>
        </form>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSander__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messageSander__option" onClick={handleClick}>
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo/Video (it work)</h3>
        </div>
        <div className="messageSander__option">
          <MoodIcon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
      {isUpload && (
        <div className="messageSander__uploadImage">
          <form>
            <progress
              className="messageSander__progress"
              value={progress}
              max="100"
            />
            <div>
              <input
                className="messageSander__fileInput"
                type="file"
                onChange={handleChangeImage}
              />
              <Button className="messageSander__upload" onClick={handleUpload}>
                Upload
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default MessageSender;
